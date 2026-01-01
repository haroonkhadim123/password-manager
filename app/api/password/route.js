import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server"
export async function POST(request){
    try {
        const body= await request.json();
        const client= await clientPromise;
        const db= client.db("PassOP");
        const collection= db.collection("passwords");
        const doc=await collection .findOne({password:body.password});
        if(doc){
            return NextResponse.json({success:false,error:true,message:"Password already exists"})
        }
        await collection.insertOne({
          
            site:body.site,
            username:body.username,
            password:body.password,
            id:Date.now().toString()
        });
        return NextResponse.json({success:true,error:false,message:"Password added successfully"
        });

        
    } catch (error) {
        console.log('Api error',error)
        return NextResponse.json({success:false,error:true,message:"Internal server error"})
        
    }
}

export async function  DELETE(request) {
    try {
        const body= await request.json();
        const client =await clientPromise;
        const db= client.db("PassOP");
        const collection= db.collection("passwords");
        await collection.deleteOne({password:body.password});
        return NextResponse.json({success:true,error:false,message:"Password deleted successfully"
        });
        
    } catch (error) {
        console.log('Api error',error)
        return NextResponse.json({success:false,error:true,message:"Internal server error"})
        
    }
}
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("PassOP");
    const complaints = await db.collection("passwords").find({}).toArray();
    return NextResponse.json(complaints, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
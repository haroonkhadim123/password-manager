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
            return NextResponse.json({sucess:false,error:true,message:"Password already exists"})
        }
        await collection.insertOne({
            site:body.site,
            username:body.username,
            password:body.password
        });
        return NextResponse.json({sucess:true,error:false,message:"Password added successfully"
        });

        
    } catch (error) {
        console.log('Api error',error)
        return NextResponse.json({sucess:false,error:true,message:"Internal server error"})
        
    }
}

export async function  DELETE(request) {
    try {
        const body= await request.json();
        const client =await clientPromise;
        const db= client.db("PassOP");
        const collection= db.collection("passwords");
        await collection.deleteOne({password:body.password});
        return NextResponse.json({sucess:true,error:false,message:"Password deleted successfully"
        });
        
    } catch (error) {
        console.log('Api error',error)
        return NextResponse.json({sucess:false,error:true,message:"Internal server error"})
        
    }
}
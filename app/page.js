"use client"
import React from 'react'
import { FaSave, FaEyeSlash, FaEye, FaCopy, FaEdit, FaTrash } from "react-icons/fa";
import { useState,useEffect } from 'react';
import toast from "react-hot-toast";

const Page = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [password, setpassword] = useState([])
  const [showPassword, setshowPassword] = useState(false)
  const [loader, setloader] = useState(false)

 const fetchdata = async () => {
    try {
      const response = await fetch("/api/password");
      const data = await response.json();
      setpassword(data);
    } catch (error) {
      console.error("Error fetching:", error);
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);



  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  const togglePassword = () => {
    setshowPassword(!showPassword);
  }
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.site.length <= 3 || form.username.length <= 3 || form.password.length <= 3) {
        toast.error("Please fill all fields correctly");
        return;
      }
     if (password.some((item) => item.password === form.password)) {
  toast.error("Password already exists");
  return;
}

      setloader(true);

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        site: form.site,
        username: form.username,
        password: form.password,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch("/api/password", requestOptions);
      const result = await response.json();
    

      if(result.success){
    
      setform({ site: "", username: "", password: "" });
      toast.success(`${result.message}`);
       fetchdata();
      return
      }
      else{
        toast.error(`${result.message}`)
        setloader(false);
      }
    } catch (error) {
      console.error("Error saving password:", error);
      toast.error("Failed to save password.")
    }
    finally{
      setloader(false)
    }
  };

  const copytext = (text) => {
    navigator.clipboard.writeText(text)
    toast("Copied to clipboard")
  }
  const delet = async (id) => {
    confirm('Are you sure you want to delete?')
    if (confirm) {
      setpassword(password.filter((item) => item.id !== id))


      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          password: password.find((item) => item.id === id)?.password,
        });
        const requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        const response = await fetch("/api/password", requestOptions);
        const result = await response.json();
        console.log(result);
        toast.success(`${result.message}`);

      } catch (error) {
        console.error("Error deleting password:", error);
        toast.error("Failed to delete password. Please try again.");

      }
    }


  }
  const edit = async(id) => {
    const editdata = password.find((item) => item.id === id)
    if (editdata) {
      setform({ site: editdata.site, username: editdata.username, password: editdata.password });
    }
    setpassword(password.filter((item) => item.id !== id))
    
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          password: password.find((item) => item.id === id)?.password,
        });
        const requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        const response = await fetch("/api/password", requestOptions);
        const result = await response.json();
        console.log(result);
       

      } catch (error) {
        console.error("Error deleting password:", error);
 

      }
      finally{
        setloader(false)
      }



  }


  return (
    <div>
      <div>
        <div className="container md:w-[60vw] w-[90vw] mx-auto  py-7  p-4 rounded-lg mt-10  items-center gap-4">
         <h1 className="text-2xl font-bold text-center">
  <span className="sr-only">PassOP</span>
  <span className='dark:text-black' aria-hidden="true">
    &lt;Pass<span className="text-green-500 font-bold">OP</span>&gt;
  </span>
</h1>

          <p className='text-center mb-3 dark:text-black'>{`"Your password Manager"`}</p>
          <div className="box w-[100%] flex flex-col h-[100%] gap-5 ">
            <form className='box w-[100%] flex flex-col h-[100%] gap-5'onSubmit={handlesubmit}>
            <input className='dark:text-black w-[100%] p-2 rounded-3xl border border-green-500' name='site' type="text" onChange={handlechange} value={form.site} placeholder='Enter you site' />
            <div className='flex md:flex-row flex-col md:gap-2 gap-5 w-[100%]'>
              <input className='dark:text-black md:w-[80%] w-[100%] p-2 rounded-3xl border border-green-500' name='username' type="text" onChange={handlechange} value={form.username} placeholder='Enter your username' autoComplete='new-username' required />
              <div className="relative md:w-[20%] w-[100%]">
                <input
                  name="password"
                  className="w-full p-2 pr-10 rounded-3xl border border-green-500 dark:text-black"
                  type={showPassword ? "text" : "password"}
                  onChange={handlechange}
                  value={form.password}
                  placeholder="Enter Password"
                  autoComplete='new-password'
                  required
                  
                />
                <span
                  onClick={togglePassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black-600 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <div className='w-[100%] flex items-center justify-center'>
              <button disabled={loader} type='submit' className='dark:text-black text-center bg-green-500 py-2 px-5  flex items-center justify-center gap-2 rounded-3xl' ><FaSave />{loader ? "Saving...": "Save"}</button>
            </div>
            </form>
          </div>


        </div>
      </div>
      <div className=' md:w-[60vw] w-[90vw] pb-5 min-h-[36.5vh]  mx-auto mt-5  p-4 flex  flex-col'>
        <p className='font-bold text-2xl'>{`"Your Password"`}</p>
        {password.length === 0 ? <p className='dark:text-black'>{`"No Password saved"`}</p> : (
          <div className="w-full mt-4 overflow-x-auto">
            {/* Scroll container for mobile */}
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-x-auto border border-green-300 rounded-lg">
                <table className="min-w-[600px] w-full text-sm text-center table-auto">
                  <thead className="bg-green-700 text-white">
                    <tr>
                      <th className="px-4 py-2 dark:text-black">Site</th>
                      <th className="px-4 py-2 dark:text-black">Username</th>
                      <th className="px-4 py-2 dark:text-black">Password</th>
                      <th className="px-4 py-2 dark:text-black">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-green-50 divide-y divide-green-200">
                    {Array.isArray(password) && password.map((item) => (
                      <tr key={item.id} className="hover:bg-green-100">
                        <td className="px-4 py-2 break-all">
                          <span
                            onClick={() => copytext(item.site)}
                            className="flex flex-row-reverse items-center justify-center gap-2 cursor-pointer hover:text-green-600"
                          >
                            <FaCopy /> <a href={item.site} target='_blank'>{item.site}</a>
                          </span>
                        </td>
                        <td className="px-4 py-2 break-all">
                          <span
                            onClick={() => copytext(item.username)}
                            className="flex flex-row-reverse items-center justify-center gap-2 cursor-pointer hover:text-green-600"
                          >
                            <FaCopy /> {item.username}
                          </span>
                        </td>
                        <td className="px-4 py-2 break-all">
                          <span
                            onClick={() => copytext(item.password)}
                            className="flex flex-row-reverse items-center justify-center gap-2 cursor-pointer hover:text-green-600"
                          >
                            <FaCopy />{'*'.repeat(item?.password?.length || 0)}

                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex items-center justify-center gap-3">
                            <FaEdit
                              onClick={() => edit(item.id)}
                              className="cursor-pointer hover:text-blue-500"
                            />
                            <FaTrash
                              onClick={() => delet(item.id)}
                              className="cursor-pointer hover:text-red-500"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  )
}


export default Page
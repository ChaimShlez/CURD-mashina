// import { useState } from "react"

export default function Login(){
  // const[userName,setUserName]=useState<string>("")

    return(
        <div className="bg-green-200 h-screen p-4 flex  justify-center items-center ">
        <div className="bg-green-300 p-8 w-72 h-96 flex flex-col  justify-center items-center gap-4 rounded-md">
         
      
           <h3 className='text-cyan-900 font-mono text-lg  ' >
          login
        </h3>
         <input
          id="email"
          type='email'
          placeholder='Enter your email'
           className='w-full h-9 border border-gray-400 px-3   rounded-md required '
          
          />
          <input
          id="password"
          type='password'
          placeholder='Enter your password'
           className='w-full h-9 border border-gray-400 px-3 rounded-md required'
          />
          <button className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition'>
            sing in
          </button>
        </div>

       

        
      </div>

    )
};

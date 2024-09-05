import { useContext, useEffect, useRef } from "react"
import { LoginContext } from "./context/LoginContext"
import { useNavigate } from "react-router-dom"

export default function Login(){
    const navigate=useNavigate()
    const nameRef=useRef()
    const sandiRef=useRef()
    const {nameLogin,setNameLogin,passwordLogin,setPasswordLogin} =useContext(LoginContext)
    function saveLogin(){
        setNameLogin(nameRef.current.value)
        setPasswordLogin(sandiRef.current.value)
        navigate("/home")
    }
    useEffect(()=>{
        console.log(nameLogin)
        console.log(passwordLogin)
    },[nameLogin,passwordLogin])
    return(
        <div className="flex  justify-center items-center bg-gradient-to-r from-green-600 to-green-300 w-full h-full">
            <div className="flex flex-col gap-5">
               <div className="flex flex-col">
                    <label htmlFor="name"> Nama</label>
                    <input ref={nameRef} id="name"  type="text" className="rounded border-black"/>
               </div>
                <div className="flex flex-col">
                    <label htmlFor="kataSandi"> Password</label>
                    <input ref={sandiRef} id="kataSandi"  type="text" className="rounded border-black" />
                </div>
                <button className="bg-slate-600" onClick={saveLogin}>Login</button>


            </div>
           
        
            
        </div>
    )
}
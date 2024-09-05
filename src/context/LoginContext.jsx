import { createContext, useState } from "react";

export const LoginContext = createContext();
export default function LoginProvider({children}){
    const [nameLogin,setNameLogin] = useState("")
    const [passwordLogin,setPasswordLogin] = useState("")
    return (
        <LoginContext.Provider value={{ nameLogin,setNameLogin,passwordLogin,setPasswordLogin }}>
            {children}
        </LoginContext.Provider>

    )
}
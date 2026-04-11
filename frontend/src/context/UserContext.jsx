import React,{createContext} from 'react'
import { useState } from 'react'


export const UserDataContext = createContext()

function UserContext({children}) {

    const [user,setUser] = useState({
        fullName:{
            firstName: '',
            lastName: ''
         },
        email: '',
        }
    )

    return (
        <div>
            <UserDataContext.Provider value={user}>
                {children}
            </UserDataContext.Provider>
        </div>   
    )
}

export default UserContext

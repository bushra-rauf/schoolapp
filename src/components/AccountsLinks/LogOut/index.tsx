'use client'

import { LogOut } from "../../../actions/log-out"

// import { LogOut } from "lucide-react"


const LogOutButton = () => {

    const handleClick = () => {
         LogOut()
    }
    return(
        <button onClick={handleClick}className='button-secondary'>LogOut</button>
    )
}

export default LogOutButton




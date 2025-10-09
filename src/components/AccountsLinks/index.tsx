
import Link from "next/link"
import {createClient} from'../../utils/supabase/server-client'
import LogOut from "./LogOut"
import LogOutButton from "./LogOut"

const AccountLinks = async () =>{
    const supabase = await createClient()
    const {data: {user}, error} = await supabase.auth.getUser()
    
    return(
        <div>
            {
                user ? 
                <>
                 : <Link href='/create' className='button-tertiary'>Create Post</Link>
                <LogOutButton/>
                </>
           : <Link href='/auth/login' className='button-primary'>LogIn</Link>
           
          }
            </div>
    )
}

export default AccountLinks
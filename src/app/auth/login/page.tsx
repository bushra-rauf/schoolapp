import Link from "next/link"
import LoginFoam from "./LoginFoam"

const loginPage = () => {
    return(
        <>
       
        <div className="mt-20 border-1 rounded-xl p-4 w-140 h-80 mx-auto ">
             <LoginFoam/>
            Dont have an account ? sign up <Link className='text-red-500' href='/auth/signup'>here!</Link>
        </div>
        </>
    )
}

export default loginPage
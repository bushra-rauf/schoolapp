import Link from "next/link"
import SignUpForm from "./SignUpForm"

const signUpPage = () => {
    return (
        
        <div className="mt-20 border-1 rounded-xl p-4 w-140 h-80 mx-auto ">
            <h2 className="text-bold mb-4">SignUp</h2>
             <SignUpForm/>
            Already have an account ? Log in <Link className='text-red-500' href='/auth/login'>here!</Link>
        </div>
    )
}

export default signUpPage
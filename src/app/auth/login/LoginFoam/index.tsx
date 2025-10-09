"use client"
import { LogIn } from "../../../../actions/log-in"
import {useForm} from 'react-hook-form'
import { logInSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { useMutation } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"

const LoginFoam = () => {
    const {register, 
        handleSubmit,
    formState:{errors}} = useForm({
        resolver: zodResolver(logInSchema)
    })

    const {mutate,isPending,error} = useMutation({
        mutationFn: LogIn,
    })
    return(
      <>
        <form onSubmit={handleSubmit(values => mutate(values) )}className='flex flex-col mb-4'>
            <h2 className="mb-6"> Log in!</h2>
            <fieldset>
                <label className="font-bold text-2xl p-2" htmlFor= 'email'>Enter your email</label>
                  <input className='ml-2 mb-6 px-2'{...register('email')} id='email'name='email' type='current-password' placeholder="Enter your email..."></input>
                  {errors.email && <ErrorMessage message={errors.email.message!}/>}
            </fieldset>
              <fieldset>
                <label className="font-bold text-2xl p-2"htmlFor= 'password'>Enter your password</label>
                <input className='ml-2 mb-6 px-2'{...register('password')} id='password'name='password' type='current-password' placeholder="Enter your password..."></input>
                                  {errors.password && <ErrorMessage message={errors.password.message!}/>}
            </fieldset>
            <button className="button-secondary w-full m-auto">{isPending? "logging you in": "Log in"}</button>
        </form> 
        {error && <ErrorMessage message={error.message}/>}    
      </>
    )
}

export default LoginFoam
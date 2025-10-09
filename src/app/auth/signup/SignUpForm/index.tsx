// import { zodResolver } from "@hookform/resolvers/zod"
// import { SignUp } from "../../../../actions/sign-up"
// import { signUpSchema } from "@/actions/schemas"
// import { useForm } from "react-hook-form"
// import { useMutation } from "@tanstack/react-query"
// import ErrorMessage from "@/components/ErrorMessage"

// const SignUpForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: {error}
//   }
//      = useForm({
//          resolver: zodResolver(signUpSchema)
//     })
//     const {mutate, error} = useMutation ({
// mutationFn: SignUp
//     })
   
//     return(
//       <>
//         <form onSubmit ={handleSubmit{values=> SignUp(values)}}className='flex flex-col mb-4'>
            
//             <fieldset>
//                 <label className="font-bold text-2xl p-2  mr-4" htmlFor= 'email'>Enter your email</label>
//                 <input  className=' ml-12 mb-3 py-4 'id='email' name='email' {...register("email")}placeholder="Enter your email..."></input>
//                                   {error.email && <ErrorMessage message={error.email.message!}/>}
//             </fieldset>
//             <fieldset>
//                 <label className="font-bold text-2xl p-2"  htmlFor= 'username'>Enter your username</label>
//                 <input className='ml-2 mb-6 px-1'id='username' name='username'type='username' {...register('username')}placeholder="Enter your username..."></input>
//                                   {error.email && <ErrorMessage message={error.username.message!}/>}
//             </fieldset>
//               <fieldset>
//                 <label className="font-bold text-2xl p-2" htmlFor= 'password'>Enter your password</label>
//                 <input className='ml-2 mb-6 px-2'id='password'name='password' type='current-password'{...register('password')} placeholder="Enter your password..."></input>
//                                   {errors.email && <ErrorMessage message={error.password.message!}/>}
//             </fieldset>
//             <button className="button-secondary w-full m-auto">Sign Up</button>
//                     {error && <ErrorMessage message={error.message}/>}   
//         </form>    
//       </>
//     )
// }

// export default SignUpForm
'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUp } from "../../../../actions/sign-up"
import { signUpSchema } from "@/actions/schemas"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import ErrorMessage from "@/components/ErrorMessage"
import type { z } from "zod"

// Optional: Type your form inputs using zod inference
type SignUpFormValues = z.infer<typeof signUpSchema>

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  })

  const { mutate,isPending, error: mutationError } = useMutation({
    mutationFn: SignUp,
  })

  const onSubmit = (values: SignUpFormValues) => {
    mutate(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mb-4">
      <fieldset>
        <label className="font-bold text-2xl p-2 mr-4" htmlFor="email">
          Enter your email
        </label>
        <input
          className="ml-12 mb-3 py-4"
          id="email"
          type="email"
          {...register("email")}
          placeholder="Enter your email..."
        />
        {errors.email && <ErrorMessage message={errors.email.message!} />}
      </fieldset>

      <fieldset>
        <label className="font-bold text-2xl p-2" htmlFor="username">
          Enter your username
        </label>
        <input
          className="ml-2 mb-6 px-1"
          id="username"
          type="text"
          {...register("username")}
          placeholder="Enter your username..."
        />
        {errors.username && (
          <ErrorMessage message={errors.username.message!} />
        )}
      </fieldset>

      <fieldset>
        <label className="font-bold text-2xl p-2" htmlFor="password">
          Enter your password
        </label>
        <input
          className="ml-2 mb-6 px-2"
          id="password"
          type="password"
          {...register("password")}
          placeholder="Enter your password..."
        />
        {errors.password && (
          <ErrorMessage message={errors.password.message!} />
        )}
      </fieldset>
        <button className="button-secondary w-full m-auto">{isPending? "logging you in": "Log in"}</button>
      
    </form>    
       
     )
 }
 export default SignUpForm
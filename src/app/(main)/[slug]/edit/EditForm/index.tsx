'use client'
import { EditPost } from "@/actions/edit-post"
import ErrorMessage from "@/components/ErrorMessage"
import { Tables } from "@/utils/supabase/database.types"
import { useMutation } from "@tanstack/react-query"

import { useForm } from "react-hook-form"

 const EditForm =  async({postId, defaultValues} : {postId: number, defaultValues: Pick<Tables<'posts'>, 'title' | 'content'> }) => {
       const {register, handleSubmit} = useForm({
        defaultValues: {
            title: defaultValues.title,
            content: defaultValues.content
        }
       })
       const {mutate, error} = useMutation({
              mutationFn: EditPost
       })

    

        return(
            <>
            <form onSubmit={handleSubmit(values => mutate({postId, usedata: {title: values.title, content: values.content!}}))} className='flex flex-col  mb-4'>
           
             <fieldset>
               
                <label className="font-bold text-2xl p-2 center" htmlFor= 'title'>Post title</label>
                <input className=' border-1 rounded-sm center ml-2 mb-6 px-2 max-w-[200px]'{...register('title')} id='title' placeholder="what is your post call."></input>
            
            </fieldset>
           < fieldset>
               
                 <label className="font-bold text-2xl p-2 center" htmlFor= 'content'>what you want to talk about</label>
                   <textarea className=' border-1 rounded-sm center ml-2 mb-6 px-2 max-w-[200px]'{...register('content')} id='content' placeholder="what is your post call."/>
            
            </fieldset>
            <button className="button-tertiary">Update Post!</button>
            
             </form>
                     {error && <ErrorMessage message={error.message}/>} 
      </>
    )
}

export default EditForm
'use client'
import { EditPost } from "@/actions/edit-post"
import { postSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { Tables } from "@/utils/supabase/database.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import z from "zod"

 const EditForm =  ({postId, defaultValues} : {postId: number, defaultValues: Pick<Tables<'posts'>, 'title' | 'content' | 'image'> }) => {
    
      const schemaWithImage = postSchema.omit({image: true})
      .extend({image: z.unknown().transform(value => {return value as (FileList)}).optional()})

       const {register, handleSubmit} = useForm({
        resolver: zodResolver(schemaWithImage),
        defaultValues: {
            title: defaultValues.title,
            content: defaultValues.content || undefined,
            image: defaultValues.image
        }
       })

       const {mutate, error} = useMutation({
              mutationFn: EditPost
       })

        return(
            <>
            <form onSubmit={handleSubmit(values => {
                  let imageForm =  undefined;

                  if (values.image?.length && typeof values.image !== 'string') {
                    imageForm = new FormData()
                    console.log('values image', typeof values.image)
                   imageForm.append('image', values.image[0])
            }
                mutate({postId, usedata: {title: values.title, content: values.content!, image: imageForm}}) } ) } className='flex flex-col  mb-4'>
        
              <fieldset>
                <label className="font-bold text-2xl p-2 center" htmlFor= 'title'>Post title</label>
                <input className=' border-1 rounded-sm center ml-2 mb-6 px-2 max-w-[200px]'{...register('title')} id='title' placeholder="what is your post called..."></input>
             </fieldset>
           < fieldset>
               <label className="font-bold text-2xl p-2 center" htmlFor= 'content'>what you want to talk about?</label>
               <textarea className=' border-1 rounded-sm center ml-2 mb-6 px-2 max-w-[200px]'{...register('content')} id='content' placeholder="Start talking...."/>
            
            </fieldset>
             < fieldset>
               {defaultValues.image && <img className="'w-3xl" src={defaultValues.image}alt='post image'/>}
                 <label className="font-bold text-2xl p-2 center" htmlFor= 'image'>Upload a new image for you</label>
                 <input {...register("image")} id="image"type="file" />
            </fieldset>
            <button className="button-tertiary">Update Post!</button>
            
             </form>
                     {error && <ErrorMessage message={error.message}/>} 
      </>
    )
}

export default EditForm
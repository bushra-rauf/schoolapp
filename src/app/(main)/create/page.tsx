'use client'
import { postSchema } from "@/actions/schemas"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { CreatePost } from "@/actions/create"
import ErrorMessage from "@/components/ErrorMessage"
import { error } from "console"
import z from "zod"

const createPage = () => {
  const schemaWithImage = postSchema.omit({image: true})
  .extend({image: z.unknown().transform(value => {return value as (FileList)}).optional()})
const {register, handleSubmit, formState: {errors}}= useForm ({
    resolver: zodResolver(schemaWithImage)
})

  const { mutate, error: mutationError } = useMutation({
    mutationFn: CreatePost,
    onMutate:() => console.log('...CreatePost'),
    onSettled: () => console.log('Post is created')

  })

// console.log('hello')
//     return(
//       <>
//       <div className="mt-20 border-1 rounded-xl p-4 w-3xl h-80 mx-auto ">
//        <form onSubmit={ () => handleSubmit(values => mutate(values) )}className='flex flex-col  mb-4'>
//             <h2 className=" mb-6"> Log in!</h2>
//             <fieldset>
//               <div className="border-1 rounded-2xl mt-3">
//                 <label className="font-bold text-2xl p-2 center" htmlFor= 'title'>Post title</label>
//                   <input className=' border-1 rounded-sm center ml-2 mb-6 px-2 max-w-[200px]'{...register('title')} id='title'name='title' type='title' placeholder="title."></input>
//               </div>
//             </fieldset>
//               <fieldset>
//                 <label className=" font-bold text-2xl p-2"htmlFor= 'post content'>Content</label>
//                 <input className='ml-2 mb-6 px-2'{...register('content')} id='post content'name='post content' type='post content' placeholder="post content"></input>

//             </fieldset>
            
      
        
//         </div>
//         <div className="mt-10 border-1 p-5 rounded-2xl max-w-3xl mx-auto">
//         <button type="submit" className="w-[190px] button-secondary text-center">Create Post</button>
//            </form>
//         </div>
        
//        </> 
//     )
// }
// export default createPage

 
  return ( 
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
        <h2 className="font-bold text-3xl mb-6 text-center text-gray-800">
          Create post
        </h2>
 
        <form onSubmit={handleSubmit(values => {
          let imageForm = new FormData()

          if (values.image?.length){
             imageForm.append('image', values.image[0])
          }
          

         
          mutate({title: values.title, content: values.content, image: imageForm})
        }
        )} className="space-y-6">

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1">
              Post Title
            </label>
            <input
              {...register("title")}
              id="title"
              type="text"
              placeholder="What is your post title?"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-3"/>
          </div>
 
          {/* Content */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              {...register("content")}
              id="content"
              rows={4}
              placeholder="Write your post here..."
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-3"
            />
          </div>
          <fieldset>
            <label htmlFor="image">upload an image for your post if you like</label>
            <input type='file'{...register('image')} id='image' name='image'></input>
            {errors.image && <ErrorMessage message={errors.image.message!}></ErrorMessage>}
          </fieldset>
 
          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};
 
export default createPage;
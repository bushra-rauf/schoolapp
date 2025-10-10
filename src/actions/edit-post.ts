'use server'
import z from "zod";
import { postSchema } from "./schemas";
import { createClient } from "@/utils/supabase/server-client";
import { revalidatePath } from "next/cache";

import { slugify } from "@/utils/slugify";
import { redirect } from "next/navigation";
import { uploadImage } from "@/utils/supabase/upload-image";

export const EditPost = async ({postId,usedata}: {postId: number, usedata: z.infer<typeof postSchema>}) => {
    console.log('image param', usedata.image, 'type', typeof usedata.image)

    const parasedData = postSchema.parse(usedata)
    const imageFile = usedata.image?.get('image')
    console.log('image file', imageFile, typeof imageFile )

    let publicImageUrl;
    if((typeof imageFile !== 'string') && imageFile !== undefined) {
       if(!(imageFile instanceof File) && imageFile !== null) {
           throw new Error('Malformed Image File')
    }
    publicImageUrl = await uploadImage(imageFile!)
  }  else {
    publicImageUrl = imageFile;
  }
    
    
    // const publicImageUrl = imageFile ? await uploadImage(imageFile) : null
    
     
    
    const supabase = await createClient()
    const {data: {user}} = await supabase.auth.getUser()

      const {data: post, error} = await supabase.from('posts')
                                                .select('*')
                                                .eq('id',postId)
                                                .single()
    

    if(!user || user.id !== post?.user_id) throw new Error('Not Authorised')
      
    
      // ...parasedData, slug: slugify(parasedData.title),
      // image: publicImageUrl ?? null   // ensure here its a string or null
    
    
 const {data:updatedPost} =   await supabase.from('posts')
                  .update({ ...parasedData, image: publicImageUrl, slug: slugify(parasedData.title)}) 
                  .eq('id', postId)
                  .select('slug')
                  .single()
                  .throwOnError()                                                


if(error) throw error 

revalidatePath("/")
redirect(`/${updatedPost.slug}`)

}
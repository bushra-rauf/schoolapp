'use server'
import z from "zod";
import { postSchema } from "./schemas";
import { createClient } from "@/utils/supabase/server-client";
import { revalidatePath } from "next/cache";

import { slugify } from "@/utils/slugify";
import { redirect } from "next/navigation";

export const EditPost = async ({postId,usedata}: {postId: number, usedata: z.infer<typeof postSchema>}) => {
    
    const parasedData = postSchema.parse(usedata)
    
    const supabase = await createClient()
    const {data: {user}} = await supabase.auth.getUser()

      const {data: post, error} = await supabase.from('posts')
                                                .select('*')
                                                .eq('id',postId)
                                                .single()
    

    if(!user || user.id !== post?.user_id) throw new Error('Not Authorised')
      
    const {data: updatedPost} =
    await supabase.from('posts')
                  .update({...parasedData, slug: slugify(parasedData.title)}) 
                  .eq('id', postId)
                  .select('slug')
                  .single()
                  .throwOnError()                                                


if(error) throw error 

revalidatePath("/")
redirect(`/${updatedPost.slug}`)

}
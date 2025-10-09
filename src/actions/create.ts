'use server'

import z from "zod"
import { postSchema } from "./schemas"
import { createClient } from "@/utils/supabase/server-client";
import { slugify } from "@/utils/slugify";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadImage } from "@/utils/supabase/upload-image";

export const CreatePost = async (usedata: z.infer<typeof postSchema>) => {

    const parasedData = postSchema.parse(usedata)
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    if (!user) {throw new Error('Not authorized')}

    const slug = slugify(parasedData.title)

const imageFile = usedata.image?.get('image')


if(!(imageFile instanceof File) && imageFile !== null) {
    throw new Error('Malformed Image File')
}


const publicImageUrl = imageFile ? await uploadImage(imageFile): null

    const userId = user.id;

    const {error} = await supabase .from('posts')
                                   .insert([{ user_id: userId, slug: slug, ...parasedData, image: publicImageUrl}])
                                   .throwOnError()

        revalidatePath('/')
        redirect(`/${slug}`)

}

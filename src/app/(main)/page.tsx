import Image from "next/image";

import { getHomePosts} from "../../utils/supabase/quries";
import HomePosts from "@/components/Home/HomePosts";
import { createClient} from '../../utils/supabase/server-client'
import cache from 'next/cache'
import Link from "next/link";

export const revalidate=600
export default async function Home() {
  const supabase = await createClient()
  const {data, error} = await getHomePosts(supabase)
 
  return (
    <div className="w-[60%] mx-auto">
        {/* <HomePosts posts={data!}/> */}
         {data && data.map(({id, title,slug, users})=> 
            <Link  href={`/${slug}`} className=" block border-1 rounded mt-4 p-4" key={id}>
                <h2 className="font-bold text-xl">{title}</h2> 
                <div className="text-right"> {users.username} </div>
            </Link> )}
    </div>  
  )
}

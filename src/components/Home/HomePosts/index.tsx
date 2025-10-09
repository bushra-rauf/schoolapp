'use client'
import Link from "next/link";
import { getHomePosts, HomePostType } from "../../../utils/supabase/quries";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "../../../utils/supabase/browser-client";

const HomePosts = ({posts}:{posts:HomePostType}) => {
    const {data} = useQuery({
        queryKey:['homepost'],
        queryFn: async ()  => {
            const supabase = createClient()
            const {data,error} = await getHomePosts(supabase)

            if(error) throw error
            return data
        },
        initialData: posts,
        refetchOnMount: false,
          staleTime:10000 * 10 //  wait 10 sec and you have to do refresh it 
        // refetchInterval:3000   // refetch state away after every 3 seconds
    })
    
    return (
        <div>
            {data && data.map(({id, title,slug, users})=> 
            <Link  href={`/${slug}`} className=" block border-1 rounded mt-4 p-4" key={id}>
                <h2 className="font-bold text-xl">{title}</h2> 
                <div className="text-right"> {users.username} </div>
            </Link> )}
        </div>
    )
}

export default HomePosts
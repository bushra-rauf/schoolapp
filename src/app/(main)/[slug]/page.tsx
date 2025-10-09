
import { createClient } from "@/utils/supabase/server-client"
import { getSinglePost } from "../../../utils/supabase/quries"
import DeleteButton from "./DeleteButton"
import EditButton from "./EditButton"

const SinglePost = async({params}:{params:{slug:string}}) => {
    const {slug} = await params
    
    const {data, error} = await getSinglePost(slug)
    const supabase = await createClient()
    const {data:{user}} = await supabase.auth.getUser()
    const isAuthor = user?.id === data?.user_id ? true : false
    console.log('logged')

    if(!data){
        return error ?(
        <p className="text-red-500">Error: {error.message}</p>)
        
        : <p> No post found</p>
    } 
    return(
      <>       
       {data &&
          <div
          className="flex flex-col items-center border mt-10 mx-auto p-6 max-w-2xl"
          style={{
            boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75)",
          }}
        >
          <h4 className="self-start text-2xl font-semibold mb-2">{data.id}</h4>
          <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
          { data.content &&
          <p className="text-xl mb-6">{data.content}</p>
          }
          <p className="text-gray-700 self-end"> {data.users.username.toUpperCase()}</p>
          {data.image && <div className="border mt-5 p-4"><img src={data.image}/></div> }
          {isAuthor && 
          <div className=" flex justify-between border mt-10 mx-auto p-6 max-w-2xl text-gray-700 self-end">
            <DeleteButton postId={data.id}/>
            <EditButton slug={slug}/>
            </div>}
          <p className="text-sm text-gray-500 self-end">
            {new Date(data.created_at).toLocaleString()}
          </p>
        
        </div>
}
        </>
      

    )
  }

export default SinglePost
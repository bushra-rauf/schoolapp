import { getSinglePost } from "@/utils/supabase/quries"
import EditForm from "./EditForm"

const EditPage = async({params}:{params:{slug:string}}) => {
    const {slug} = await params
    
    const {data, error} = await getSinglePost(slug)
    return(
        <div>
        { data && 
        <EditForm postId={data.id}defaultValues={{title: data.title,content: data.content} }/>
        }
        </div>
    )

}

export default EditPage
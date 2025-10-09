'use client'
import DeletePost from "@/actions/delete-post"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
const DeleteButton = ({postId}:{postId: number}) =>{
    const {mutate,isPending,error} = useMutation({
        mutationFn: DeletePost,
        onMutate:()=> toast('Deleting the post')
        // onSettled:()=> success.
    })
    return <button className="button-tertiary" onClick={()=> mutate(postId)}> Delete Post </button>

}

export default DeleteButton
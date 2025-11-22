import { useCallback } from "react"
import { useForm } from "react-hook-form"
import {Button,Input,Select,RTE} from "../index"
import appwriteService from "../../appwrite/config"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const PostForm = ({post}) => {
    const useNavigate = navigate(); 
    const {register,handleSubmit,watch,setValue,
        control,getValues
             }= useForm({
                //incase user form pr edit karne aaya ho 
                //isliye default values, agar hai toh theek hai 
                //nahi toh black 
                defaultValues: {
                    title: post?.title || '',
                    slug: post?.slug || '',
                    content: post?.content|| '',
                    status: post?.status || 'active',

                }
             })
    const userData = useSelector(state.user.userData);

    const submit = async(data)=>{
        if(post){
           const file =  data.image[0] ? appwriteService.uploadFile(data.image): null; 
            if(file){
                appwriteService.deleteFile(post.featuredImage)
           }
        }
    }
  return (
    <div>PostForm</div>
  )
}

export default PostForm
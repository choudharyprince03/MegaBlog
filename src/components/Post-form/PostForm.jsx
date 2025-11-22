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

                }})

    const userData = useSelector(state.user.userData);

    const submit = async(data)=>{
        if(post){
           const file =  data.image[0] ? await appwriteService.uploadFile(data.image[0]): null; 
            if(file){
                await appwriteService.deleteFile(post.featuredImage)
           }
           const dbPost = await appwriteService.updatePost(
            post.$id,{
                ...data,
                featuredImage: file ? file.$id : post.featuredImage,
            })
            if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
        }
        else {
            if(!data.image[0]){
                console.log("insert a Photo first!")
                return; 
            }
            const file = await appwriteService.uploadFile(data.image[0])    
            
            if(file){
                const dbPost  = await appwriteService.createPost({
                    ...data,
                    featuredImage:  file.$id,
                    userId: userData.$id
                })
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

  return (
    <div>PostForm</div>
  )
}

export default PostForm
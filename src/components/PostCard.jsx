
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

const PostCard=({$id, title, featuredImage})=> {

  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-white/50 shadow-sm border border-gray-100  text-black/70 rounded-xl p-4 mt-5'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage).toString()} alt={title}
                className='rounded-xl' />
            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard
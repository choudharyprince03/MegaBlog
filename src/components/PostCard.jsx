import appwriteService from "../appwrite/config" 
import {Link} from 'react-router-dom'


const PostCard = ({ $id, title, featuredImage }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="
        w-full 
        bg-white/50 
        shadow-sm 
        border border-gray-100  
        text-black/70 
        rounded-xl
        p-4 
        hover:shadow-md
        transition
      ">
        <div className="w-full mb-4 flex justify-center">
          <img
            src={ appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl w-full object-cover"
          />
          
        </div>
        <h2 className="text-lg md:text-xl font-bold">
          {title}
        </h2>
      </div>
    </Link>
  );
};
export default PostCard;
import appwriteService from "../appwrite/config" 
import {Link} from 'react-router-dom'


const PostCard = ({ $id, title, featuredImage, draggable, onDragStart, onDragOver, onDrop }) => {
  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={draggable ? "cursor-move" : "cursor-pointer"}
    >
      <Link to={`/post/${$id}`}>
        <div className="
          w-full 
          h-full
          bg-white/50 
          shadow-sm 
          border border-gray-100  
          text-black/70 
          rounded-xl
          p-4 
          hover:shadow-md
          transition
          flex flex-col
          hover:bg-white/70
        ">
          <div className="w-full mb-4 flex justify-center flex-shrink-0">
            <img
              src={ appwriteService.getFilePreview(featuredImage)}
              alt={title}
              className="rounded-xl w-full h-55 object-cover"
            />
            
          </div>
          <h2 className="text-lg md:text-xl font-bold line-clamp-3">
            {title}
          </h2>
        </div>
      </Link>
    </div>
  );
};
export default PostCard;
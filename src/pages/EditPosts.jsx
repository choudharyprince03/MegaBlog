import { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
    const [post, setPosts] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post);
                }
            });
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

    const deletePost = async () => {
        const status = confirm("Are you sure you want to delete this post?");
        if (status) {
            await appwriteService.deletePost(post.$id).then((status) => {
                if (status) {
                    appwriteService.deleteFile(post.featuredImage);
                    navigate("/");
                }
            });
        }
    };

    return post ? (
        <div className='py-8'>
            <Container className='max-w-7xl w-full mx-auto'>
                
                {/* Main Layout: Responsive - Stacked on mobile, Side-by-side on desktop */}
                <div className='flex flex-col lg:flex-row gap-8'>
                    
                    {/* === LEFT COLUMN: Big Image & Buttons === */}
                    <div className='w-full lg:w-1/3 flex flex-col gap-4 order-1 lg:order-1'>
                        
                        {/* Large Featured Image - Bigger on mobile */}
                        <div className='w-full h-64 sm:h-72 md:h-72 lg:h-96 rounded-xl overflow-hidden shadow-lg border border-gray-300'>
                            <img 
                                src={appwriteService.getFilePreview(post.featuredImage)} 
                                alt={post.title}
                                className='w-full h-full object-cover'
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className='flex gap-3 w-full relative'>
                            <button 
                                className='flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all'
                                onClick={() => navigate(`/post/${post.$id}`)}
                            >
                                View
                            </button>
                            
                            <button 
                                className='flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all'
                                onClick={deletePost}
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                    {/* === RIGHT COLUMN: Content Form === */}
                    <div className='w-full lg:w-2/3 order-2 lg:order-2'>
                        <PostForm post={post} />
                    </div>

                </div>
            </Container>
        </div>
    ) : null;
}

export default EditPost;
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 flex ">
            <Container  className="">
                    <div className="w-full flex justify-center mb-6 relative p-2">
                        <div className="w-full h-40 sm:h-56 md:h-80 lg:h-96 rounded-lg overflow-hidden flex items-center justify-center ">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage).toString()}
                                alt={post.title}
                                className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300 border-4 border-white rounded-lg shadow-2xl cursor-pointer"
                                onClick={() => setIsModalOpen(true)}
                            />
                        </div>

                        {isAuthor && (
                            <div className="absolute right-2 top-2 space-x-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-600" className=" bg-green-700
                                    text-white cursor-pointer hover:bg-green-800 shadow-2xl
                                    rounded-b-2xl p-2" >
                                            Edit
                                    </Button>
                                </Link>
                                    <Button 
                                            className=" bg-red-700 hover:bg-red-800 shadow-2xl cursor-pointer text-white rounded-b-2xl p-2"
                                            onClick={deletePost}>
                                        Delete
                                    </Button>
                            </div>
                        )}
                    </div>

                    {/* Image Modal/Popup */}
                    {isModalOpen && (
                        <div 
                            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <div 
                                className="relative w-full h-full max-w-6xl max-h-screen flex items-center justify-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img
                                    src={appwriteService.getFilePreview(post.featuredImage).toString()}
                                    alt={post.title}
                                    className="w-full h-auto max-h-[95vh] object-contain"
                                />
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-4 right-4 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center text-2xl hover:bg-gray-200 transition"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    )}

                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}
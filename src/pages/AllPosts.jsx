import { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

const AllPosts = () => {
    const [posts, setPosts] = useState([]);

    // Fetch posts correctly
    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap min-h-screen">

                    {posts.map((post) => (
                        <div
                            key={post.$id}
                            className="
                                p-2 
                                w-full       /* mobile: 1 per row */
                                sm:w-1/2     /* small screens: 2 per row */
                                lg:w-1/4     /* large screens: 4 per row */
                            "
                        >
                            <PostCard {...post} />
                        </div>
                    ))}

                </div>
            </Container>
        </div>
    );
};

export default AllPosts;

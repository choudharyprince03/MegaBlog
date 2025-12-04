import { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config"
import { Query } from "appwrite";

const AllPosts = () => {
    const [posts,setPosts] = useState([])
    const userData = useSelector((state)=>state.auth.userData); 
    const userId = userData?.$id
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        if(!userId) return ;

        appwriteService.getPosts([Query.equal('userId', userId)

        ]).then((posts)=>{
          if(posts)
             { setPosts(posts.documents)
                setLoading(false)
             }

        })
    },[userId])
    if(posts.length==0){
        return (
            <div className="flex justify-center items-center min-h-screen text-4xl text-white">
                <h1>
                    No posts uploaded yet 
                    Upload some posts!
                    🙃
                </h1>
            </div>
        )
    }
    if(!loading){
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
    }
    if(loading){
        return(
            <div className="justify-center flex ">
                posts are loading...
            </div>
        );
    }
   
};

export default AllPosts;

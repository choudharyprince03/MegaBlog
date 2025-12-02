import {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'

const Home =()=> {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap min-h-screen">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No posts available
                            </h1>
                            <p className="text-sm text-gray-500">Sign in to create posts.</p>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
  <div className='w-full py-8'>
    <Container>
      <div className="grid 
        grid-cols-1       /* 1 column on phones */
        sm:grid-cols-2    /* 2 columns on small screens */
        md:grid-cols-3    /* 3 columns on medium screens */
        lg:grid-cols-4    /* 4 columns on large screens */
        gap-8
        min-h-screen"
      >
        {posts.map((post) => (
          <PostCard key={post.$id} {...post} />
        ))}
      </div>
    </Container>
  </div>
)

}

export default Home
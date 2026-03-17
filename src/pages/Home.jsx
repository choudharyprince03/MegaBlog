import {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import { Query } from 'appwrite';

const Home =()=> {
    const [posts, setPosts] = useState([])
    const [originalPosts, setOriginalPosts] = useState([])
    const [draggedCard, setDraggedCard] = useState(null)

    useEffect(() => {
        appwriteService.getPosts([Query.equal("status","active")]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
                setOriginalPosts(posts.documents)
            }
        })
    }, [])

    const handleDragStart = (e, postId) => {
        setDraggedCard(postId)
        e.dataTransfer.effectAllowed = 'move'
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
    }

    const handleDrop = (e, targetPostId) => {
        e.preventDefault()
        if (!draggedCard || draggedCard === targetPostId) return

        const draggedIndex = posts.findIndex(p => p.$id === draggedCard)
        const targetIndex = posts.findIndex(p => p.$id === targetPostId)

        const newPosts = [...posts]
        const [draggedPost] = newPosts.splice(draggedIndex, 1)
        newPosts.splice(targetIndex, 0, draggedPost)

        setPosts(newPosts)
        setDraggedCard(null)
    }

    const resetToDefault = () => {
        setPosts(originalPosts)
    }
  
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
      <div className="flex justify-end mb-4">
        <button
          onClick={resetToDefault}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 active:scale-95"
        >
          🔄 Arrange to Default
        </button>
      </div>
      <div className="grid 
        grid-cols-1       /* 1 column on phones */
        sm:grid-cols-2    /* 2 columns on small screens */
        md:grid-cols-3    /* 3 columns on medium screens */
        lg:grid-cols-4    /* 4 columns on large screens */
        gap-6
        auto-rows-max
        min-h-screen"
      >
        {posts.map((post) => (
          <PostCard 
            key={post.$id} 
            {...post}
            draggable={true}
            onDragStart={(e) => handleDragStart(e, post.$id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, post.$id)}
          />
        ))}
      </div>
    </Container>
  </div>
)

}

export default Home
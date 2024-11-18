"use client"
import React from 'react'
import { useState , useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@components/Profile'



const MyProfile = () => {

    const {data : session} = useSession() ;
    const router = useRouter() ;
    const [posts, setPosts] = useState([])
    useEffect(()=>{

        const fetchPosts = async ()=>{
            const response = await fetch("/api/users/"+session?.user.id +"/posts" ) ;
            const data = await response.json() ; 
            setPosts(data)
        }
    
        if(session?.user.id){
            fetchPosts()
        }
      } , [])


    function handelEdit(post){
        router.push(`/update-prompt?id=${post._id}`)
    }
    
    async function handelDelete(post) {
      const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
    
      if (hasConfirmed) {
        try {
          await fetch(`/api/prompt/${post._id.toString()}`, {
            method: "DELETE",
          });
    
          const filteredPosts = posts.filter((p) => p._id !== post._id);
          setPosts(filteredPosts);
        } catch (error) {
          console.log(error);
        }
      }
    }

  return (
    <div>
      <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handelEdit={handelEdit}
      handelDelete = {handelDelete}
      />
    </div>
  )
}

export default MyProfile

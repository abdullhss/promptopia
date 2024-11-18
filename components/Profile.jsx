import React from 'react'
import PromptCard from './PromptCard'


export default function Profile({name ,desc ,data ,handelEdit ,handelDelete}) {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} profile</span>
      </h1>
      <p className='desc text-left'>
        {desc}
      </p>

      <div className='mt-10 prompt_layout '>
      {data.map((post)=> (<PromptCard key={post._id} post={post}
        
        handelDelete={()=>{handelDelete(post)}}
        handelEdit={()=>{handelEdit(post)}}
        />) )}
      </div>

    </section>
  )
}

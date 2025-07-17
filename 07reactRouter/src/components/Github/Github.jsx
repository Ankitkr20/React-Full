import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useLoaderData } from 'react-router'

function Github() {
    // const [data, setData] = useState([])
    // useEffect(() => {
    //     fetch('https://api.github.com/users/ankitkr20')
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data)
    //         setData(data)
    //     })
    // },[])
    const data = useLoaderData();
  return (
    <>
    <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>Github followers:{data.followers}
    </div>
    <img className='w-60 h-60 hover:scale-105 hover-grayscale transition rounded-full border-2 shadow-lg opacity-full' src={data.avatar_url} alt="Git Picture" />
    </>
  )
}

export default Github
export const githubInfoLoader = async() =>{
    const response = await fetch('https://api.github.com/users/ankitkr20')
    return response.json()
}
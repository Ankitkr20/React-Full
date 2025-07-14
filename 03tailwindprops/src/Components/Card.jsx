import React from 'react'

function Card({username,quality}) {
  return (
    <div className="flex flex-col items-center gap-6 p-7 md:flex-row md:gap-8 rounded-2xl bg-gray-800 shadow-lg">
        <div>
          <img
            className="size-48 shadow-xl rounded-md"
            alt=""
            src="https://media.istockphoto.com/id/1305740732/vector/rock-on-hand-sign-vector-illustration.jpg?s=612x612&w=0&k=20&c=_5W5BXWY-kYpNHP3AievAaqTHH_Vj002hr6ZEWczmSQ="
          />
        </div>
        <div className="flex flex-col gap-1 items-center md:items-start">
          <span className="text-2xl font-medium">{username}</span>
          <span className="font-medium text-sky-500">The {quality}-Patterns</span>
          <span className="flex gap-2 font-medium text-gray-600 dark:text-gray-400">
            <span>No. 4</span>
            <span>·</span>
            <span>2025</span>
          </span>
        </div>
      </div>
  )
}

export default Card
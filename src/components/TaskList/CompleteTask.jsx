import React from 'react'

const CompleteTask = ({data}) => {
  return (
    <div className='flex-shrink-0 h-full w-[320px] p-6 bg-gray-900 border border-gray-800 rounded-xl shadow'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-gray-800 text-white text-xs px-3 py-1 rounded-full border border-gray-700'>{data.category}</h3>
                <h4 className='text-gray-400 text-sm'>{data.taskDate}</h4>
            </div>
            <h2 className='mt-5 text-lg font-semibold text-white'>{data.taskTitle}</h2>
            <p className='text-gray-300 text-sm mt-3'>
                {data.taskDescription}
            </p>
            <div className='mt-6'>
                <span className='text-emerald-400 text-xs font-semibold'>Completed</span>
            </div>
        </div>
  )
}

export default CompleteTask
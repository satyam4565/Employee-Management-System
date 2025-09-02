import React from 'react'

const TaskListNumbers = ({data}) => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8'>
        <div className='rounded-xl py-5 px-6 bg-gray-900 border border-gray-800'>
            <div className='text-2xl font-bold text-white'>{data.taskCounts.newTask}</div>
            <div className='text-sm text-gray-400 mt-1'>New</div>
        </div>
        <div className='rounded-xl py-5 px-6 bg-gray-900 border border-gray-800'>
            <div className='text-2xl font-bold text-white'>{data.taskCounts.completed}</div>
            <div className='text-sm text-gray-400 mt-1'>Completed</div>
        </div>
        <div className='rounded-xl py-5 px-6 bg-gray-900 border border-gray-800'>
            <div className='text-2xl font-bold text-white'>{data.taskCounts.active}</div>
            <div className='text-sm text-gray-400 mt-1'>Active</div>
        </div>
        <div className='rounded-xl py-5 px-6 bg-gray-900 border border-gray-800'>
            <div className='text-2xl font-bold text-white'>{data.taskCounts.failed}</div>
            <div className='text-sm text-gray-400 mt-1'>Failed</div>
        </div>
    </div>
  )
}

export default TaskListNumbers
import React from 'react'

const AcceptTask = ({ data }) => {
  return (
    <div className="flex-shrink-0 h-full w-[300px] p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="flex justify-between items-center">
        <h3 className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-medium">
          {data.category}
        </h3>
        <h4 className="text-gray-500 text-sm font-medium">{data.taskDate}</h4>
      </div>
      <h2 className="mt-5 text-xl font-bold text-gray-800">{data.taskTitle}</h2>
      <p className="text-gray-600 text-sm mt-3 leading-relaxed">
        {data.taskDescription}
      </p>
      <div className="flex justify-between mt-6">
        <button className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white rounded-lg font-medium py-2 px-4 text-xs shadow-md hover:shadow-lg transition-all duration-300">
          Mark as Completed
        </button>
        <button className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white rounded-lg font-medium py-2 px-4 text-xs shadow-md hover:shadow-lg transition-all duration-300">
          Mark as Failed
        </button>
      </div>
    </div>
  )
}

export default AcceptTask
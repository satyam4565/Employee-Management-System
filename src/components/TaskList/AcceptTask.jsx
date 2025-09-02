import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AcceptTask = ({ data }) => {
  const [userData, setUserData] = useContext(AuthContext)

  const updateTaskStatus = (completed) => {
    const updated = userData.map(employee => {
      const tasks = employee.tasks.map(task => {
        if (task === data) {
          return {
            ...task,
            active: false,
            completed: completed,
            failed: !completed
          }
        }
        return task
      })

      const contains = employee.tasks.includes(data)
      const taskCounts = contains ? {
        ...employee.taskCounts,
        active: Math.max(0, employee.taskCounts.active - 1),
        completed: employee.taskCounts.completed + (completed ? 1 : 0),
        failed: employee.taskCounts.failed + (!completed ? 1 : 0)
      } : employee.taskCounts

      return { ...employee, tasks, taskCounts }
    })
    setUserData(updated)
  }
  return (
    <div className="flex-shrink-0 h-full w-[320px] p-6 bg-gray-900 border border-gray-800 rounded-xl shadow">
      <div className="flex justify-between items-center">
        <h3 className="bg-gray-800 text-white text-xs px-3 py-1 rounded-full font-medium border border-gray-700">
          {data.category}
        </h3>
        <h4 className="text-gray-400 text-sm font-medium">{data.taskDate}</h4>
      </div>
      <h2 className="mt-5 text-lg font-semibold text-white">{data.taskTitle}</h2>
      <p className="text-gray-300 text-sm mt-3 leading-relaxed">
        {data.taskDescription}
      </p>
      <div className="flex justify-between mt-6">
        <button onClick={() => updateTaskStatus(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium py-2 px-4 text-xs">
          Mark as Completed
        </button>
        <button onClick={() => updateTaskStatus(false)} className="bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium py-2 px-4 text-xs">
          Mark as Failed
        </button>
      </div>
    </div>
  )
}

export default AcceptTask
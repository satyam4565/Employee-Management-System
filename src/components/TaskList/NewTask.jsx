import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const NewTask = ({data}) => {
    const [userData, setUserData] = useContext(AuthContext)

    const acceptTask = () => {
        const updated = userData.map(employee => {
            const tasks = employee.tasks.map(task => {
                if (task === data) {
                    return { ...task, newTask: false, active: true }
                }
                return task
            })
            const taskCounts = employee.tasks.includes(data)
                ? {
                    ...employee.taskCounts,
                    newTask: Math.max(0, employee.taskCounts.newTask - 1),
                    active: employee.taskCounts.active + 1
                }
                : employee.taskCounts
            return { ...employee, tasks, taskCounts }
        })
        setUserData(updated)
    }
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
                <button onClick={acceptTask} className='bg-blue-600 hover:bg-blue-700 text-white rounded font-medium py-2 px-4 text-xs'>Accept Task</button>
            </div>
        </div>
    )
}

export default NewTask
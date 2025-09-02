import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const CreateTask = () => {

    const [userData, setUserData] = useContext(AuthContext)

    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [asignTo, setAsignTo] = useState('')
    const [category, setCategory] = useState('')

    const [newTask, setNewTask] = useState({})

    const submitHandler = (e) => {
        e.preventDefault()

        const createdTask = { taskTitle, taskDescription, taskDate, category, active: false, newTask: true, failed: false, completed: false }
        setNewTask(createdTask)

        const updated = userData.map((employee) => {
            if (asignTo === employee.firstName) {
                return {
                    ...employee,
                    tasks: [...employee.tasks, createdTask],
                    taskCounts: {
                        ...employee.taskCounts,
                        newTask: employee.taskCounts.newTask + 1
                    }
                }
            }
            return employee
        })
        setUserData(updated)
        console.log(updated);

        setTaskTitle('')
        setCategory('')
        setAsignTo('')
        setTaskDate('')
        setTaskDescription('')

    }

    return (
        <div className="p-10 bg-gray-950 mt-6 rounded-2xl shadow-xl border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6 tracking-wide">Create a new task</h2>
          <form
            onSubmit={(e) => {
              submitHandler(e)
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Task Title</label>
              <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                required
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl py-3 px-5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                placeholder="Enter task title"
              />
            </div>
      
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl py-3 px-5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                placeholder="Enter category"
              />
            </div>
      
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Assign To</label>
              <select
                value={asignTo}
                onChange={(e) => setAsignTo(e.target.value)}
                required
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl py-3 px-5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              >
                <option value="" disabled>Select employee</option>
                {userData.map((emp) => (
                  <option key={emp.id} value={emp.firstName}>{emp.firstName} ({emp.email})</option>
                ))}
              </select>
            </div>
      
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Task Date</label>
              <input
                type="date"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                required
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl py-3 px-5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>
      
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">Task Description</label>
              <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                required
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition resize-none"
                placeholder="Enter task description"
                rows="5"
              ></textarea>
            </div>
      
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold text-lg py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                ✅ Create Task
              </button>
            </div>
          </form>
        </div>
      )
      
}

export default CreateTask
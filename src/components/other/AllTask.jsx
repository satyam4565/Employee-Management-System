import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AllTask = () => {
  const [userData, setUserData] = useContext(AuthContext)

  return (
    <div className="bg-gray-950 p-8 rounded-2xl mt-8 shadow-2xl border border-gray-800">
      <div className="bg-gradient-to-r from-emerald-500 to-blue-500 mb-6 py-4 px-6 rounded-xl shadow-md flex justify-between items-center text-white font-bold text-base sm:text-lg tracking-wide">
        <span className="w-1/5 text-left">👤 Employee</span>
        <span className="w-1/5 text-center">🆕 New</span>
        <span className="w-1/5 text-center">🚧 Active</span>
        <span className="w-1/5 text-center">✅ Completed</span>
        <span className="w-1/5 text-center">❌ Failed</span>
      </div>

      <div className="space-y-4">
        {userData.map((elem, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center py-4 px-6 rounded-xl border border-emerald-500 bg-gray-900 hover:bg-gray-800 transition duration-300 shadow-sm hover:shadow-md"
          >
            <span className="w-1/5 text-left text-white font-medium truncate">{elem.firstName}</span>
            <span className="w-1/5 text-center text-blue-400 font-semibold">{elem.taskCounts.newTask}</span>
            <span className="w-1/5 text-center text-yellow-400 font-semibold">{elem.taskCounts.active}</span>
            <span className="w-1/5 text-center text-green-400 font-semibold">{elem.taskCounts.completed}</span>
            <span className="w-1/5 text-center text-red-500 font-semibold">{elem.taskCounts.failed}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllTask

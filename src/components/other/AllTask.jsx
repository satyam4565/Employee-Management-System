import React, { useContext, useMemo, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { ToastContext } from '../../context/ToastProvider'

const AllTask = () => {
  const [userData, setUserData] = useContext(AuthContext)
  const toast = React.useContext(ToastContext)
  const [selected, setSelected] = useState(null)
  const [editingTitle, setEditingTitle] = useState('')
  const [editingDescription, setEditingDescription] = useState('')
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return userData.filter((e) => {
      const nameMatch = !q || e.firstName.toLowerCase().includes(q) || (e.email || '').toLowerCase().includes(q)
      if (!nameMatch) return false
      if (status === 'all') return true
      if (status === 'new') return e.taskCounts.newTask > 0
      if (status === 'active') return e.taskCounts.active > 0
      if (status === 'completed') return e.taskCounts.completed > 0
      if (status === 'failed') return e.taskCounts.failed > 0
      return true
    })
  }, [userData, query, status])

  return (
    <div className="bg-gray-950 p-8 rounded-2xl mt-8 shadow-xl border border-gray-800">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
        <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search by name or email" className="w-full sm:w-1/2 bg-gray-900 text-white border border-gray-700 rounded-xl py-2.5 px-4" />
        <select value={status} onChange={(e)=>setStatus(e.target.value)} className="bg-gray-900 text-white border border-gray-700 rounded-xl py-2.5 px-4 w-full sm:w-auto">
          <option value="all">All</option>
          <option value="new">New</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
      </div>
      <div className="bg-gray-900 border border-gray-800 mb-6 py-3 px-6 rounded-xl flex justify-between items-center text-white font-semibold text-sm sm:text-base tracking-wide">
        <span className="w-1/5 text-left">Employee</span>
        <span className="w-1/5 text-center">New</span>
        <span className="w-1/5 text-center">Active</span>
        <span className="w-1/5 text-center">Completed</span>
        <span className="w-1/5 text-center">Failed</span>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="text-center text-gray-400 py-6">No employees match your filters.</div>
        )}
        {filtered.map((elem, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center py-4 px-6 rounded-xl border border-gray-800 bg-gray-900 hover:bg-gray-800 transition duration-300"
          >
            <span className="w-1/5 text-left text-white font-medium truncate">{elem.firstName}</span>
            <span className="w-1/5 text-center text-blue-400 font-semibold">{elem.taskCounts.newTask}</span>
            <span className="w-1/5 text-center text-yellow-400 font-semibold">{elem.taskCounts.active}</span>
            <span className="w-1/5 text-center text-green-400 font-semibold">{elem.taskCounts.completed}</span>
            <span className="w-1/5 text-center text-red-500 font-semibold">{elem.taskCounts.failed}</span>
            <div className="flex gap-2 ml-4">
              <button onClick={() => setSelected(elem)} className="text-sm text-emerald-400 underline">View tasks</button>
              <button onClick={() => {
                const confirmDelete = window.confirm(`Delete user ${elem.firstName}? This cannot be undone.`)
                if(!confirmDelete) return
                const updated = userData.filter(u => u.id !== elem.id)
                setUserData(updated)
                localStorage.setItem('employees', JSON.stringify(updated))
                toast.show('User deleted', 'success')
              }} className="text-sm text-red-400 underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 text-white w-full max-w-2xl rounded-2xl border border-gray-700 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">{selected.firstName}'s tasks</h3>
              <button onClick={() => setSelected(null)} className="px-3 py-1.5 rounded bg-gray-700">Close</button>
            </div>
            {selected.tasks.length === 0 && (
              <div className="text-gray-400 py-6 text-center">No tasks for this employee.</div>
            )}
            <div className="space-y-3 max-h-96 overflow-auto">
              {selected.tasks.map((t, i) => (
                <div key={i} className="border border-gray-700 rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-300">{t.category} • {t.taskDate}</div>
                      <div className="font-semibold">{t.taskTitle}</div>
                    </div>
                    <div className="text-xs">
                      {t.newTask && <span className="text-blue-400">New</span>}
                      {t.active && <span className="text-yellow-400"> Active</span>}
                      {t.completed && <span className="text-green-400"> Completed</span>}
                      {t.failed && <span className="text-red-400"> Failed</span>}
                    </div>
                  </div>
                  <div className="text-sm text-gray-300 mt-1">{t.taskDescription}</div>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => { setEditingTitle(t.taskTitle); setEditingDescription(t.taskDescription); setSelected({ ...selected, editingIndex: i }) }} className="px-3 py-1.5 rounded bg-emerald-600 text-white text-sm">Edit</button>
                    <button onClick={() => {
                      // delete task
                      const updated = userData.map(emp => {
                        if (emp.id === selected.id) {
                          const task = emp.tasks[i]
                          const counts = { ...emp.taskCounts }
                          if (task.newTask) counts.newTask = Math.max(0, counts.newTask - 1)
                          if (task.active) counts.active = Math.max(0, counts.active - 1)
                          if (task.completed) counts.completed = Math.max(0, counts.completed - 1)
                          if (task.failed) counts.failed = Math.max(0, counts.failed - 1)
                          return { ...emp, tasks: emp.tasks.filter((_, idx) => idx !== i), taskCounts: counts }
                        }
                        return emp
                      })
                      setUserData(updated)
                      toast.show('Task deleted', 'success')
                      // refresh selected from updated data
                      const fresh = updated.find(e => e.id === selected.id)
                      setSelected(fresh)
                    }} className="px-3 py-1.5 rounded bg-red-600 text-white text-sm">Delete</button>
                  </div>
                </div>
              ))}
            </div>
            {typeof selected.editingIndex === 'number' && (
              <div className="mt-4 border-t border-gray-700 pt-4">
                <h4 className="font-semibold mb-2">Edit task</h4>
                <div className="grid grid-cols-1 gap-2">
                  <input className="bg-gray-800 border border-gray-700 rounded px-3 py-2" value={editingTitle} onChange={(e)=>setEditingTitle(e.target.value)} placeholder="Title" />
                  <textarea className="bg-gray-800 border border-gray-700 rounded px-3 py-2" rows="3" value={editingDescription} onChange={(e)=>setEditingDescription(e.target.value)} placeholder="Description" />
                </div>
                <div className="flex justify-end gap-2 mt-3">
                  <button onClick={() => setSelected(prev => ({ ...prev, editingIndex: undefined }))} className="px-3 py-1.5 rounded bg-gray-700">Cancel</button>
                  <button onClick={() => {
                    const idx = selected.editingIndex
                    const updated = userData.map(emp => {
                      if (emp.id === selected.id) {
                        const tasks = emp.tasks.map((t, i) => i === idx ? { ...t, taskTitle: editingTitle, taskDescription: editingDescription } : t)
                        return { ...emp, tasks }
                      }
                      return emp
                    })
                    setUserData(updated)
                    toast.show('Task updated', 'success')
                    const fresh = updated.find(e => e.id === selected.id)
                    setSelected(fresh)
                  }} className="px-3 py-1.5 rounded bg-emerald-600">Save</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AllTask

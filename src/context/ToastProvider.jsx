import React, { createContext, useCallback, useMemo, useState } from 'react'

export const ToastContext = createContext({ show: () => {} })

const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([])

    const remove = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }, [])

    const show = useCallback((message, type = 'info', duration = 2500) => {
        const id = Math.random().toString(36).slice(2)
        const toast = { id, message, type }
        setToasts((prev) => [...prev, toast])
        window.setTimeout(() => remove(id), duration)
    }, [remove])

    const value = useMemo(() => ({ show }), [show])

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div className="fixed bottom-4 right-4 z-50 space-y-2">
                {toasts.map((t) => (
                    <div key={t.id} className={`px-4 py-3 rounded-xl shadow-lg text-white ${t.type === 'error' ? 'bg-red-600' : t.type === 'success' ? 'bg-green-600' : 'bg-gray-800'}`}>
                        {t.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export default ToastProvider



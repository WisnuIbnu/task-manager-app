import React from 'react'
import { useState } from 'react'
import { DEFAULT_TASK } from '../assets/dummy'
import { useEffect } from 'react'


const API_BASE = 'http://localhost:4000/api/tasks'

const TaskModal = ({ isOpen, onClose, taskToEdit, onSave, onLogout }) => {

  const [taskData, setTaskData] = useState(DEFAULT_TASK)
  const [loading, setLoading] = useState(false)
  const [ error, setError ] =useState(null)
  const today = new Date().toISOString().split(T)[0];


  useEffect(() => {
    if(!isOpen) return;
    if(taskToEdit) {
      const normalized = taskToEdit.completed === "Yes" ||taskToEdit.completed === true
    }
  })

  return (
    <div className=' fixed inset-0 backdrop-blur-sm bg-black/20 z-50 flex items-center justify-center p-4'>
      <div className=' bg-white border border-purple-100 rounded-xl max-w-md w-full shadow-lg p-6 animate-fadeIn'>
        <h2 className=' text-2xl font-bold text-gray-800 items-center gap-2'>
          {}
        </h2>
      </div>
    </div>
  )
}

export default TaskModal

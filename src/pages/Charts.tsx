import React, { useState } from 'react'
import { supabase } from '../supabaseClient'

const Charts: React.FC = () => {
  const [chart, setChart] = useState({
    name: '',
    description: '',
    imageUrl: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setChart(prevChart => ({
      ...prevChart,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase
        .from('charts')
        .insert([chart])
      
      if (error) throw error
      console.log('Chart added:', data)
      // Reset form or show success message
    } catch (error) {
      console.error('Error adding chart:', error)
      // Show error message to user
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Chart</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Chart Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={chart.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={chart.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            rows={3}
          ></textarea>
        </div>
        <div>
          <label htmlFor="imageUrl" className="block mb-1">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={chart.imageUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Add Chart
        </button>
      </form>
    </div>
  )
}

export default Charts
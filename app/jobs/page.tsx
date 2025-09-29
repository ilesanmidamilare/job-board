import React from 'react'

const JobsPaoge = () => {
  return (
    <div className='space-y-8'>
        <div className='bg-white p-6 rounded-lg shadow-sm'>
            <h1 className='text-2xl font-bold text-gray-900 mb-6 '>Find Jobs</h1>
            <form className='grid- gap-4 md:grid-cols-3'>
                <input
                    type='text'
                    name='q'
                    placeholder='Search jobs...'
                    className='border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900'
                />
                <select
                  name='type'
                  className='border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900'

                >
                  <option value="">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Intership">Internship</option>
                </select>
                <input
                  type='text'
                  name='location'
                  id='location'
                  required  
                  className='mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                />

                <button
                  type='submit'
                  className='md:col-span-3 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700'
                >
                  Search
                </button>
            </form>

        </div>

        <div className='grid gap-6'>
          {/* {
            Jobs.map((job) => 
            {})
          } */}

        </div>
    </div>
  )
}

export default JobsPaoge
import React from 'react'

const PostJobPage = () => {
  return (
    <div className='max-w-2xl mx-auto'>
      <h1 className='text-2xl font-bold text-gray-900 mb-5'>Post a Job</h1>
      <form className='space-y-6'>
          <div>
            <label
              htmlFor='title'
              className='block text-sm font-medium text-gray-700'
            >

              Job Title
            </label>
            <input
              type='text'
              name='title'
              id='title'
              required  
              className=''
            />
          </div>
      </form>

    </div>
  )
}

export default PostJobPage
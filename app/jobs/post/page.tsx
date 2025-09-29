"use client"

import React, {FormEvent} from 'react'

const PostJobPage = () => {

 const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.currentTarget;

  const formData = new FormData(form);
  const data = {
    title: formData.get("title") as string,
    company: formData.get("company") as string,
    location: formData.get("location") as string,
    type: formData.get("type") as string,
    description: formData.get("description") as string,
    salary: formData.get("salary") as string | null,
  };

  try {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      console.error("Failed to post job:", await res.text());
      return;
    }

    const result = await res.json();
    console.log("Job posted successfully:", result);

    // Optionally reset the form
    form.reset();

    window.location.href = "/jobs"
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

  return (
    <div className='max-w-2xl mx-auto'>
      <h1 className='text-2xl font-bold text-gray-900 mb-5'>Post a Job</h1>
      <form className='space-y-6' onSubmit={handleSubmit}>
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
              className='mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
          </div>

          <div>
            <label
              htmlFor='company'
              className='block text-sm font-medium text-gray-700'
            >

              Company
            </label>
            <input
              type='text'
              name='company'
              id='company'
              required  
              className='mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
          </div>

          <div>
            <label
              htmlFor='location'
              className='block text-sm font-medium text-gray-700'
            >

              Location
            </label>
            <input
              type='text'
              name='location'
              id='location'
              required  
              className='mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
          </div>

          <div>
            <label
              htmlFor='type'
              className='block text-sm font-medium text-gray-700'
            >

              Job Type
            </label>
            <select
              name='type'
              id='type'
              required  
              className='mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            >

              <option value="">Select a type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Intership">Internship</option>
            </select>
          </div>

          <div>
            <label
              htmlFor='description'
              className='block text-sm font-medium text-gray-700'
            >

              Description
            </label>
            <textarea
              name='description'
              id='description'
              rows={6}
              required  
              className='mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
          </div>

          <div>
            <label
              htmlFor='salary'
              className='block text-sm font-medium text-gray-700'
            >

              Salary (optional)
            </label>
            <input
              type='text'
              name='salary'
              id='salary'
              placeholder='e.g $80,000 - $100,000'
              className='mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
          </div>

          <button 
            type='submit'
            className='w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Post job
          </button>
      </form>

    </div>
  )
}

export default PostJobPage
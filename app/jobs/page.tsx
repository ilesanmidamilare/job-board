import { prisma } from '@/lib/prisma'
import { MoveRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const JobsPage = async () => {

  const  jobs = await prisma.job.findMany({
    orderBy: { postedAt: 'desc' },
    include: { postedBy:true }
  })

  return (
    <div className='space-y-8'>
        <div className='bg-white p-6 rounded-lg shadow-sm'>
            <h1 className='text-2xl font-bold text-gray-900 mb-6 '>Find Jobs</h1>
            <form className='grid gap-4 md:grid-cols-3'>
                <input
                    type='text'
                    name='q'
                    placeholder='Search jobs...'
                    className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900'
                />
                <select
                  name='type'
                  className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900'

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
                  placeholder='Location'
                  className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900'
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
          {
            jobs.map(({id, title, company, location, type, description, salary, postedBy}) => (
                <div key={id}
                  className='bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow'
                >
                    <div className='flex justify-between items-start'>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                          {title}
                        </h2>
                        <p className='text-gray-600 mb-2'>{company}</p>
                        <div className='flex items-center text-sm text-gray-500 mb-4'>
                          <span className='mr-4'>{location}</span>
                          <span>{type}</span>
                        </div>
                        <p className='text-gray-600 mb-4 line-clamp-2'>
                          {description}
                        </p>
                      </div>

                      {
                        salary && (
                          <span className='text-lg font-semibold text-gray-900'>
                            {salary}
                          </span>
                      
                        )
                      }
                      </div>

                      <div className='flex justify-between items-center'>
                        <span className='text-sm text-gray-500'>
                          {postedBy.name}
                        </span>
                        <Link
                          href={`jobs/${id}`}
                          className='text-indigo-600 hover:text-indigo-700 font-medium flex gap-1'
                        >
                          View Details 
                          <MoveRight />
                        </Link>

                      </div>
                </div>
            ))
          }

        </div>
    </div>
  )
}

export default JobsPage
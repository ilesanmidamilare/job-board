import { prisma } from '@/lib/prisma';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import React from 'react'
import ApplyButton from './ApplyButton';
import { notFound } from 'next/navigation';

const JobPage = async({
    params,
}:{
    params: Promise<{id: string}>;
}) => {

    // const jobId = (await params).id
    // const job = await prisma.job.findUnique({
    //     where:{id: jobId},
    //     include:{postedBy: true},
    // });

    const { id: jobId } = await params;
    const job = await prisma.job.findUnique({
        where: { id: jobId },
        include: { postedBy: true },
    });


    if(!job) {
        notFound()
        // console.log('not found')
    }
  return (
    <div className='max-w-4xl mx-auto'>
        <div className='bg-white rounded-lg shadow-sm p-8'>
            <div className='mb-8'>
                <Link
                    href={"/jobs"}
                    className='text-indigo-500 hover:text-indigo-700 font-medium mb-4 inline-block'
                >
                    Back to jobs
                </Link>
                <h1 className='text-3xl font-bold text-gray-900 mb-2'>{job?.title}</h1>
                <p className='text-xl text-gray-600 mb-4'>{job?.company}</p>
                <div>
                    <span>{job?.location}</span>
                    <span>.</span>
                    <span>{job?.type}</span>
                    {job?.salary && (
                        <>
                            <span>.</span>
                            <span className='text-gray-900 font-medium'>{job.salary}</span>
                        </>
                    )}
                </div>
                <div className='flex items-center text-sm text-gray-500'>
                    <span>Posted by {job?.postedBy.name}</span>
                    <span className='mx-2'>.</span>
                    <span> 
                        {job?.postedAt ? formatDistanceToNow(new Date(job.postedAt), {addSuffix:true}) : 'Date not available'}
                    </span>
                </div>
            </div>

            <div className='prose max-w-none'>
                <h2 className='text-xl font-semibold text-gray-900 mb-4'>
                    Job Description
                </h2>
                <div className='text-gray-600 whitespace-pre-wrap'>
                    {job?.description}
                </div>
            </div>

            <div className='mt-8 pt-8 border-t border-gray-200'>
                <ApplyButton jobId={job.id}/>
                {/* <p>{job.id}</p> */}
            </div>
        </div>
    </div>
  )
}

export default JobPage
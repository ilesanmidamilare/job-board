import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import React from 'react'

const JobPage = async({
    params
}:{
    params: Promise<{id: string}>;
}) => {

    const jobId = (await params).id
    const job = await prisma.job.findUnique({
        where:{id: jobId},
        include:{postedBy: true},
    });

    if(!job) {
       console.log('not found')
    }
  return (
    <div className='max-w-4xl mx-auto'>
        <div className='bg-white rounded-lg shadow-sm p-8'>
            <div className='mb-8'>
                <Link
                    href={"/jobs"}
                >
                </Link>
            </div>

        </div>
    </div>
  )
}

export default JobPage

import {auth} from "@/auth"
import Link from "next/link"
import { prisma } from '@/lib/prisma'
import { redirect } from "next/navigation"

export default async function DashboardPage() {
    const session = await auth()
  
    if(!session?.user?.id) {
        redirect('/auth/signin')
    }

    const [applications, postedJobs] = await Promise.all([
       //Applications query
        prisma.application.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                job: {
                    include: {
                        postedBy: true,

                    },
                },
            },
            orderBy: {
                appliedAt: "desc"
            }
        }),
        //Jobs query
        prisma.job.findMany({
            where: {
                postedById: session.user.id
            },
            include: {
                _count: {
                    select: {
                        applications: true
                    },
                },
            },

            orderBy: {
                postedAt: 'desc'
            }
        })
    ])

    return(
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

            <div className="grid gap-8 md:grid-cols-2">
                {/* post job dscription */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">Posted Jobs</h2>
                        <Link 
                            href="/jobs/post"
                        >
                            Post New Job
                        </Link>

                    </div>

                    <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
                        {/* { postedJobs.length === 0 ? (
                            <p className="p-6 text-gray-500 text-center">
                                You haven't posted any jobs yet
                            </p>
                        ) : (
                            postedJobs.map((job) => (
                                <div key={job.id} className="p-6">
                                    <div className="flex justify-between items-start">

                                    </div>
                                </div>
                            ))
                        )

                        } */}

                    </div>
                </div>
            </div>

        </div>
    )
}
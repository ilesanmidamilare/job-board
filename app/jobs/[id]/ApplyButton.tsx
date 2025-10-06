"use client"
import { MoveRight } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const ApplyButton = ({jobId}: {jobId: string}) => {
  const {data: session, status} = useSession()
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [applicationStatus, setApplicationStatus] = useState<"idle" | "success" | "error">("idle")
  const handleApply = async() => {
    if(!session){
      router.push("/auth/signin")
      return 
    }

    setErrorMessage('')
    setApplicationStatus('idle')

    try{

      const response = await fetch(`/api/jobs/${jobId}/apply`, {
        method: "POST"
      })
      setApplicationStatus("success")
    }catch(error){
      if(error instanceof Error){
          setErrorMessage(error.message)
      } else {
        setErrorMessage("Failed to apply for the job")
      }
      setApplicationStatus("error")
        
    }

  }
  if(status === "loading"){
    return <button disabled> Loading...</button>
  }

  if(applicationStatus === "success") {
    return (
      <div>
        <p>Application submited successfull</p>
        <Link href={"/dashboard"}>View your application <MoveRight /></Link>
      </div>)
  }

  return (
    <>
        <button
          onClick={handleApply}
        >
            Apply for this position
        </button>
        {applicationStatus === 'error' && <p>{errorMessage}</p>}
    </>
  )
}

export default ApplyButton
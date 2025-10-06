"use client"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const ApplyButton = ({jobId}: {jobId: string}) => {
  const {data: session, status} = useSession()
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string>("")
  const handleApply = () => {
    if(!session){
      router.push("/auth/signin")
      return 
    }

    setErrorMessage('')

    try{

    }catch(error){
      if(error instanceof Error){
          setErrorMessage(error.message)
      } else {
        setErrorMessage("Failed to apply for the job")
      }
        
    }

  }
  if(status === "loading"){
    return <button disabled> Loading...</button>
  }
  return (
    <>
        <button
          onClick={handleApply}
        >
            Apply for this position
        </button>
    </>
  )
}

export default ApplyButton
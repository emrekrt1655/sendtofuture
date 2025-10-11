'use client'

import LoginCard from '@/app/components/LoginCard'
import InfoCard from '@/app/components/InfoCard'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-1/2 bg-gradient-to-b from-purple-500 to-pink-500 text-white flex items-center justify-center p-10">
        <InfoCard />
      </div>

      <div className="md:w-1/2 flex items-center justify-center p-10">
        <LoginCard />
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { FcGoogle } from 'react-icons/fc'
import { FaApple, FaFacebook } from 'react-icons/fa'

export default function LoginCard() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleEmailLogin = async () => {
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    else alert('Logged in successfully!')
    setLoading(false)
  }

  const handleOAuthLogin = async (provider: 'google' | 'apple' | 'facebook') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${location.origin}/dashboard` },
    })
    if (error) alert(error.message)
  }

  return (
    <div className="w-full max-w-sm p-8 border rounded-lg shadow-lg flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-center">Login / Register</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        onClick={handleEmailLogin}
        disabled={loading}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {loading ? 'Loading...' : 'Login with Email'}
      </button>

      <p className="text-center text-gray-500 my-2">Or continue with</p>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => handleOAuthLogin('google')}
          className="flex items-center justify-center w-10 h-10 rounded-full border hover:shadow-md transition"
        >
          <FcGoogle size={24} />
        </button>
        <button
          onClick={() => handleOAuthLogin('apple')}
          className="flex items-center justify-center w-10 h-10 rounded-full border hover:shadow-md transition"
        >
          <FaApple size={24} />
        </button>
        <button
          onClick={() => handleOAuthLogin('facebook')}
          className="flex items-center justify-center w-10 h-10 rounded-full border hover:shadow-md transition text-blue-700"
        >
          <FaFacebook size={24} />
        </button>
      </div>

      <p className="text-sm text-center text-gray-500 mt-4">
        By registering, you agree to our Terms of Service.
      </p>
    </div>
  )
}

import toast from 'react-hot-toast'
import { guestLogin } from '../api/auth'
import { toastStyles } from '../styles/toast'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuthStore } from '../store/auth'
import EmailModal from '../components/Auth/EmailModal'
import RegisterModal from '../components/Auth/RegisterModal'

const Auth = () => {
  const navigate = useNavigate()
  const profile = useAuthStore((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [loginModal, setLoginModal] = useState(false)
  const [registerModal, setRegisterModal] = useState(false)

  const handleGithubAuth = async () => {
    try {
      console.log('Authenticating...')
    } catch (err) {
      console.error(err)
    }
  }

  const handleGuestAuth = async () => {
    try {
      setLoading(true)

      await guestLogin().then(() => {
        toast('Logged in as Guest', {
          icon: '👌',
          style: toastStyles,
        })
      })

      navigate('/dashboard')
    } catch (err) {
      toast('Ups! Something went wrong.', {
        icon: '🙁',
        style: toastStyles,
      })
      console.error(err)
    }
  }

  useEffect(() => {
    if (profile) {
      navigate('/dashboard')
    }
  }, [navigate, profile])

  return (
    <div className="z-40 w-full py-4 duration-300">
      <div className="flex flex-col container pl-4 pr-4 md:pl-0 md:pr-0 m-auto items-center mt-20">
        <h1 className="text-3xl md:text-5xl mb-5 md:mb-7 font-medium tracking-wider p-3 pb-6 border-b-2">
          LOGIN
        </h1>
        <div className="flex flex-col">
          <button
            onClick={() => setLoginModal(!loginModal)}
            className="bg-blue-600 px-3 py-2 rounded-md w-auto"
          >
            <i className="bi bi-envelope pr-2"></i>
            Login with Email
          </button>
          <button
            onClick={handleGithubAuth}
            className="bg-[#1D1D1D] px-3 py-2 rounded-md w-auto mt-5"
          >
            <i className="bi bi-github pr-2"></i>
            Login with GitHub
          </button>
          <button
            disabled={loading}
            onClick={handleGuestAuth}
            className="bg-slate-600 px-3 py-2 rounded-md w-auto mt-5"
          >
            <i className="bi bi-person pr-2"></i>
            Continue as guest
          </button>
        </div>
      </div>
      {loginModal && (
        <EmailModal
          setLoginModal={setLoginModal}
          setRegisterModal={setRegisterModal}
        />
      )}
      {registerModal && (
        <RegisterModal
          setLoginModal={setLoginModal}
          setRegisterModal={setRegisterModal}
        />
      )}
    </div>
  )
}
export default Auth

import { useForm } from 'react-hook-form'
import Button from '../../ui/Button'
import toast from 'react-hot-toast'
import { toastStyles } from '../../styles/toast'
import { useNavigate } from 'react-router-dom'
import { loginEmail } from '../../api/auth'
import Alert from '../../ui/Alert'
import { AxiosError } from 'axios'
import { useState } from 'react'

interface Props {
  setLoginModal: React.Dispatch<React.SetStateAction<boolean>>
  setRegisterModal: React.Dispatch<React.SetStateAction<boolean>>
}

type Email = {
  email: string
  password: string
}

const EmailModal = ({ setLoginModal, setRegisterModal }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Email>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const loginHandler = async (values: Email) => {
    try {
      const { email, password } = values
      setLoading(true)
      await loginEmail(email, password)

      toast('Logged in successfully!', {
        icon: '🎉',
        style: toastStyles,
      })
      setLoginModal(false)
      navigate('/dashboard')
    } catch (error) {
      console.error(error)
      if (error instanceof AxiosError) {
        if (error.response?.data.status === 'Unauthorized') {
          toast('Invalid credentials', {
            icon: '🔐',
            style: toastStyles,
          })
          setLoading(false)
          return
        }
      }
      setLoading(false)
      setLoginModal(false)
      toast('Ups! Something went wrong.', {
        icon: '🙁',
        style: toastStyles,
      })
    }
  }

  const handleRegister = () => {
    setLoginModal(false)
    setRegisterModal(true)
  }

  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center z-40">
      <div
        onClick={() => setLoginModal(false)}
        className="absolute inset-0 bg-black opacity-80"
      ></div>
      <div className="bg-white p-6 rounded-md relative z-10">
        <form onSubmit={handleSubmit(loginHandler)}>
          <i
            onClick={() => {
              setLoginModal(false)
            }}
            className="bi bi-x text-3xl text-black absolute top-2 right-2 cursor-pointer rounded-md "
          ></i>
          <div className="container mt-2 text-black">
            <div className="flex flex-col my-2">
              <label htmlFor="email" className="py-2">
                Email
              </label>
              <input
                type="email"
                autoComplete="username"
                id="email"
                className="border-2 rounded-md px-2 focus:border-none"
                {...register('email', {
                  required: {
                    value: true,
                    message: 'Email is required',
                  },
                })}
              />
              {errors.email && (
                <Alert className="py-1 mt-4 -mb-1 justify-center">
                  {errors.email?.message}
                </Alert>
              )}
            </div>
            <div className="flex flex-col my-2">
              <label htmlFor="password" className="py-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                autoComplete="current-password"
                className="border-2 rounded-md px-2 focus:border-none"
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Password is required',
                  },
                })}
              />
              {errors.password && (
                <Alert className="py-1 mt-4 -mb-1 justify-center">
                  {errors.password?.message}
                </Alert>
              )}
            </div>
            <Button
              isLoading={loading}
              title="Login"
              type="submit"
              className="bg-blue-600 px-3 py-2 rounded-md mt-5 text-white justify-center font-medium uppercase mx-auto"
            >
              Login
            </Button>
          </div>
        </form>
        <div className="pt-4">
          <p className="text-black">
            Doesn't have an account?
            <button onClick={handleRegister}>
              <span className="text-blue-400 hover:cursor-pointer px-1">
                Register
              </span>
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default EmailModal

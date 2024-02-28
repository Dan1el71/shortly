import { useForm } from 'react-hook-form'
import Button from '../../ui/Button'
import Alert from '../../ui/Alert'
import toast from 'react-hot-toast'
import { toastStyles } from '../../styles/toast'
import { registerEmail } from '../../api/auth'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

interface Props {
  setLoginModal: React.Dispatch<React.SetStateAction<boolean>>
  setRegisterModal: React.Dispatch<React.SetStateAction<boolean>>
}

type EmailRegister = {
  email: string
  password: string
  username: string
}

const RegisterModal = ({ setLoginModal, setRegisterModal }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailRegister>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleRegister = async (values: EmailRegister) => {
    try {
      setLoading(true)
      await registerEmail(values.username, values.email, values.password).then(
        () => {
          toast('Registered successfully!', {
            icon: '🎉',
            style: toastStyles,
          })
        }
      )

      setRegisterModal(false)
      navigate('/dashboard')
    } catch (error) {
      console.error(error)
      setLoading(false)
      setRegisterModal(false)
      toast('Ups! Something went wrong.', {
        icon: '🙁',
        style: toastStyles,
      })
    }
  }

  const handleLogin = () => {
    setRegisterModal(false)
    setLoginModal(true)
  }

  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center z-40">
      <div
        onClick={() => setRegisterModal(false)}
        className="absolute inset-0 bg-black opacity-80"
      ></div>
      <div className="bg-white p-6 rounded-md relative z-10 ">
        <form onSubmit={handleSubmit(handleRegister)}>
          <i
            onClick={() => {
              setRegisterModal(false)
            }}
            className="bi bi-x text-3xl text-black absolute top-2 right-2 cursor-pointer rounded-md "
          ></i>
          <div className="container mt-2 text-black">
            <div className="flex flex-col my-2">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                autoComplete="off"
                id="username"
                className="border-2 rounded-md px-2 focus:border-none"
                {...register('username', {
                  required: {
                    value: true,
                    message: 'Username is required',
                  },
                  minLength: {
                    value: 3,
                    message: 'At least 3 characters long',
                  },
                })}
              />
              {errors.username && (
                <Alert className="py-1 mt-4 -mb-1 justify-center">
                  {errors.username?.message}
                </Alert>
              )}
            </div>
            <div className="flex flex-col my-2">
              <label htmlFor="email">Email</label>
              <input
                autoComplete="username"
                type="email"
                id="email"
                className="border-2 rounded-md px-2 focus:border-none"
                {...register('email', {
                  required: {
                    value: true,
                    message: 'Email is required',
                  },
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: 'Please enter a valid email',
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
              <label htmlFor="password">Password</label>
              <input
                autoComplete="current-password"
                type="password"
                id="password"
                className="border-2 rounded-md px-2 focus:border-none"
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Password is required',
                  },
                  minLength: {
                    value: 6,
                    message: 'At least 6 characters long',
                  },
                })}
              />
              {errors.password && (
                <Alert className="py-1 mt-4 -mb-1 justify-center w-auto">
                  {errors.password?.message}
                </Alert>
              )}
            </div>
            <Button
              isLoading={loading}
              title="Login"
              type="submit"
              className="bg-blue-600 px-3 py-2 rounded-md mt-5 mx-auto text-white font-medium uppercase"
            >
              Register
            </Button>
          </div>
        </form>
        <div className="pt-4">
          <p className="text-black">
            Already have an account?
            <button onClick={handleLogin}>
              <span className="text-blue-400 hover:cursor-pointer px-1">
                Log in
              </span>
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
export default RegisterModal

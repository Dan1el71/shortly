import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import { Dropdown, DropdownItem } from '../ui/Dropdown'
import { logout } from '../api/auth'
import toast from 'react-hot-toast'
import { toastStyles } from '../styles/toast'

const Auth = () => {
  const navigate = useNavigate()
  const profile = useAuthStore((state) => state.profile)
  const isAuth = useAuthStore((state) => state.isAuth)
  const logoutLocal = useAuthStore((state) => state.logout)

  const handleLogout = async () => {
    try {
      await logout()
      logoutLocal()

      toast('Logged out', {
        icon: '👋',
        style: toastStyles,
      })

      navigate('/')
    } catch (error) {
      toast('Ups! Something went wrong.', {
        icon: '🙁',
        style: toastStyles,
      })
      console.error(error)
    }
  }

  if (!isAuth)
    return (
      <Link
        to="/auth"
        className="p-2 cursor-pointer hover:text-gray-300 duration-200 transition-all rounded-md font-medium"
      >
        <p>Log in</p>
      </Link>
    )

  return (
    <Dropdown
      title={profile?.username}
      icon={<i className="bi bi-person-circle"></i>}
      className="bg-transparent "
    >
      <Link to="/dashboard/new">
        <DropdownItem icon={<i className="bi bi-plus "></i>}>
          Create new URL
        </DropdownItem>
      </Link>
      <Link to="/dashboard">
        <DropdownItem icon={<i className="bi bi-collection"></i>}>
          Dashboard
        </DropdownItem>
      </Link>
      <a
        href="https://github.com/Dan1el71/url-shorter/issues/new"
        target="_blank"
        rel="noreferrer"
      >
        <DropdownItem icon={<i className="bi bi-exclamation-triangle"></i>}>
          Report a problem
        </DropdownItem>
      </a>
      <DropdownItem
        icon={<i className="bi bi-box-arrow-left"></i>}
        onClick={handleLogout}
      >
        Logout
      </DropdownItem>
    </Dropdown>
  )
}
export default Auth

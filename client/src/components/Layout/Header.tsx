import { Link } from 'react-router-dom'
import Auth from '../Auth/Auth'

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full py-4 duration-300">
      <div className="flex container pl-4 pr-4 md:pl-0 md:pr-0 items-center justify-between mx-auto">
        <Link
          title="Home"
          to="/"
          className=" flex items-center cursor-pointer text-white hover:text-gray-300 transition-all"
        >
          <i className="bi bi-link-45deg text-3xl ml-2 mr-2"></i>
        </Link>
        <div className="flex items-center space-x-6  text-base">
          <Auth />
          <a
            href="https://github.com/Dan1el71/url-shorter"
            rel="noreferrer"
            target="blank"
            title="GitHub Repository"
          >
            <i className="bi bi-github text-2xl ml-2 mr-2 hover:text-gray-300 duration-200 transition-all  cursor-pointer"></i>
          </a>
        </div>
      </div>
    </header>
  )
}
export default Header

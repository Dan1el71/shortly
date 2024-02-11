import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="sticky top-0 z-40 w-full py-4 duration-300">
      <div className="flex container pl-4 pr-4 md:pl-0 md:pr-0 items-center justify-between mx-auto">
        <Link
          to="/"
          className=" flex items-center cursor-pointer text-white hover:text-gray-300 transition-all"
        >
          <i className="bi bi-link-45deg text-3xl ml-2 mr-2"></i>
        </Link>
        <div className="flex items-center space-x-6  text-base">
          <Link
            to="/auth"
            className="p-2 cursor-pointer hover:text-gray-300 duration-200 transition-all rounded-md font-medium"
          >
            <p>Log in</p>
          </Link>
          <a
            href="https://github.com/Dan1el71/url-shorter"
            rel="noreferrer"
            target="blank"
          >
            <i className="bi bi-github text-2xl ml-2 mr-2 hover:text-gray-300 duration-200 transition-all  cursor-pointer"></i>
          </a>
          <i className="bi bi-list text-2xl ml-2 mr-2 hover:text-gray-300 duration-200 transition-all cursor-pointer"></i>
        </div>
      </div>
    </div>
  )
}
export default Header

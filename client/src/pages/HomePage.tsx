import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <>
      <div className="z-40 w-full py-4 duration-300">
        <div className="flex flex-col container pl-4 pr-4 md:pl-0 md:pr-0 m-auto items-center mt-32">
          <h1 className="text-3xl md:text-5xl mb-2 md:mb-5 font-medium tracking-wider p-2">
            Short any URL
          </h1>
          <div>
            <div className="flex rounded-md px-4 py-2 text-center justify-between cursor-pointer hover:text-gray-300 duration-200 transition-all">
              <i className="bi bi-plus"></i>
              <Link to="/dashboard" className="pl-1 font-medium">
                Create New Link
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default HomePage

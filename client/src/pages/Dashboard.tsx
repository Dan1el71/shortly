import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { userUrls } from '../api/graphql/queries'
import { Url } from '../types/types'
import { useAuthStore } from '../store/auth'

const Dashboard = () => {
  const profile = useAuthStore((state) => state.profile)

  const { data, loading } = useQuery(userUrls, {
    variables: {
      AuthorId: profile?._id,
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
  })

  return (
    <div className="z-40 w-full duration-300">
      <div className="flex flex-col container pl-4 pr-4 md:pl-0 md:pr-0 m-auto mt-4">
        <div className="flex justify-between border-b-2 pb-4 border-gray-800">
          <h1 className="text-xl font-semibold uppercase  tracking-wider pr-2">
            Dashboard
          </h1>
          <Link to="/dashboard/new">
            <button className="font-normal tracking-wider mx-2 rounded-md">
              <i className="bi bi-plus pr-2"></i>
              New Link
            </button>
          </Link>
        </div>
        <div className="pt-10">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className="flex flex-wrap">
              {data?.userUrls.map((url: Url) => (
                <li
                  key={url.id}
                  className="p-4 mr-4 mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 rounded-md border-2 border-gray-800"
                >
                  <Link to={`/${url.slug}`}>
                    <h2 className="text-lg font-semibold">{url.slug}</h2>
                  </Link>

                  <p>Visitas: {url.visits}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
export default Dashboard

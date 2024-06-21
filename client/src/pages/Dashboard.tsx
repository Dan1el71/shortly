import { useMutation, useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { userUrls } from '../api/graphql/queries'
import { Url } from '../types/types'
import { useAuthStore } from '../store/auth'
import Button from '../ui/Button'
import { deleteUrl } from '../api/graphql/mutations'
import toast from 'react-hot-toast'
import { toastStyles } from '../styles/toast'

const Dashboard = () => {
  const profile = useAuthStore((state) => state.profile)
  const [deleteUrlMutation, { loading: deleteLoading }] = useMutation(deleteUrl)

  const { data, loading, refetch } = useQuery(userUrls, {
    variables: {
      AuthorId: profile?._id,
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
  })

  const copyToClipboard = async (txt: string) => {
    try {
      const clipboardItem = new ClipboardItem({
        'text/plain': new Blob([txt], { type: 'text/plain' }),
      })
      await navigator.clipboard.write([clipboardItem])
    } catch (error) {
      await navigator.clipboard.writeText(txt)
    }
    toast('Copied to clipboard', {
      icon: '🚀',
      style: toastStyles,
    })
  }

  const handleEdit = (id: number) => {
    confirm('Are you sure you want to delete this link?') &&
      deleteUrlMutation({
        variables: {
          id,
        },
        onCompleted: () => {
          refetch()
          toast('Link deleted successfully', { icon: '🗑️', style: toastStyles })
        },
        onError: (error) => {
          console.error(error)
          toast('Error deleting link', { icon: '❌', style: toastStyles })
        },
      })
  }

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
            <div className="flex items-center justify-center mt-20 flex-col">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-solid"></div>
              <p className="ml-4 mt-10">Loading...</p>
            </div>
          ) : (
            <ul className="flex flex-wrap">
              {data.userUrls.map((url: Url) => (
                <li
                  key={url.id}
                  className="p-4 mr-4 mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 rounded-md border-2 border-gray-800 relative overflow-hidden"
                >
                  <div className="flex items-center">
                    <Link to={`/l/${url.slug}`} reloadDocument>
                      <h2 className="text-lg font-semibold">{`/l/${url.slug}`}</h2>
                    </Link>
                    <Button
                      onClick={() =>
                        copyToClipboard(
                          `${window.location.origin}/l/${url.slug}`
                        )
                      }
                      type="button"
                      title="Copy"
                      className="text-gray-600 cursor-pointer border-none p-0"
                    >
                      <i className="bi bi-clipboard"></i>
                    </Button>
                  </div>
                  <p
                    title={url.url}
                    className="text-gray-600 py-1 overflow-hidden overflow-ellipsis whitespace-nowrap"
                  >
                    {url.url}
                  </p>
                  <p className='text-sm py-1 text-start'>
                    Visitas: <span className='font-semibold'>{url.visits}</span>
                  </p>
                  <Button
                    onClick={() => handleEdit(url.id)}
                    type="button"
                    title="Delete"
                    isLoading={deleteLoading}
                    className="absolute top-0 right-0 text-gray-600 cursor-pointer border-none"
                  >
                    <i className="bi bi-x-lg"></i>
                  </Button>
                </li>
              ))}
            </ul>
          )}
          {!loading && data.userUrls.length === 0 && (
            <div className="flex items-center justify-center mt-20 flex-col">
              <div>
                <p className="text-gray-600 ">You have no links yet</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default Dashboard

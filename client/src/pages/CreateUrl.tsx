import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import { nanoid } from 'nanoid'
import Alert from '../ui/Alert'
import { useMutation } from '@apollo/client'
import { createUrl } from '../api/graphql/mutations'
import { useAuthStore } from '../store/auth'

type UrlType = {
  url: string
  slug: string
}

const CreateUrl = () => {
  const [create, { loading, error }] = useMutation(createUrl)
  const profile = useAuthStore((state) => state.profile)
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    setValue,
    setError,
    formState: { errors },
  } = useForm<UrlType>()

  const generateSlug = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const random = nanoid(5)
    setValue('slug', random)
  }

  const onSubmit = async (values: UrlType) => {
    try {
      await create({
        variables: {
          url: values.url,
          slug: values.slug,
          AuthorId: profile?._id,
        },
      })

      navigate('/dashboard')
    } catch (err) {
      console.error(err)
      setError('slug', { type: 'manual', message: 'Slug already exists' })
    }
  }

  return (
    <form className="container mx-auto mt-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5">
        <label htmlFor="url" className="uppercase font-medium m-2 ">
          URL
          <span>
            <span className="text-red-500 px-1">*</span>
          </span>
        </label>
        <input
          placeholder="https://example.com"
          id="url"
          type="text"
          required
          className="mt-1 w-full rounded-md bg-lightDark px-4 py-2 text-white focus:border-none"
          {...register('url', {
            required: { value: true, message: 'URL is required' },
            minLength: {
              value: 5,
              message: 'URL should be at least 5 characters long',
            },
            pattern: {
              value: /^https?:\/\//i,
              message:
                'Please enter a valid URL. It should start with https://.',
            },
          })}
        />
        {errors.url && <Alert className="mt-5">{errors.url?.message}</Alert>}
      </div>
      <div className="mb-5">
        <label htmlFor="slug" className="uppercase font-medium m-2">
          Slug
        </label>
        <div className="mt-1 flex items-center justify-between">
          <input
            autoComplete="off"
            id="slug"
            className="mt-1 w-full rounded-md bg-lightDark px-4 py-2 text-white focus:border-none"
            placeholder="Custom slug"
            type="text"
            {...register('slug', {
              required: {
                value: true,
                message: 'Slug is required',
              },
              pattern: {
                value: /^[a-zA-Z0-9_-]+$/i,
                message:
                  'Please enter a valid slug without blank spaces or special characters.',
              },
            })}
          />
          <Button
            type="button"
            title="Random slug"
            className="ml-2 bg-lightDark"
            onClick={generateSlug}
          >
            <i className="bi bi-shuffle"></i>
          </Button>
        </div>
      </div>
      <div>
        <Button
          title="Create URL"
          isLoading={loading}
          type="submit"
          className="bg-dark "
          icon={<i className="bi bi-plus"></i>}
        >
          Create URL
        </Button>
      </div>
      {error && <Alert className="mt-5">{error.message}</Alert>}
    </form>
  )
}
export default CreateUrl

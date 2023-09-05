import { FC } from 'react'
import { Link } from 'react-router-dom'

const ErrorPage: FC = () => {
  return (
    <div className='min-h-screen bg-slate-900 font-roboto flex justify-center items-center flex-col gap-10'>
      <div className='text-white text-8xl'>404</div>
      <Link to='/' className='bg-sky-500 rounded-md px-6 py-2 hover:bg-sky-600'>Back</Link>
    </div>
  )
}

export default ErrorPage
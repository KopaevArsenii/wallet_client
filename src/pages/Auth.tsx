import { FC, useState } from "react"
import { toast } from "react-toastify";
import { AuthService } from "../services/auth.service";

const Auth: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const registrationHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      const data = await AuthService.registration({ email, password })
      if (data) {
        toast.success('Account has been created')
        setIsLogin((prev) => !prev)
      }
    } catch(e: any) {
      const error = e.response?.data.message
      toast.error(error.toString())
    }
  }

  const LoginHandler = () => {}
  
  return (
    <div className='mt-40 flex flex-col justify-center items-center bg-slate-900 text-white'>
      <h1 className='text-center text-xl mb-10'>{isLogin ? 'Login' : 'Registration'}</h1>
      <form onSubmit={isLogin ? LoginHandler : registrationHandler} className="flex w-1/3 flex-col mx-auto gap-5">
        <input onChange={(e) => setEmail(e.target.value)} className="input" placeholder="Email" type="text"></input>
        <input onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" type="password"></input>

        <button className="btn btn-green mx-auto">Submit</button>
      </form>  
      <div className="flex justify-center mt-5">
        {
          isLogin ? (
            <button onClick={() => setIsLogin((prevState) => !prevState)} className="text-slate-300 hover:text-white">You don't have an account?</button>
          ) : (
            <button onClick={() => setIsLogin((prevState) => !prevState)} className="text-slate-300 hover:text-white">Already have an account?</button>
          )
        }
      </div>
    </div>
  )
}

export default Auth
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

interface IForm {
    email: string,
    password: string
}

const Login: React.FC = () => {
    const [formData, setFormData] = useState<IForm>({
		email: "",
		password: ""
	})

  console.log(formData)

    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData(prevData => ({
			...prevData, [name]: value
		}))

	}

  console.log(handleChange)

  return (
    <div className="login bg-rose-50  rounded-lg m-4 border-2 shadow-xl flex flex-col items-center min">
              <button className="p-2 m-4 bg-pink-400">Talk right now</button>
              <h1 className='m-2 text-4xl p-2'>Login</h1>
              <button className="p-2 m-2" onClick={() => console.log("hello world")} >New user? register</button>
              <label htmlFor="email">
                <input className='p-2 m-2 border-2  rounded-lg' id="email" type="text" placeholder='email' name="email" />
              </label>
              <label htmlFor="password">
                <input className='p-2 m-2 border-2  rounded-lg' id="pssword" type="password" placeholder='passworld' name="password" />
              </label>

              <button onClick={() => { navigate("/dashboard") }} className="p-2 m-2">Login</button>

            </div>
  )
}

export default Login

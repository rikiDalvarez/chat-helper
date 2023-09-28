import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchLogin } from "../services";
import jwt_decode from "jwt-decode";
import socket from '../socketService';

interface IForm {
  email: string,
  password: string
}
interface DecodedToken {
  userId: string;
  nickName: string;
}


const Login: React.FC = () => {
  const [formData, setFormData] = useState<IForm>({
    email: "",
    password: ""
  })

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData, [name]: value
    }))

  }

  const navigateRegistration = () => {
    navigate("/register");
  };
  const navigateChat = () => {
    navigate("/chatroom");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetchLogin(formData);
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        const decodedToken: DecodedToken = jwt_decode(token);
        console.log(decodedToken)
        localStorage.setItem("token", token);
        localStorage.setItem("id", decodedToken.userId);
        console.log("Emitting 'login' event with data:", decodedToken);
        console.log(socket)
        //testing socket
        socket.emit("login", {
          userId: decodedToken.userId,
          nickName: decodedToken.nickName,
        });

        navigate("/api/dashboard", { state: true })
      } else {
        alert("Email and/or password incorrect");
        console.error("login failed");
      }
    } catch (error) {
      console.error("an error occurred:", error);
    }
  };

  return (
    <div className="login bg-rose-50  rounded-lg m-4 border-2 shadow-xl flex flex-col items-center min">
      <button onClick={navigateChat} className="p-2 m-4 bg-pink-400">Talk right now</button>
      <h1 className='m-2 text-4xl p-2'>Login</h1>
      <button className="p-2 m-2" onClick={navigateRegistration} >New user? register</button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          <input className='p-2 m-2 border-2  rounded-lg' id="email" type="text" placeholder='email' name="email" onChange={handleChange} />
        </label>
        <label htmlFor="password">
          <input className='p-2 m-2 border-2  rounded-lg' id="pssword" type="password" placeholder='passworld' name="password" onChange={handleChange} />
        </label>
        <br />
        <button type="submit" className="p-2 m-2">Login</button>
      </form>

    </div>
  )
}

export default Login

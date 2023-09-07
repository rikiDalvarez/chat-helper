import './App.css'
import { useState, useEffect } from "react";


function App() {
  const [name, setName] = useState();
  const url = 'https://superhero-search.p.rapidapi.com/api/heroes';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_REACT_APP_RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'superhero-search.p.rapidapi.com'
    }
  };

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setName(data[0].name);

        } else {
          console.error('Failed to fetch data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataFromAPI();

  }, [])



  return (
    <div className="app flex flex-col">
      <img src="/background.png" alt="" className="fullscreen-img" />
      <h1 className="absolute top-0 left-0 w-full h-full text-center text-white text-4xl flex items-center justify-center"> Hello {name}</h1>
      <div className="help-section flex flex-row">
        <div className="post-music bg-red-300">
          <div className="music">
            <h1>kiss me</h1>
          </div>
          <div className="post">
            <h1>Post on the internet</h1>
          </div>
        </div>
        <div className="login bg-indigo-400">
          <h1>Login or talk with us directly</h1>
          <button onClick={() => console.log("hello world")} >New user? register</button>
          <label htmlFor="email">
            <input type="text" placeholder='email' />
          </label>
          <label htmlFor="password">
            <input type="passworld" placeholder='passworld' />
          </label>
          <button>Login</button>
          <button>Talk</button>
        </div>
        <div className="painting-phrase bg-emerald-300">
          <img src="" alt="an image here" />
          <p>Everybody is different</p>
        </div>
      </div>
    </div>
  )
}

export default App

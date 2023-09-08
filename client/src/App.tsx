import './App.css'
import { useState, useEffect } from "react";


function App() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataFromAPI();
  }, [])




  return (
    <div className="app flex flex-col">

      {isLoading ? (
        <div className="loader flex justify-center items-center">
          <div className="animate-breathe h-16 w-16 bg-blue-300 rounded-full"></div>
        </div>
      ) : (
        <>
          <img src="/background.png" alt="" className="fullscreen-img mb-4 border-2  rounded-lg shadow-xl" />
          <h1
            className="absolute top-0 left-0 w-full mt-80 text-center text-white text-4xl flex items-center justify-center  "> Hello {name}</h1>
          <div className="help-section flex flex-row">
            <div className="post-music bg-lime-100  rounded-lg m-4 border-2 shadow-xl">
              <div className="music">
                <h1 className='m-2 text-4xl p-2'>kiss me</h1>
              </div>
              <div className="post border-2 p-4 m-4">
                <h3 className='m-2 text-4xl p-2'>Express yourself</h3>
                <textarea id="freeform" name="freeform" rows={5} cols={36}>
                  Enter text here...
                </textarea>
              </div>
            </div>
            <form className="login bg-rose-50  rounded-lg m-4 border-2 shadow-xl flex flex-col items-center">
              <h1 className='m-2 text-4xl p-2'>Login or talk with us directly</h1>
              <button className="p-2 m-2" onClick={() => console.log("hello world")} >New user? register</button>
              <label htmlFor="email">
                <input className='p-2 m-2 border-2  rounded-lg' id="email" type="text" placeholder='email' />
              </label>
              <label htmlFor="password">
                <input className='p-2 m-2 border-2  rounded-lg' id="pssword" type="password" placeholder='passworld' />
              </label>
              <div>
                <button className="p-2 m-2">Login</button>
                <button className="p-2 m-2">Talk</button>

              </div>

            </form>
            <div className="painting-phrase bg-lime-100  rounded-lg m-4 border-2 shadow-xl">
              <img src="" alt="an image here" />
              <p className='m-2 text-4xl p-2'>Everybody is different</p>
            </div>

          </div>
        </>
      )}

    </div>
  )
}

export default App

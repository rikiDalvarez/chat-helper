import './App.css'
import { useState, useEffect } from "react";


function App() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);



  return (
    <div className="app flex flex-col">

      {isLoading ? (
        <div className="loader flex justify-center items-center">
          <div className="animate-breathe h-16 w-16 bg-blue-300 rounded-full"></div>
        </div>
      ) : (
        <>
          <p> This chat is here to help and inspire, we want to support you thru whatever you are passing.</p>
          <img src="/background.png" alt="" className="fullscreen-img mb-4 border-2  rounded-lg shadow-xl" />
          <h1
            className="absolute top-0 left-0 w-full mt-80 text-center text-white text-4xl flex items-center justify-center  "> Hello Peter-Pan</h1>
          <div className="help-section flex flex-row">
            <div className="post-music bg-lime-100  rounded-lg m-4 border-2 shadow-xl">
              <div className="music flex flex-col mt-6 items-center">
                {/* TODO add personalization, user can change the music or set for his mood */}
                <audio controls className="rounded-lg"  >
                  <source src="/drdre-eminem.mp3" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
              <div className="post border-2 rounded-lg  shadow-xl p-4 m-4">
                {/* TODO add information when highlighted explain what it does */}
                <h3 className='m-2 text-4xl p-2'>Express yourself</h3>
                <textarea placeholder="enter text here..." id="freeform" name="freeform" rows={5} cols={36}>
                </textarea>
                {/* TODO create a post on our twitter */}
                {/* TODO create filtering and mpderation */}
                <button className="p-2 m-2">Post</button>
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

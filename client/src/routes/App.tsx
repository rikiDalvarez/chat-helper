
import React, { useState } from "react";
import Login from "../components/Login";
//import Dashboard from './Dashboard';


const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  console.log(setIsLoading)

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
          <h1 className="absolute top-0 left-0 w-full mt-80 text-center text-white text-4xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  "> Hello Peter-Pan</h1>
          <div className="help-section flex flex-row">
            <div className="post-music bg-lime-100  rounded-lg m-4 border-2 shadow-xl">
              <div className="music flex flex-col mt-6 items-center">
                {/* TODO add personalization, user can change the music or set for his mood */}
                {/* TODO on click of the div that contains audio brings the client to audio library with soothing and inspiring songs */}
                <audio controls className="rounded-lg"  >
                  <source src="/drdre-eminem.mp3" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
              <div className="post border-2 rounded-lg  shadow-xl p-4 m-4">
                {/* TODO add information when highlighted explain what it does */}
                <h3 className='m-2 text-4xl p-2'>Express yourself</h3>
                <label htmlFor="freeform">Enter Text:</label>
                <textarea placeholder="enter text here..." id="freeform" name="freeform" rows={5} cols={36}>
                </textarea>
                {/* TODO create a post on our twitter */}
                {/* TODO create filtering and mpderation */}
                <button className="p-2 m-2">Post</button>
              </div>
            </div>
            <Login />
            <div className="painting-phrase bg-lime-100 rounded-lg m-4 border-2 shadow-xl flex flex-col items-center justify-center">
              {/* TODO on click of img, takes client to a library of soothing and inspiring paintings */}
              <img src="/kandinsky.png" alt="an image here" className="mt-4 mr-8 ml-8 h-72 rounded-lg" />

              {/* TODO on click of phrase takes client to the book related (maybe only book quotes?)*/}
              <p className='m-2 p-2'>"Everybody is different"</p>
            </div>



          </div>
          <div className="footer flex flex-row justify-normal">
            <p className="m-5 ">about</p>
            <p className="m-5 ">donate</p>
            <p className="m-5 ">work with us</p>
          </div>
        </>
      )}

    </div>
  )
}

export default App

import './App.css'

function App() {

  return (
    <div className="app flex flex-col">
      <img src="/background.png" alt="" className="fullscreen-img" />
      <h1 className="absolute top-0 left-0 w-full h-full text-center text-white text-4xl flex items-center justify-center"> Hello Spider Man</h1>
      <div className="help-section flex flex-row">
        <div className="post-music">
          <div className="music">
            <h1>kiss me</h1>
          </div>
          <div className="post">
            <h1>Post on the internet</h1>
          </div>
        </div>
        <div className="login">
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
        <div className="painting-phrase">
          <img src="" alt="an image here" />
          <p>Everybody is different</p>
        </div>
      </div>
    </div>
  )
}

export default App

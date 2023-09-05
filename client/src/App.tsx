import './App.css'

function App() {

  return (
    <div className="app flex flex-col bg-cyan-300 border-red-500">
      <h1 className="text-3xl font-bold underline border-red-500 border-2">
        Hello world!
      </h1>
      <img src="/background.png" alt="" className="fullscreen-img" />
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
    </div >
  )
}

export default App

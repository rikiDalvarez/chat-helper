import React, { useState } from 'react'
import { CreateRoom } from '../components/CreateRoom';

const Dashboard: React.FC = () => {
	const [createRoom, setCreateRoom] = useState(false);

	const handleCreateRoom = () => {
		setCreateRoom((createRoom) => (!createRoom));
	}

	return (
		<div className="dashboard flex flex-row">
			<div className="left-col m-4 p-4 bg-green-200  ">
				<button onClick={handleCreateRoom}>Create chatroom</button>
				{createRoom ? <CreateRoom /> : null}
				<div className="chat-info"> Chat info</div>
			</div>
			<div className="main-col flex flex-col shadow-lg rounded-lg">
				<label htmlFor="filter">
					<input className='p-2 m-6 border-2  rounded-lg' id="filter" type="text" placeholder='search for a chatroom' />
				</label>
				<div className="chat-rooms flex flex-row">
					<div className="rooms m-4 w-64">
						<p>#Topic</p>
						<div className=" m-4">
							<img src="/kandinsky.png" alt="" />
						</div>
						<button>jOIN CHAT</button>
					</div>
					<div className="rooms m-4 w-64">
						<p>#Topic</p>
						<div className=" m-4">
							<img src="/kandinsky.png" alt="" />
						</div>
						<button>jOIN CHAT</button>
					</div>
					<div className="rooms m-4 w-64">
						<p>#Topic</p>
						<div className=" m-4">
							<img src="/kandinsky.png" alt="" />
						</div>
						<button>jOIN CHAT</button>
					</div>
				</div>
			</div>
		</div>
	)
}


export default Dashboard
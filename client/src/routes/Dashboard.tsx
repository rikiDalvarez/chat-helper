import React, { useEffect, useState } from 'react'
import { CreateRoom } from '../components/CreateRoom';
import { fetchUserList } from '../services';

interface IRoom {
	roomName: string;
	roomMembers: string[];
	roomMessages: string[];
}

const Dashboard: React.FC = () => {
	const [rooms, setRooms] = useState<IRoom[]>([])
	const [createRoom, setCreateRoom] = useState(false);

	const handleCreateRoom = () => {
		setCreateRoom((createRoom) => (!createRoom));
	}

	const getUserList = async () => {
		try {
			const token = localStorage.getItem("token");
			const response = await fetchUserList(token);
			if (response.ok) {
				const responseData = await response.json();
				console.log(responseData)
			} else {
				console.error("fetching games");
			}
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		getUserList()
	}
		, [])

	return (
		<div className="dashboard flex flex-row">
			<div className="left-col m-4 p-4 bg-green-200  ">
				<button onClick={handleCreateRoom}>Create chatroom</button>
				{createRoom ? <CreateRoom setCreateRoom={setCreateRoom} /> : null}
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

				</div>
			</div>
		</div>
	)
}


export default Dashboard
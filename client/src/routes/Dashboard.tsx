import React, { useEffect, useState } from 'react'
import { CreateRoom } from '../components/CreateRoom';
import { fetchUserList, fetchRooms } from '../services';
import { useNavigate } from 'react-router-dom';

interface IRoom {
	name: string;
	roomMembers: string[];
	roomMessages: string[];
}

const Dashboard: React.FC = () => {
	const [rooms, setRooms] = useState<IRoom[]>([])
	const [createRoom, setCreateRoom] = useState(false);
	const [filterText, setFilterText] = useState("");
	const [filteredRooms, setFilteredRooms] = useState<IRoom[]>(rooms);

	const navigate = useNavigate();

	const navigateToChatRoom = () => {
		navigate("/api/chatroom")
	}

	const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchText = event.target.value.toLowerCase();
		setFilterText(searchText);

		const filtered = rooms.filter((room) =>
			room.name.toLowerCase().includes(searchText)
		);
		setFilteredRooms(filtered);
	};

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
				return responseData
			} else {
				console.error("fetching games");
			}
		} catch (error) {
			console.error(error)
		}
	}
	console.log(getUserList)

	const getRoomList = async () => {
		try {
			const token = localStorage.getItem("token");
			const response = await fetchRooms(token);
			if (response.ok) {
				const responseData = await response.json();
				console.log(responseData)
				setRooms(responseData)
				return responseData
			} else {
				console.error("fetching games");
			}
		} catch (error) {
			console.error(error)
		}
	}

	//TODO add emit when add room to send back rooms state

	useEffect(() => {

		getRoomList();
	}
		, [])

	useEffect(() => {
		setFilteredRooms(rooms);
	}, [rooms]);

	return (
		<div className="dashboard flex flex-row">
			<div className="left-col m-4 p-4 bg-green-200  ">
				<button onClick={handleCreateRoom}>Create chatroom</button>
				{createRoom ? <CreateRoom setCreateRoom={setCreateRoom} /> : null}
				<div className="chat-info"> Chat info</div>
			</div>
			<div className="main-col flex flex-col shadow-lg rounded-lg">
				<label htmlFor="filter">
					<input className='p-2 m-6 border-2 rounded-lg' id="filter" type="text" placeholder='search by topic' value={filterText}
						onChange={handleFilterChange} />
				</label>
				<div className="chat-rooms flex flex-row flex-wrap justify-center">
					{filteredRooms.map((room, index) => (
						<div key={index} className="rooms m-4 w-64">
							<p>{`#${room.name}`}</p>
							<div className=" m-4">
								<img src="/kandinsky.png" alt="" />
							</div>
							<button onClick={navigateToChatRoom}>JOIN CHAT</button>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}


export default Dashboard
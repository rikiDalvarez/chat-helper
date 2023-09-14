import React from 'react'

const Dashboard: React.FC = ()=> {
	return (
		<div className="dashboard flex flex-row">
			<div className="left-col bg-green-200  ">
				<button>Create chatroom</button>
				<div className="chat-info"> Chat info</div>
			</div>
			<div className="main-col flex flex-col bg-orange-200">
				<label htmlFor="filter">
					<input className='p-2 m-2 border-2  rounded-lg' id="filter" type="text" placeholder='search for a chatroom' />
				</label>
				<div className="chat-rooms"> Chat rooms</div>
			</div>
		</div>
	)
}


export default Dashboard
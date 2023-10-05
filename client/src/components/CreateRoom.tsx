import React, { useState, Dispatch, SetStateAction } from 'react'
import { postRoom } from '../services'

interface createRoomProps {
	setCreateRoom: Dispatch<SetStateAction<boolean>>;
}
export const CreateRoom: React.FC<createRoomProps> = ({ setCreateRoom }) => {
	const [formData, setFormData] = useState<string>("")
	const token = localStorage.getItem("token");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormData(event.target.value)

	}
	// useEffect(() => {
	// 	console.log({ formData });
	// }, [formData]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			const id = localStorage.getItem("id");
			const data = { id, roomName: formData }
			const response = await postRoom(token, data)
			console.log("response:", response)
			setCreateRoom(false)

		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div>
			<section>
				<label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2" >
					room name
				</label>
				<input
					placeholder="Name"
					onChange={handleChange}
					className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
					type="text"
					id="name"
					value={formData ? formData : undefined}
				/>
				<button onClick={handleSubmit}> add</button>
			</section>
		</div>
	)
}

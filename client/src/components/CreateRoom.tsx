import React, { useState } from 'react'

interface IForm {
	name: string,
	tags: string[],
}

export const CreateRoom: React.FC = () => {
	const [formData, setFormData] = useState<IForm>({
		name: "",
		tags: [],
	})

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData(prevData => ({
			...prevData, [name]: value
		}))

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
					value={formData.name ? formData.name : undefined}
				/>
				<label htmlFor="tags" className="block text-gray-700 text-sm font-bold mb-2" >
					tags
				</label>
				<input
					placeholder="tags"
					onChange={handleChange}
					className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
					type="text"
					id="tags"
					value={formData.tags[formData.tags.length - 1] ? formData.tags[formData.tags.length - 1] : undefined}
				/>
				<button> add</button>
			</section>
		</div>
	)
}

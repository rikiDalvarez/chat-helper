

import React, { useState } from 'react';

const ChatComponent: React.FC = () => {
	const [messages, setMessages] = useState<string[]>([]);
	const [newMessage, setNewMessage] = useState<string>('');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewMessage(e.target.value);
	};

	const handleSendMessage = () => {
		if (newMessage.trim() === '') return;

		setMessages([...messages, newMessage]);
		setNewMessage('');
	};

	return (
		<div className="bg-gray-100 h-screen flex flex-col">
			<div className="flex-grow overflow-y-auto p-4">
				{messages.map((message, index) => (
					<div key={index} className="mb-2">
						<div className="bg-blue-600 text-white p-2 rounded-lg">{message}</div>
					</div>
				))}
			</div>
			<div className="p-4 bg-white">
				<div className="flex">
					<input
						type="text"
						value={newMessage}
						onChange={handleInputChange}
						placeholder="Type a message..."
						className="flex-grow border rounded-l-lg p-2"
					/>
					<button
						onClick={handleSendMessage}
						className=" p-2 rounded-r-lg focus:outline-none"
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChatComponent;

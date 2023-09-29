

export interface FormData {
	email: string;
	password: string;
}

export interface RegistrationData {
	name: string | null;
	email: string;
	password: string;
}
const PORT = 5000

export async function fetchLogin(data: FormData) {
	// const PORT = import.meta.env.VITE_PORT

	const response = await fetch(`http://localhost:${PORT}/api/user`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	return response
}

export const fetchRegistration = async (data: RegistrationData | null) => {
	const response = await fetch(`http://localhost:${PORT}/api/newUser`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	return response
}

export const postRoom = async (token: string | null, data: object) => {
	const response = await fetch(`http://localhost:${PORT}/api/newRoom`, {
		method: "PUT",
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(data)
	})
	return response;
}

export const fetchUserList = async (token: string | null) => {
	const response = await fetch(`http://localhost:${PORT}/api/users`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		}
	})
	return response
}

export const fetchGetWinner = async (token: string | null) => {
	const response = await fetch(`http://localhost:${PORT}/api/ranking/winner`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,

		}
	})
	return response
}

export const fetchGetLoser = async (token: string | null) => {
	const response = await fetch(`http://localhost:${PORT}/api/ranking/loser`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,

		}
	})
	return response
}


export const changeName = async (token: string | null, id: string | null | undefined, newName: string) => {

	const data = { name: newName }
	console.log(JSON.stringify(data))
	const response = await fetch(`http://localhost:${PORT}/api/players/${id}`, {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	return response
}

export const fetchPlayGame = async (token: string | null, id: string | null | undefined) => {
	const response = await fetch(`http://localhost:${PORT}/api/games/${id}`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		},

	})
	return response
}

export const fetchDeleteGames = async (token: string | null, player_id: string | null | undefined) => {
	const response = await fetch(`http://localhost:${PORT}/api/games/${player_id}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		}
	})
	return response
}

export const fetchGetRanking = async (token: string | null) => {
	const response = await fetch(`http://localhost:${PORT}/api/ranking/`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,

		}
	})
	return response
}
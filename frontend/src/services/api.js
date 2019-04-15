const requestOptions = {
	method: 'GET',
	headers: { 'Content-Type': 'application/json' }
};

export default {
	get(path) {
		return fetch(`http://localhost:3000/api/${path}`, requestOptions)
			.then(handleResponse)
			.then(function(data) {
					return data;
			});

	}
}

function handleResponse(response) {
	if (!response.ok) {
		return Promise.reject(response.statusText);
	}
	
	return response.json();
}
  
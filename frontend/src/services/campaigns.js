export default {
  list: () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
  
    return fetch('http://localhost:3000/campaigns', requestOptions)
      .then(handleResponse)
      .then(function(data) {
        return data;
      });
  },
  read: (campaignId) => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`http://localhost:3000/campaigns/${campaignId}`, requestOptions)
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

const baseUrl = process.env.REACT_APP_API_URL;

const fetchWithoutToken = async (endpoint, data, method = 'GET') => {
    const url = `${baseUrl}/${endpoint}`;
    try {
        if (method === 'GET') {
            return fetch(url);
        } else {
            return fetch(url, {
                method,
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        }
    } catch (error) {
        console.log(error);
    }
};
const fetchWithToken = async (endpoint, data, method = 'GET') => {
    const url = `${baseUrl}/${endpoint}`;
    const token = localStorage.getItem('token') || '';
    try {
        if (method === 'GET') {
            return fetch(url, {
                method,
                headers: {
                    'x-token': token,
                },
            });
        } else {
            return fetch(url, {
                method,
                headers: {
                    'Content-type': 'application/json',
                    'x-token': token,
                },
                body: JSON.stringify(data),
            });
        }
    } catch (error) {
        console.log(error);
    }
};


export { fetchWithToken, fetchWithoutToken };

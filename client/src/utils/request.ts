type Theaders = {
    'Content-Type'?: string,
    'Authorization'?: string
}

type TMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type optionsType = {
    headers: Theaders,
    method: TMethods,
    body?: string

}

const request = (url: string, method: TMethods, body?: object, authToken?: string) => {
    if (method === undefined) {
        method = 'GET'
    }

    let headers: Theaders = {};

    if (['POST', 'PUT', 'PATCH'].includes(method)) {
        headers['Content-Type'] = 'application/json';
    }

    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }

    let options: optionsType = {
        method,
        headers
    }

    if (body !== undefined) {
        options.body = JSON.stringify(body)
    }

    return fetch(`${url}`, options)
        .then(res => {
            if (!res.ok) {
                throw res.json();
            }
            return res.json();
        })
        .catch(err => {
            throw err;
        })

};

export default request;

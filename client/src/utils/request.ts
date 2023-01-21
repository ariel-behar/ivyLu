type Theaders = {
    'Content-Type'?: string,
    'Authorization'?: string
}

type optionsType = {
    headers: Theaders,
    method: string,
    body?: string

}

const request = (url: string, method: string, body?: object, authToken?: string) => {
    if (method === undefined) {
        method = 'Get'
    }

    let headers: Theaders = {};

    if (['post', 'put', 'patch'].includes(method.toLowerCase())) {
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

type headersType = {
    'Content-Type'?: string,
    'authToken'?: string
}

type optionsType = {
    headers: headersType,
    method: string,
    body?: string

}

const request = (url: string, method: string, body?: object, authToken?: string) => {
    if (method === undefined) {
        method = 'Get'
    }

    let headers: headersType = {};

    if (['post', 'put', 'patch'].includes(method.toLowerCase())) {
        headers['Content-Type'] = 'application/json';
    }

    if (authToken) {
        headers['authToken'] = authToken;
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

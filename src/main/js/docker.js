class Docker
{
    constructor(host)
    {
        this.host= host;
    }

    containers()
    {
        return this.request('GET', `${this.host}/containers/json`);
    }

    stats(id)
    {
        return this.request('GET', `${this.host}/containers/${id}/stats`, {
            stream: false,
        });
    }

    request(type, url, data)
    {
        return new Promise((resolve, reject) => {
            const xhr= new XMLHttpRequest();
            xhr.addEventListener('readystatechange', () => {
                switch(xhr.readyState)
                {
                    case 0: // UNSENT
                    case 1: // OPENED
                    case 2: // HEADERS_RECEIVED
                    case 3: // LOADING
                        return;
                    case 4: // DONE
                        if(xhr.status >= 200 && xhr.status < 300)
                        {
                            return resolve(JSON.parse(xhr.responseText));
                        }
                        else
                        {
                            return reject(JSON.parse(xhr.responseText));
                        }
                }
            });
            if(type === 'GET' && !!data)
            {
                const params= Object.keys(data).map((name) => {
                    const k= encodeURIComponent(name);
                    const v= encodeURIComponent(data[name]);
                    return `${k}=${v}`
                });
                url+= '?' + params.join('&');
            }
            xhr.open(type, url);
            switch(type.toUpperCase())
            {
                case 'POST':
                    xhr.send(JSON.stringify(data));
                    break;
                default:
                    xhr.send();
                    break;
            }
        });
    }
}

export default Docker;

import axios from 'axios';
import queryString from 'query-string';

export const client = function(){
    return axios.create({
        baseURL: `${import.meta.env.VITE_BASE_API_URL}`,
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('auth-token'),
        }
    });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
client.search = function(url: string, params: Object = {}, onSuccess = (r: any)=>{}){
    const serialized = serializeObject(params);
    client().get(`/${url}${serialized? '?' + serialized: ''}`).then(r => {
        onSuccess({
            data: r.data[url],
            pagination: r.data.pagination
        });
    }).catch(e => {
        console.log(e);
    });
}

export const serializeObject = function (obj: any, prefix:string = ''): string{
    const serialized = [];
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const nestedKey = prefix ? `${prefix}[${key}]` : key;
            if (typeof obj[key] === 'object') {
                serialized.push(serializeObject(obj[key], nestedKey));
            } else {
                if(obj[key]){
                    serialized.push(`${(nestedKey)}=${(obj[key])}`);
                }
            }
        }
    }
    return serialized.filter(s => !!s).join('&');
};

export default {
    client,
    serializeObject
}
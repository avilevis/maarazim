import {ItemDto} from "@/dto/item.dto";

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface Headers {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    mode: "no-cors" | "cors" | "same-origin"
    cache: "default" | " no-cache" | "reload" | "force-cache" | "only-if-cached"
    credentials: "include" | "same-origin" | "omit"
    headers: {
        "Content-Type": "application/json" | "application/x-www-form-urlencoded"
    }
    redirect: "manual" | "follow" | "error"
    referrerPolicy: "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url"
    body?: string
}

function generateHeaders(method, body?, headersUpdate?): Headers {
    const headers = {
        method: method, // *GET, POST, PUT, DELETE, etc.
        mode: "same-origin", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: headersUpdate ?? {},
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }

    return ({...headers, body}) as Headers
}

async function fetchApi(apiName: string, method: Method = 'GET', body?, headers?) {
    try {
        const response = await fetch(`http://localhost:3000/api/${apiName}`, generateHeaders(method, body, headers))
        if (!response.ok) {
            throw new Error('Something went wrong!')
        }
        if (response.headers?.get('Content-Type')?.includes('application/json'))
            return await response.json()

        return null
    } catch (err) {
        console.error(err)
        throw new Error(err)
    }
}

export function getList(headers: object) {
    return fetchApi('items', 'GET', null, {"Content-Type": "application/json", ...headers})
}

export function addItem(data: ItemDto) {
    return fetchApi('item', 'POST', JSON.stringify(data), {"Content-Type": "application/json"})
}

export function updateItem(data: ItemDto) {
    return fetchApi('item', 'PUT', JSON.stringify(data), {"Content-Type": "application/json"})
}

export function deleteItem(id: string) {
    return fetchApi('item', 'DELETE', JSON.stringify({id}), {"Content-Type": "application/json"})
}

export function imageUpload(image) {
    const body = new FormData();

    body.append("photo", image);

    return fetchApi('image', 'POST', body)
}
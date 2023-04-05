const apiMethods = {
    Get: 'GET',
    Post: 'POST',
    Delete: 'DELETE'
}

export function apiGet<T>(url: string) {
    return apiFetch<T>(url, apiMethods.Get)
}

export const apiPost = (url: string, body?: object | string) => {

}

export const apiDelete = (url: string) => {

}

const HTTP_NO_RESPONSE = new Error("No response")
const HTTP_FORBIDDEN = new Error("403 - Forbidden")

async function apiFetch<T>(url: string, apiMethod: string, body?: object | string) {
    const requestInit: RequestInit = buildRequest(apiMethod, body)

    const response = await fetch(url, requestInit)
    const data = await (response.json() as Promise<ResponseWithErrorInfo<T>>)
    return data!
}

const buildRequest = (apiMethod: string, body?: object | string): RequestInit => {
    const initOptions: RequestInit = {}
    initOptions.method = apiMethod
    const headers: Record<string, string> = {}
    if (body) {
        headers["Content-Type"] = "application/json"
    }

    const token = localStorage.getItem("jwtSessionToken")
    if (token) {
        headers["Authorization"] = `Bearer ${token}`
    }

    initOptions.headers = headers

    if (body) {
        initOptions.body = JSON.stringify(body)
    }

    return initOptions
}

function handlePotentialResponseErrors(resp: Response) {
    if (!resp)
        throw HTTP_NO_RESPONSE
    if (resp.ok)
        return resp
    if (resp.status === 403)
        throw HTTP_FORBIDDEN
    throw new Error(`${resp.status} - ${resp.statusText}`)
}

interface ResponseWithErrorInfo<T> {
    Data?: T,
    ErrorCode: number,
    Message: string
}
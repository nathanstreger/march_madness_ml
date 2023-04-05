const apiMethods = {
    Get: 'GET',
    Post: 'POST',
    Delete: 'DELETE'
}

export async function apiGet<T>(url: string) {
    return await apiFetch<T>(url, apiMethods.Get)
}

export async function apiPost<T>(url: string, body?: object | string) {
    return await apiFetch<T>(url, apiMethods.Post, body)
}

export async function apiDelete<T>(url: string) {
    return await apiFetch<T>(url, apiMethods.Delete)
}

async function apiFetch<T>(url: string, apiMethod: string, body?: object | string): Promise<T> {
    const requestInit: RequestInit = buildRequest(apiMethod, body)

    const response = await fetch(url, requestInit)
    const data = response.json()
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
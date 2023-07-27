import axios from "axios"

const baseURL =
    import.meta.env.VITE_BASE_URL

const enums = {
    get: "get",
    post: "post",
    patch: "patch",
    put: "put",
    delete: "delete"
}

export const useHttp = () => {
    const request = async (url, method, body = null) => {
        if (!enums[method]) {
            throw new Error('Axios have not provide method ' + method)
        }

        try {
            const res = await axios[method](baseURL + url, body, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
                }
            })

            if (res.status === 200 || res.status === 201) {
                return res
            }
        } catch (e) {

            return e
        }
    }

    return {
        request
    }
}


export let getDetails = async (path) => {
    try {
        const res = await axios.get(baseURL + path, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
                Accept: 'application/json'
            }
        })

        return res
    } catch (e) {
        console.log(e);
    }
}
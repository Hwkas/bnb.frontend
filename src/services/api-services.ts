// my functions
import { getAccessToken } from "@/lib/actions";


const apiServices = {
    get: async function (endpoint: string): Promise<any> {
        console.log("get: ", endpoint);

        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${endpoint}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            })
                .then(response => response.json())
                .then((json) => {
                    console.log("Response: ", json);
                    resolve(json);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },
    postWithOutToken: async function (endpoint: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${endpoint}`, {
                method: "POST",
                body: data,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            })
                .then(response => response.json())
                .then((json) => {
                    console.log("Response: ", json);
                    resolve(json);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },
    postWithToken: async function (endpoint: string, data: any): Promise<any> {
        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${endpoint}`, {
                method: "POST",
                body: data,
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
                .then(response => response.json())
                .then((json) => {
                    console.log("Response: ", json);
                    resolve(json);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    }

}

export default apiServices; 
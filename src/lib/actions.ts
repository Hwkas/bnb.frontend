"use server";

import { cookies } from "next/headers";

export async function handleLogin(
    userId: string,
    access_token: string,
    refresh_token: string,
) {
    cookies().set("session_user_id", userId, {
        httpOnly: true,
        secure: false, // TODO remove this line, should be true but due to current deploy resource need to set it to false
        // secure: process.env.NODE_ENV == "production",
        maxAge: 60 * 60 * 24 * 7, // one week
        path: "/",
    });

    cookies().set("session_access_token", access_token, {
        httpOnly: true,
        secure: false, // TODO remove this line, should be true but due to current deploy resource need to set it to false
        // secure: process.env.NODE_ENV == "production",
        maxAge: 60 * 60, // one hour
        path: "/",
    });

    cookies().set("session_refresh_token", refresh_token, {
        httpOnly: true,
        secure: false, // TODO remove this line, should be true but due to current deploy resource need to set it to false
        // secure: process.env.NODE_ENV == "production",
        maxAge: 60 * 60 * 24 * 7, // one hour
        path: "/",
    });
}

export async function handleRefresh() {
    console.log("handle Refresh");

    const refresh_token = await getRefreshToken();

    const token = await fetch(
        `http://${process.env.NEXT_PUBLIC_API_HOST}/api/accounts/token/refresh/`,
        {
            method: "POST",
            body: JSON.stringify({ refresh: refresh_token }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        },
    )
        .then((respose) => respose.json())
        .then((json) => {
            console.log("Respone Refresh: ", json);
            if (json.access) {
                cookies().set("session_access_token", json.access, {
                    httpOnly: true,
                    secure: false, // TODO remove this line, should be true but due to current deploy resource need to set it to false
                    // secure: process.env.NODE_ENV == "production",
                    maxAge: 60 * 60, // one hour
                    path: "/",
                });
                return json.access;
            } else {
                resetAuthCookies();
            }
        })
        .catch((error) => {
            console.log("error: ", error);
        });
    return token;
}

export async function resetAuthCookies() {
    cookies().set("session_user_id", "");
    cookies().set("session_access_token", "");
    cookies().set("session_refresh_token", "");
}

export async function getUserId() {
    const userId = cookies().get("session_user_id")?.value;
    return userId ? userId : null;
}

export async function getAccessToken() {
    let access_token = cookies().get("session_access_token")?.value;
    let refresh_token = cookies().get("session_refresh_token")?.value;

    if (!access_token) {
        if (!refresh_token) {
            return null;
        }
        access_token = await handleRefresh();
    }
    return access_token;
}

export async function getRefreshToken() {
    let refresh_token = cookies().get("session_refresh_token")?.value;
    return refresh_token;
}

const BASE_URL = "http://localhost:8080/api/v1/user";

export async function getCurrentUser(token) {
    const response = await fetch(BASE_URL, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    if (!response.ok) throw new Error("Error fetching user details");
    return await response.json();
}

export async function getUserById(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Error fetching user details");
    return await response.json();
}

export async function editUser(data, token) {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(data),
    });
    const text = await response.text();
    if (!response.ok) throw new Error(text);
    return text;
}
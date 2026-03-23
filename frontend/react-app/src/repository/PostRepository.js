const BASE_URL = "http://localhost:8080/api/v1/post";

export async function getAllPosts({ pageNumber, pageSize, location, sortBy, direction, category }) {
    const params = new URLSearchParams({ pageNumber, pageSize, location, sortBy, direction });
    if (category) params.append("category", category);
    const response = await fetch(`${BASE_URL}?${params.toString()}`, { method: "GET" });
    if (!response.ok) throw new Error("Error fetching posts");
    return await response.json();
}

export async function getPostById(id) {
    const response = await fetch(`${BASE_URL}/${id}`, { method: "GET" });
    if (!response.ok) throw new Error("Error fetching post details");
    return await response.json();
}

export async function getMyPosts({ pageNumber, pageSize, category }, token) {
    const params = new URLSearchParams({ pageNumber, pageSize });
    if (category) params.append("category", category);
    const response = await fetch(`${BASE_URL}/my?${params.toString()}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    if (!response.ok) throw new Error("Error fetching my posts");
    return await response.json();
}

export async function createPost(data, token) {
    const response = await fetch(`${BASE_URL}/create`, {
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

export async function editPost(id, data, token) {
    const response = await fetch(`${BASE_URL}/${id}`, {
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

export async function deletePost(id, token) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
    });
    if (!response.ok) throw new Error("Error deleting post");
}
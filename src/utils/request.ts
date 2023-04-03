export async function fetchReq() {
    const response = await fetch('http://localhost:3000/api/list')
    if (!response.ok) {
        throw new Error('Something went wrong!')
    }

    return await response.json()
}
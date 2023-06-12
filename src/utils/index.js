
export const checkIsAdmin = async (email) => {
    const token = localStorage.getItem("access-token");
    console.log({ token })

    const url = `https://modonovo-server.vercel.app/users/admin/${email}`

    const headers = {
        'Content-Type': 'application/json', // Replace with your desired content type
        'Authorization': `Bearer ${token}`, // Replace with your authorization token
    };

    const requestOptions = {
        method: 'GET', // Replace with the desired HTTP method (GET, POST, PUT, DELETE, etc.)
        headers: headers
    };

    const res = await fetch(url, requestOptions);
    const data = await res.json();
    console.log("admin", data);
    return data?.result?.admin;
}


export const checkIsInstructor = async (email) => {
    const token = localStorage.getItem("access-token");
    console.log({ token })

    const url = `https://modonovo-server.vercel.app/users/instructors/${email}`

    const headers = {
        'Content-Type': 'application/json', // Replace with your desired content type
        'Authorization': `Bearer ${token}`, // Replace with your authorization token
    };

    const requestOptions = {
        method: 'GET', // Replace with the desired HTTP method (GET, POST, PUT, DELETE, etc.)
        headers: headers
    };

    const res = await fetch(url, requestOptions);
    const data = await res.json();
    console.log("checkIsInstructor", data)
    return data.result.instructor;

}
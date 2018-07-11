
const BASE_URL = 'http://localhost:1337';

export default {

    get: (endpoint, callback) => {
        fetch(BASE_URL + endpoint)
            .then(data => data.json())
            .then(callback)
            .catch(console.log)
    },

    // post: (endpoint, data, callback) {
    //     const res = await fetch(host + 'auth/signup', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             name,
    //             email,
    //             password
    //         })
    //     }).res.json();
    // },

    post: (endpoint, data, callback) => {
        fetch(BASE_URL + endpoint, {
            method: 'POST', // or 'PUT'
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data), // data can be `string` or {object}!
        })
            .then(res => res.json())
            .then(callback)
            .catch(error => console.error('Error:', error));
        //   .then(response => console.log('Success:', response));

    },

    signup(data) {
        fetch('http://localhost:1337/users/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                return res.json()
            })
            .then(d => {
                console.log(d)
            })
    }
}

// export default {
//     get,
//     post
//     // post,
//     // update,
//     // remove
// }

let subscriptions = {
    'loginUser': [],
    'notification': []

};


export default {
    events: {
        loginUser: 'loginUser',
        notification: 'notification'
    },
    subscribe: (eventname, fn) =>
        subscriptions[eventname].push(fn),

    trigger: (eventname, data) =>
        subscriptions[eventname].forEach(fn => fn(data))
}
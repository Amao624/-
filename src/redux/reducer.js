const initState = {
    title: '',
    content: ''
}

export default function reducer(state = initState, action) {
    const {type, data} = action
    switch (type) {
        case "changeTitle":
            return data
        default:
            return state
    }
}
import * as actionTypes from "./actions";

const initialState = {
    user: {
        username: "",
        avatarUrl: "",
        apiKey: ""
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USER_INFO:
            return {
                user: action.value
            };
        default:
            return state;
    }
}

export default reducer;
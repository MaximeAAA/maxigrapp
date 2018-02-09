// Imports
import { API_URL, FB_APP_ID } from "../../constants";
import { AsyncStorage } from "react-native";
import { Facebook } from "expo";

// Actions
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const SET_USER = "SET_USER";
const SET_NOTIFICATIONS = "SET_NOTIFICATIONS";

// Action Creators
function setLogIn(token) {
    return {
        type: LOG_IN,
        token
    }
}

function logout() {
    return {
        type: LOG_OUT
    }
}

function setUser(user){
    return {
        type: SET_USER,
        user
    }
}

function setNotifications(notifications){
    return {
        type: SET_NOTIFICATIONS,
        notifications
    }
}

// API Action
function login(username, password) {
    return dispatch => {
        return fetch(`${API_URL}/rest-auth/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password    
            })
        })
        .then(response => response.json())
        .then(json => {
            if(json.user && json.token){
                dispatch(setLogIn(json.token));
                dispatch(setUser(json.user));
                return true;
            } else {
                return false;
            }
        });
    };
}
    
function facebookLogin() {
    return async dispatch => {
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(
            FB_APP_ID,
            {
                permissions: ["public_profile", "email"]
            }
        );
        console.log(type, token);

        if(type === "success"){
            return fetch(`${API_URL}/users/login/facebook/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body : JSON.stringify({
                    access_token: token
                })

            })
            .then(response => response.json())
            .then(json => {
                if(json.user && json.token){
                    dispatch(setLogIn(json.token));
                    dispatch(setUser(json.user));
                    return true;
                } else {
                    return false;
                }
            });
        }
    }
}

function getNotifications() {
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        fetch(`${API_URL}/notifications/`, {
            headers: {
                Authorization: `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(logout());
            } else {
                return response.json();
            }
        })
        .then(json => {
            dispatch(setNotifications(json));
        });
    }
}

function getOwnProfile() {
    return (dispatch, getState) => {
        const { user : { token, profile: { username } } } = getState();
        fetch(`${API_URL}/users/${username}/`, {
            headers: {
                Authorization: `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(logout());
            } else {
                return response.json();
            }
        })
        .then(json => {
            dispatch(setUser(json));
        });
    }
}

function getProfile(username) {
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${API_URL}/users/${username}/`, {
            headers: {
                Authorization: `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(logout());
            } else {
                return response.json();
            }
        })
        .then(json => json);
    }
}

function followUser(userId) {
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${API_URL}/users/${userId}/follow/`, {
            method: "POST",
            headers: {
                Authorization: `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(logout());
            } else if(response.ok){
                return true;
            } else if(!response.ok){
                return false;
            }
        });
    };
}

function unfollowUser(userId) {
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${API_URL}/users/${userId}/unfollow/`, {
            method: "POST",
            headers: {
                Authorization: `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(logout());
            } else if(response.ok){
                return true;
            } else if(!response.ok){
                return false;
            }
        });
    };
}

// Initial State, 유저가 처음 앱을 열었을때의 state, 디스크에 저장

const initialState = {
    isLoggedIn: false
}

// Reducer

function reducer(state = initialState, action){
    switch (action.type) {
        case LOG_IN:
            return applyLogIn(state, action);
        case LOG_OUT:
            return applyLogOut(state, action);
        case SET_USER:
            return applySetUser(state, action);
        case SET_NOTIFICATIONS:
            return applySetNotifications(state, action);
        default:
            return state;
    }
}

// Reducer functions
function applyLogIn(state, action){
    //console.log("applyLogIn");
    const { token } = action;
    return {
        ...state,
        isLoggedIn: true,
        token
    };
}

function applyLogOut(state, action){
    AsyncStorage.clear();
    return {
        ...state,
        isLoggedIn: false,
        token: ""
    };
}

function applySetUser(state, action){
    const { user } = action;
    return {
        ...state,
        profile: user
    };
}

function applySetNotifications(state, action){
    const { notifications } = action;
    return {
        ...state,
        notifications
    };
}

// Export
const actionCreators = {
    login,
    logout,
    facebookLogin,
    getNotifications,
    getOwnProfile,
    followUser,
    unfollowUser,
    getProfile
};

export { actionCreators };

// Default Reducer Export

export default reducer;
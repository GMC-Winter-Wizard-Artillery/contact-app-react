import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const AUTH_BASE_URL = 'http://localhost:1300/api/auth';

const STORAGE_TOKEN_KEY = 'token';
const STORAGE_USER_KEY = 'user';
const STORAGE_EXPIRES_AT_KEY = 'expiresAt';

const saveAuthToStorage = (token, user, expiresAt) => {

    window.localStorage.setItem(
        STORAGE_TOKEN_KEY,
        token
    )
    window.localStorage.setItem(
        STORAGE_USER_KEY,
        JSON.stringify(user)
    )
    window.localStorage.setItem(
        STORAGE_EXPIRES_AT_KEY,
        expiresAt
    )
};

const loadAuthFromStorage = () => {
    const token = window.localStorage.getItem(STORAGE_TOKEN_KEY);
    const user = JSON.parse(window.localStorage.getItem(STORAGE_USER_KEY));
    const expiresAt = window.localStorage.getItem(STORAGE_EXPIRES_AT_KEY);

    if (token && user && expiresAt) {
        return {
            token,
            user,
            expiresAt
        }
    }
    return null;
}

const initialState = {
    isInit: false,
    user: null,
    token: null,
    expiresAt: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        initAuth: (state) => {
            const auth = loadAuthFromStorage();
            if (auth) {
                state.user = auth.user;
                state.token = auth.token;
                state.expiresAt = auth.expiresAt;
            }
            state.isInit = true;
        },
        setAuth: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.expiresAt = action.payload.expiresAt;
            saveAuthToStorage(action.payload.token, action.payload.user, action.payload.expiresAt);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.expiresAt = null;
            window.localStorage.removeItem(STORAGE_TOKEN_KEY);
            window.localStorage.removeItem(STORAGE_USER_KEY);
            window.localStorage.removeItem(STORAGE_EXPIRES_AT_KEY);
        },
    },
});

export const { initAuth, setAuth, logout } = authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;

// thunk functions

export const signup = ({ name, lastName, email, password }) => async (dispatch) => {

    const res = await axios({
        method: 'POST',
        url: `${AUTH_BASE_URL}/register`,
        data: {
            name,
            lastName,
            email,
            password
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.status === 201) {
        const { session, user } = res.data.data;
        dispatch(setAuth({ token: session.token, user, expiresAt: session.expiresAt }));
    }
};

export const login = (email, password) => async (dispatch) => {

    const res = await axios({
        method: 'POST',
        url: `${AUTH_BASE_URL}/login`,
        data: {
            email,
            password
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.status === 200) {
        const { token, user } = res.data.data;
        dispatch(setAuth({ token: token.token, user, expiresAt: token.expiresAt }));
    }
};

export const signout = () => async (dispatch, getState) => {
    const state = getState();
    const token = state.auth.token;
    const res = await axios({
        method: 'POST',
        url: `${AUTH_BASE_URL}/logout`,
        headers: {
            'Content-Type': 'application/json',
            'x-session-token': token
        }
    });

    if (res) {
        dispatch(logout());
    }
};
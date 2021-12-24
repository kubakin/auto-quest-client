import { ActionInterface } from '../../__shared/types';
const USER = 'USER';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const UPDATE_TEAM = 'UPDATE_TEAM';
const USER_LOADED = 'USER_LOADED';
const USER_START_LOAD = 'USER_START_LOAD';

const me = (user):ActionInterface => {
    return {
        type: USER,
        payload: user
    }
}
const login = (token):ActionInterface => {
    return {
        type: LOGIN,
        payload: token
    }
}
const logout = (): ActionInterface => {
    return {
        type: LOGOUT
    }
}

const updateTeam = (team):ActionInterface => {
    return {
        type: UPDATE_TEAM,
        payload: team
    }
}

const userLoaded = ():ActionInterface=> {
    return {
        type: USER_LOADED
    }
};

const userStartLoad = ():ActionInterface=> {
    return {
        type: USER_START_LOAD
    }
};

export {
    me,
    USER,
    login,
    LOGIN,
    logout,
    LOGOUT,
    UPDATE_TEAM,
    updateTeam,
    USER_LOADED,
    userLoaded,
    USER_START_LOAD,
    userStartLoad
    
}

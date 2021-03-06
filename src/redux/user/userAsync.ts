import { getGameAsync } from './../game/gameAsync';
import API from '../../__shared/api';
import { login, me, updateTeam, userLoaded, userStartLoad } from './userActions';
import { AxiosResponse } from 'axios';
import { iTeam, iUser } from '../../__shared/types';
import server from '../../__shared/socket';
import { message } from 'antd';

export const meAsync = (): any => {
    return (dispatch: any) => {
        dispatch(userStartLoad());
        API.get('/auth/me').then((data: AxiosResponse<iUser>) => {
            dispatch(me(data.data));
            dispatch(getGameAsync());
            dispatch(userLoaded());
        }).catch(err => {
            dispatch(userLoaded());
        });
    };
};

export const meAsyncGlobal = (): any => {
    return (dispatch: any) => {
        dispatch(userStartLoad());
        API.get('/auth/me').then((data: AxiosResponse<iUser>) => {
            dispatch(me(data.data));
            dispatch(getGameAsync());
            dispatch(userLoaded());
            server.emit('next', data.data.team?.name)
        }).catch(err => {
            dispatch(userLoaded());
        });
    };
};

export const enterToTeamAsync = (name: string): any => {
    return (dispatch: any) => {
        API.post('/user/team/enter', {name:name.trim().toLowerCase()})
            .then((data:AxiosResponse<iUser>) => dispatch(me(data.data)));
    };
};


export const loginAsync = (loginData: any): any => {
    return async (dispatch: any) => {
        API.post('/auth/login', loginData)
            .then(data => {
                dispatch(login(data.data));
                dispatch(meAsync());
            })
    };
};

export const registerAsync = (registerData: any): any => {
    return async (dispatch: any) => {
        API.post('/auth/register', registerData)
            .then(data => {
                dispatch(login(data.data));
                dispatch(meAsync());
            })
    };
};

export const leaveTeamAsync = () => {
    return (dispatch: any) => {
        API.post('/user/team/leave')
            .then((data:AxiosResponse<iUser>) => {
                dispatch(me(data.data));
            });
    };
};

export const createTeamAsync = (name: string): any => {
    return (dispatch: any) => {
        API.post('/team', {name:name.trim().toLowerCase()})
            .then(data => {
                dispatch(me(data.data));
            });
    };
};

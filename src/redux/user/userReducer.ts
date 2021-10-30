import cookies from '../../__shared/cookie';
import { ActionInterface } from '../../__shared/types';
import { LOGIN, LOGOUT, UPDATE_TEAM, USER, USER_LOADED } from './userActions';
import { iUser } from '../../__shared/types';



interface iState {
    user: iUser | null;
    token: string;
    userLoaded: boolean;
}

const initState = {
    user: null,
    token: '',
    userLoaded: false,
};

const userReducer = (
    state: iState = initState,
    actions: ActionInterface
): iState => {
    switch (actions.type) {
        case USER:
            return {
                ...state,
                user: actions.payload,
            };

        case LOGIN:
            cookies.set('auth', actions.payload.token);
            return {
                ...state,
                token: actions.payload,
            };

        case USER_LOADED:
            return {
                ...state,
                userLoaded: true
            }

        case LOGOUT:
            cookies.remove('auth');
            return {
                ...state,
                token: '',
                user: null,
            };
        case UPDATE_TEAM:
            if (state.user) {
                return {
                    ...state,
                    user: {...state?.user, team: actions.payload},
                };
            }
            return {
                ...state
            };
        default:
            return {
                ...state,
            };
    }
};

export default userReducer;

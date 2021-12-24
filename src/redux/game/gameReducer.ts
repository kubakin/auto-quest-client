import { ActionInterface } from '../../__shared/types';
import { GAME, HELP, HIDE_MODAL, QUEST, SHOW_MODAL, TOP_TEAM, ADD_MSG } from './gameActions';
import { iTeam } from '../../__shared/types';
import { transformStatus } from '../../__shared/helpers';
import { StatusGame } from '../../__shared/enum';


export interface iGameData {
    start: Date,
    end: Date
    totalTasks: number,
    statusGame: StatusGame,
    mix: boolean
}

export interface iState {
    gameData: iGameData | null;
    quest: any;
    help: any;
    modal: boolean,
    textModal: string,
    topTeams: iTeam[],
    chat: { },
}

const initState: iState = {
    gameData: null,
    quest: {},
    help: {},
    modal: false,
    textModal: '',
    topTeams: [],
    chat: {}
};

const gameReducer = (state: iState = initState, actions: ActionInterface): iState => {
    switch (actions.type) {
        case GAME:
            return {
                ...state,
                gameData: {...actions.payload}
            };
        case QUEST:
            return {
                ...state,
                quest: actions.payload
            };
        case HELP:
            return {
                ...state,
                help: actions.payload
            };
        case SHOW_MODAL:
            return {
                ...state,
                modal: true,
                textModal: actions.payload
            };
        case HIDE_MODAL:
            return {
                ...state,
                modal: false,
                textModal: ''
            };

        case ADD_MSG:
                return {
                    ...state,
                     chat: {...state.chat, [actions.payload.team]: [...state.chat[actions.payload.team] || [], actions.payload.msg]}
                }

        case TOP_TEAM:
            console.log(actions.payload);
            const topTeams = actions.payload.map(team=>{
                return {
                    ...team,
                    status: transformStatus(team.status)
                }
            })
            return {
                ...state,
                topTeams
            };

        default:
            return {
                ...state
            };
    }
};

export default gameReducer;

import { ActionInterface } from './../types';
import { GAME, HELP, HIDE_MODAL, QUEST, SHOW_MODAL, TOP_TEAM } from './gameActions';
import { iTeam } from '../../__shared/types';
import { transformStatus } from '../../__shared/helpers';

interface TimeRane {
    start: Date,
    end: Date
}

export interface iState {
    range: TimeRane;
    quest: any;
    totalTasks: 0,
    help: any;
    modal: boolean,
    textModal: string,
    topTeams: iTeam[]
}

const initState: iState = {
    range: {
        start: new Date(),
        end: new Date()
    },
    quest: {},
    totalTasks: 0,
    help: {},
    modal: false,
    textModal: '',
    topTeams: [],
};

const gameReducer = (state: iState = initState, actions: ActionInterface): iState => {
    switch (actions.type) {
        case GAME:
            return {
                ...state,
                range: {start: actions.payload.game.start, end: actions.payload.game.end},
                totalTasks: actions.payload.totalTasks
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

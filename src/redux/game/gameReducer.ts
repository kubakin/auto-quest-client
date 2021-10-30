import { ActionInterface } from '../../__shared/types';
import { GAME, HELP, HIDE_MODAL, QUEST, SHOW_MODAL, TOP_TEAM, ADD_MSG } from './gameActions';
import { iTeam } from '../../__shared/types';
import { transformStatus } from '../../__shared/helpers';

interface TimeRange {
    start: Date,
    end: Date
}

export interface iState {
    range: TimeRange;
    quest: any;
    totalTasks: 0,
    help: any;
    modal: boolean,
    textModal: string,
    topTeams: iTeam[],
    chat: String[],
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
    chat: ['qwerty','qwerty','qwerty','qwerty','qwerty','qwerty','qwerty','qwerty','qwerty','qwerty','qwerty','qwerty','qwerty',
    ],
};

const gameReducer = (state: iState = initState, actions: ActionInterface): iState => {
    switch (actions.type) {
        case GAME:
            return {
                ...state,
                range: {start: actions.payload.start, end: actions.payload.end},
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

        case ADD_MSG:
            return {
                ...state,
                chat: [...state.chat, actions.payload]
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

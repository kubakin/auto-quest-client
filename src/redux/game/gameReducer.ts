import { ActionInterface } from './../types';
import { GAME, HELP, HIDE_MODAL, QUEST, SHOW_MODAL } from './gameActions';
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
}

const gameReducer = (state: iState = initState, actions: ActionInterface): iState => {
    switch (actions.type) {
        case GAME:
            return {
                ...state,
                range: {start: actions.payload.game.start, end: actions.payload.game.end},
                totalTasks: actions.payload.totalTasks
            }
        case QUEST:
            return {
                ...state,
                quest: actions.payload
            }
        case HELP:
            return {
                ...state,
                help: actions.payload
            }
        case SHOW_MODAL:
            return {
                ...state,
                modal: true,
                textModal: actions.payload
            }
        case HIDE_MODAL:
            return {
                ...state,
                modal: false,
                textModal: ''
            }
        default:
            return {
                ...state
            }
    }
}

export default gameReducer;
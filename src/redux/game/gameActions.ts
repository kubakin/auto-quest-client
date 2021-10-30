import { ActionInterface } from '../../__shared/types';

const GAME = 'GAME';
const QUEST = 'QUEST';
const HELP = 'HELP';
const SHOW_MODAL = 'SHOW_MODAL';
const HIDE_MODAL = 'HIDE_MODAL';
const TOP_TEAM = 'TOP_TEAM';
const ADD_MSG = 'ADD_MSG'

const getGame = (data:any):ActionInterface => {
    return {
        type: GAME,
        payload: data,
    }
}

const getQuest = (quest:any):ActionInterface => {
    return {
        type: QUEST,
        payload: quest
    }
}

const getHelp = (help:any):ActionInterface => {
    return {
        type: HELP,
        payload: help
    }
}

const showModal = (text:string):ActionInterface => {
    return {
        type: SHOW_MODAL,
        payload: text,
    }
}

const hideModal = ():ActionInterface => {
    return {
        type: HIDE_MODAL
    }
}

const getTopTeams = (teams):ActionInterface => {
    return {
        type: TOP_TEAM,
        payload: teams
    }
}

const addMsg = (msg):ActionInterface => {
    return {
        type: ADD_MSG,
        payload: msg
    }
}

export {
    GAME,
    getGame,
    QUEST,
    getQuest,
    HELP,
    getHelp,
    SHOW_MODAL,
    HIDE_MODAL,
    showModal,
    hideModal,
    TOP_TEAM,
    getTopTeams,
    addMsg,
    ADD_MSG
}

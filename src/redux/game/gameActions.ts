import { ActionInterface } from './../types';

const GAME = 'GAME';
const QUEST = 'QUEST';
const HELP = 'HELP';
const SHOW_MODAL = 'SHOW_MODAL';
const HIDE_MODAL = 'HIDE_MODAL';

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
    hideModal
}
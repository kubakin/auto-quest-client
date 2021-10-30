import { RootState } from "./../store";
import API from "../../__shared/api";
import { getGame, getHelp, getTopTeams, showModal } from './gameActions';
import { meAsyncGlobal } from '../user/userAsync';

export const getGameAsync = () => {
  return (dispatch: any) => {
    API.get("/game").then((data) => {
      dispatch(getGame(data.data));
    });
  };
};


export const toAnswerAsync = (answer: string) => {
  return (dispatch: any) => {
    return API.post("/task/answer", { answer }).then((data) => {
      dispatch(meAsyncGlobal());
    })
  };
};

export const getHelpAsync = () => {
  return async function (dispatch: any, getStore): Promise<RootState> {
    await API.get("/help").then((data) => {
      dispatch(getHelp(data.data));
      dispatch(showModal(data.data.text))
      dispatch(meAsyncGlobal());
    })
    const store = getStore();
    return store;
  };
};

export const getTopTeamAsync = () => {
  return (dispatch:any) => {
    return API.get('/team/top')
        .then(data=> {
          dispatch(getTopTeams(data.data));
        })
  }
}

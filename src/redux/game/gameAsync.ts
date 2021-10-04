import { RootState } from "./../store";
import moment from "moment";
import API from "../../__shared/api";
import { getGame, getHelp, getQuest, showModal } from "./gameActions";
import { iState } from "./gameReducer";
import { meAsync } from "../user/userAsync";
import { updateTeam } from "../user/userActions";

export const getGameAsync = () => {
  return (dispatch: any) => {
    API.get("/game").then((data) => {
      dispatch(getGame(data.data));
    });
  };
};

export const getCurrentTaskAsync = () => {
  return (dispatch: any) => {
    API.get("/team/task").then((data) => {
      console.log(data.data);
      dispatch(getQuest(data.data));
    }).catch((err)=>dispatch(showModal(err.response.data.message)));
  };
};

export const toAnswerAsync = (answer: string) => {
  return (dispatch: any) => {
    return API.post("/team/answer", { answer }).then((data) => {
      dispatch(getQuest(data.data.currentTask));
      dispatch(updateTeam(data.data.team));
    }).catch((err)=>dispatch(showModal(err.response.data.message)));
  };
};

export const getHelpAsync = () => {
  return async function (dispatch: any, getStore): Promise<RootState> {
    await API.get("/team/help").then((data) => {
      // console.log(data.data);

      dispatch(getHelp(data.data));
      dispatch(showModal(data.data.help.text))
      dispatch(meAsync());
      // dispatch(getQuest(data.data));
    }).catch((err)=>dispatch(showModal(err.response.data.message)));
    
    const store = getStore();
    return store;
  };
};

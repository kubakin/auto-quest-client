import cookies from "../../__shared/cookie";
import { ActionInterface } from "../types";
import { LOGIN, LOGOUT, UPDATE_TEAM, USER } from "./userActions";

const emptyUser = {
  email: "",
  id: -1,
  role: "",
  team: {
    helpstatus: 0,
    id: -1,
    name: "",
    next_answer: new Date(),
    progress: 0,
    status: "",
  },
  team_id: 0,
}

interface iUser {
  email: string;
  id: number;
  role: string;
  team: iTeam;
  team_id: number;
}

interface iTeam {
  helpstatus: number;
  id: number;
  name: string;
  next_answer: Date;
  progress: number;
  status: string;
}

interface iState {
  user: iUser;
  token: string;
}
const initState = {
  user: emptyUser,
  token: "",
};

const userReducer = (
  state: iState = initState,
  actions: ActionInterface
): iState => {
  switch (actions.type) {
    case USER:
      console.log("work");
      console.log(actions.payload);
      console.log(cookies.get("auth"));
      return {
        ...state,
        user: actions.payload,
      };

    case LOGIN:
      cookies.set("auth", actions.payload.token);
      return {
        ...state,
        token: actions.payload,
      };

    case LOGOUT:
      cookies.remove("auth");
      return {
        ...state,
        token: "",
        user: emptyUser,
      };
    case UPDATE_TEAM:
      return {
        ...state,
        user: { ...state.user, team: actions.payload },
      };
    default:
      return {
        ...state,
      };
  }
};

export default userReducer;

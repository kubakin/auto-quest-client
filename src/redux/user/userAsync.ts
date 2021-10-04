import { getGameAsync } from './../game/gameAsync';
import API from "../../__shared/api";
import { login, me } from "./userActions";

export const meAsync = (): any => {
  return (dispatch:any) => {
    API.get("/users/me").then((data) => {
      dispatch(me(data.data));
      dispatch(getGameAsync());
    });
  };
};

export const enterToTeamAsync = (name: string):any => {
  return (dispatch: any) => {
    API.post('/team/enter', {name})
    .then(data=>console.log(data.data))
  }
}

export const createTeam = (name:string):any => {
  return (dispatch:any)=> {
    API.post('/team', {name})
    .then(data=>console.log(data.data))
  }
}

export const loginAsync = (loginData:any): any=> {
  return (dispatch:any) => {
    API.post('/auth/login', loginData)
    .then(data=>{
      dispatch(login(data.data))
      dispatch(meAsync());
    })
  }
}

export const registerAsync = (registerData:any): any=> {
  return (dispatch:any) => {
    API.post('/auth/register', registerData)
    .then(data=>{
      console.log(data.data)
      dispatch(login(data.data))
      dispatch(meAsync());
    })
  }
}

export const createTeamAsync = (name:any): any=> {
  return (dispatch:any) => {
    API.post('/team', {name})
    .then(data=> {
      console.log(data.data)
    })
  }
}
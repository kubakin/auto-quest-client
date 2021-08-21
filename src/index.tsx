import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import 'antd/dist/antd.css';
import "moment/locale/ru";
import AuthContext from "./context";
import { ModalTypeEnum } from "./types/enums";
const Main = () => {
  const [modalType, setModalType] = useState<ModalTypeEnum>(ModalTypeEnum.none);
  return (
    <React.StrictMode>
      <AuthContext.Provider value={{modalType, setModalType}}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </AuthContext.Provider>
    </React.StrictMode>
  )
}
ReactDOM.render(
  <Main />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
import React, { FC, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import AlertModal from "./components/alertModal";
import LoginModal from "./components/loginModal";
import RegisterModal from "./components/registerModal";
import AuthContext, { IAuthContext } from "./context";
import AdminPage from "./pages/AdminPage";
import AuthPage from "./pages/AuthPage";
import BriefingPage from "./pages/BriefingPage/briefingPage";
import QuestionPage from "./pages/QuestionPage/questionPage";
import TeamPage from "./pages/TeamPage/teamPage";
import { hideModal } from "./redux/game/gameActions";
import { meAsync } from "./redux/user/userAsync";
import { ModalTypeEnum } from "./types/enums";
import API from "./__shared/api";
import { useTypedSelector } from "./__shared/hooks";

const App: FC = () => {
  const dispatch = useDispatch();
  const value: IAuthContext = useContext(AuthContext);
  const history = useHistory();
  const {
    user: { user, token },
    game: { modal, textModal },
  } = useTypedSelector((state) => state);

  useEffect(() => {
    dispatch(meAsync());
  }, [dispatch, token]);

  useEffect(() => {
    // if(!user || history.location.pathname === '/') {
    //   history.push('/auth');
    // }
    // if((user && history.location.pathname === '/auth')) {
    //   history.push('/team');
    // }
  }, [history, user]);

  return (
    <>
      <Switch>
        <Route path="/auth" component={AuthPage} />
        <Route path="/team" component={TeamPage} />
        <Route path="/briefing" component={BriefingPage} />
        <Route path="/quest" component={QuestionPage} />
        <Route path="/admin" component={AdminPage} />
      </Switch>
      <RegisterModal
        handleClose={() => value.setModalType(ModalTypeEnum.none)}
        show={value.modalType === ModalTypeEnum.signUp}
      />
      <LoginModal
        handleClose={() => value.setModalType(ModalTypeEnum.none)}
        show={value.modalType === ModalTypeEnum.signIn}
      />
      <AlertModal
        clickHandler={() => dispatch(hideModal())}
        visible={modal}
        text={textModal}
      />
    </>
  );
};
export default App;

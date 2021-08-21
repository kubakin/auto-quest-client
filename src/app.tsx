import React, {FC, useContext} from "react";
import { Route, Switch } from "react-router-dom";
import LoginModal from "./components/loginModal";
import RegisterModal from "./components/registerModal";
import AuthContext, { IAuthContext } from "./context";
import AuthPage from "./pages/AuthPage";
import BriefingPage from "./pages/BriefingPage/briefingPage";
import { ModalTypeEnum } from "./types/enums";
const App: FC = () => {
    const value:IAuthContext = useContext(AuthContext);
    return (
        <>
            <Switch>
                <Route path='/auth' component={AuthPage}/>
                <Route path='/briefing' component={BriefingPage}/>
            </Switch>
            <RegisterModal handleClose={()=>value.setModalType(ModalTypeEnum.none)} show={value.modalType === ModalTypeEnum.signUp}/>
            <LoginModal handleClose={()=>value.setModalType(ModalTypeEnum.none)} show={value.modalType === ModalTypeEnum.signIn}/>
        </>
    )
}
export default App;
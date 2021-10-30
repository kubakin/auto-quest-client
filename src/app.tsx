import React, { FC, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import AlertModal from './components/alertModal';
import LoginModal from './components/loginModal';
import RegisterModal from './components/registerModal';
import AuthContext, { IAuthContext } from './context';
import AdminPage from './pages/AdminPage';
import AuthPage from './pages/AuthPage';
import BriefingPage from './pages/BriefingPage/briefingPage';
import QuestionPage from './pages/QuestionPage/questionPage';
import TeamPage from './pages/TeamPage/teamPage';
import { addMsg, hideModal } from './redux/game/gameActions';
import { meAsync } from './redux/user/userAsync';
import { ModalTypeEnum } from './types/enums';
import { useTypedSelector } from './__shared/hooks';
import { Spin } from 'antd';
import FinishPage from './pages/FinishPage';
import server from './__shared/socket';
import Chat from './components/chat';
const App: FC = () => {
    const dispatch = useDispatch();
    const value: IAuthContext = useContext(AuthContext);
    const history = useHistory();
    const {
        user: {user, token, userLoaded},
        game: {modal, textModal},
    } = useTypedSelector((state) => state);

    useEffect(() => {
        if (user?.team?.name) {
            console.log('socket listener is started');
            server.emit('join', user?.team?.name);
            server.on('next', (e) => {
                dispatch(meAsync());
            });
            server.on('chat', (msg)=> {
                dispatch(addMsg(msg));
            })
        }
    }, [user?.team?.name]);

    useEffect(() => {
        dispatch(meAsync());
    }, [dispatch, token]);

    useEffect(() => {
        if (userLoaded) {
            if (!user || history.location.pathname === '/') {
                history.push('/auth');
            }
            if ((user && history.location.pathname === '/auth')) {
                history.push('/team');
            }
        }
    }, [history, user, userLoaded]);
    const sock = () => {
        server.emit('next', user?.team?.name);
    };
    return userLoaded ? (
        <>
            {/*<button onClick={sock}>qwe</button>*/}
            <Switch>
                <Route path="/auth" component={AuthPage}/>
                <Route path="/team" component={TeamPage}/>
                <Route path="/briefing" component={BriefingPage}/>
                <Route path="/quest" component={QuestionPage}/>
                <Route path="/admin" component={AdminPage}/>
                <Route path="/finish" component={FinishPage}/>
            </Switch>
            <RegisterModal
                handleClose={() => value.setModalType(ModalTypeEnum.none)}
                show={value.modalType === ModalTypeEnum.signUp}
            />
            <LoginModal
                handleClose={() => value.setModalType(ModalTypeEnum.none)}
                show={value.modalType === ModalTypeEnum.signIn}
            />
            <Chat
                handleClose={() => value.setModalType(ModalTypeEnum.none)}
                show={value.modalType === ModalTypeEnum.chat}
            />
            <AlertModal
                clickHandler={() => dispatch(hideModal())}
                visible={modal}
                text={textModal}
            />
        </>
    ) : <div className="spinner-page"><Spin tip="Loading..."/></div>;
};
export default App;

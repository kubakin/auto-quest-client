import React, { FC, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginModal from './components/loginModal';
import RegisterModal from './components/registerModal';
import AuthContext, { IAuthContext } from './context';
import { addMsg, hideModal } from './redux/game/gameActions';
import { meAsync } from './redux/user/userAsync';
import { ModalTypeEnum } from './types/enums';
import { useTypedSelector } from './__shared/hooks';
import server from './__shared/socket';
import Chat from './components/chat';
import WithLoader from './components/withLoader';
import MainDataProvider from './MainDataProvider';
import AuthPage from './pages/AuthPage';
import AlertModal from './components/alertModal';
import { Spin } from 'antd';

const App: FC = () => {
    const dispatch = useDispatch();
    const value: IAuthContext = useContext(AuthContext);
    const {
        user: {user, token, userLoaded},
        game: { gameData, modal, textModal },
    } = useTypedSelector((state) => state);

    useEffect(() => {
        dispatch(meAsync());
    }, [dispatch, token]);

    return (
        <>
            <Switch>
                {gameData && user && <MainDataProvider user={user} gameData={gameData}/>}
                <Route path={'/'} component={AuthPage}></Route>
            </Switch>
            <RegisterModal
                handleClose={() => value.setModalType(ModalTypeEnum.none)}
                show={value.modalType === ModalTypeEnum.signUp && !user}
            />
            <LoginModal
                handleClose={() => value.setModalType(ModalTypeEnum.none)}
                show={value.modalType === ModalTypeEnum.signIn && !user}
            />
            <AlertModal
                clickHandler={() => dispatch(hideModal())}
                visible={modal}
                text={textModal}
            />
            <Chat
                handleClose={() => value.setModalType(ModalTypeEnum.none)}
                show={value.modalType === ModalTypeEnum.chat}
                team={user?.team || null}
            />
        </>
    );
};
export default App;

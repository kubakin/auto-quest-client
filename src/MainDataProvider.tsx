import React, { FC, useEffect } from 'react';
import RoutesList from './components/routesList';
import { Switch } from 'react-router-dom';
import { iGameData } from './redux/game/gameReducer';
import { iUser } from './__shared/types';
import server from './__shared/socket';
import { meAsync } from './redux/user/userAsync';
import { addMsg } from './redux/game/gameActions';
import { useDispatch } from 'react-redux';

const MainDataProvider:FC<{gameData: iGameData, user: iUser}> = ({gameData, user}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (user?.team?.name) {
            console.log('socket listener is started');
            server.emit('join', user?.team?.name);
            server.on('next', (e) => {
                dispatch(meAsync());
            });
            server.on('chat', (data) => {
                dispatch(addMsg(data));
            });
        }
    }, [user?.team?.name]);

    return (
            <RoutesList gameData={gameData} user={user}/>
    )
}
export default MainDataProvider;

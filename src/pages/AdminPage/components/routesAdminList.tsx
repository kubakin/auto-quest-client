import ProtectedRoute from '../../../components/protectedRoutes';
import TaskPage from '../adminPages/TaskPage';
import TaskInfo from '../adminPages/TaskInfo';
import TeamPage from '../adminPages/TeamPage';
import GamePage from '../adminPages/GamePage';
import React, { FC } from 'react';
import { iUser, Role } from '../../../__shared/types';
import { iGameData } from '../../../redux/game/gameReducer';

const RoutesAdminList: FC<{ user: iUser, match: any, game: iGameData }> = ({user, match, game}) => {
    const routesList = [
        {
            path: match.path + '/tasks',
            component: TaskPage,
        },
        {
            path: match.path + '/tasks/:id',
            component: TaskInfo,
        },
        {
            path: match.path + '/team',
            component: TeamPage,
        },
        {
            path: match.path + '/game',
            component: GamePage,
        }
    ];
    return (
        <>
            {
                routesList.map(route => {
                    return <ProtectedRoute exact key={route.path} gameData={game} {...route}
                                           condition={user.role === Role.Admin ? user : null}/>;
                })
            }
        </>);
};

export default RoutesAdminList;

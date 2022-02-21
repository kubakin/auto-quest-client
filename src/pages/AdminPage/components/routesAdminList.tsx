import ProtectedRoute from '../../../components/protectedRoutes';
import TaskPage from '../adminPages/TaskPage';
import TaskInfo from '../adminPages/TaskInfo';
import TeamPage from '../adminPages/TeamPage';
import GamePage from '../adminPages/GamePage';
import React, { FC } from 'react';
import { iUser, Role } from '../../../__shared/types';
import { iGameData } from '../../../redux/game/gameReducer';
import TeamInfo from '../adminPages/TeamInfo';
import UserPage from '../adminPages/UserPage';
import UserInfo from '../adminPages/UserInfo';

export const baseAdminPath = '/admin';

const RoutesAdminList: FC<{ user: iUser, match: any, game: iGameData }> = ({user, match, game}) => {



    const routesList = [
        {
            path: baseAdminPath + '/tasks',
            component: TaskPage,
        },
        {
            path: baseAdminPath + '/tasks/:id',
            component: TaskInfo,
        },
        {
            path: baseAdminPath + '/team',
            component: TeamPage,
        },
        {
            path: baseAdminPath + '/team/:id',
            component: TeamInfo,
        },
        {
            path: baseAdminPath + '/user/:id',
            component: UserInfo,
        },
        {
            path: baseAdminPath + '/game',
            component: GamePage,
        },
        {
            path: baseAdminPath + '/users',
            component: UserPage,
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

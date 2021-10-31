import React, { FC } from 'react';
import TeamPage from '../pages/TeamPage/teamPage';
import AuthPage from '../pages/AuthPage';
import BriefingPage from '../pages/BriefingPage/briefingPage';
import QuestionPage from '../pages/QuestionPage/questionPage';
import AdminPage from '../pages/AdminPage';
import FinishPage from '../pages/FinishPage';
import ProtectedRoute from './protectedRoutes';
import { iUser, Role, Status } from '../__shared/types';
import { iGameData } from '../redux/game/gameReducer';

const RoutesList:FC<{user: iUser | null, gameData: iGameData}> = ({user, gameData}) => {
    const routesList = [

        {
            path: '/briefing',
            component: BriefingPage,
            condition: user?.team,
        },
        {
            path: '/quest',
            component: QuestionPage,
            condition: user?.team && user.team.status === Status.ACTIVATED ? user : null
        },
        {
            path: '/admin',
            component: AdminPage,
            condition: user?.role === Role.Admin ? user : null,
        },
        {
            path: '/finish',
            component: FinishPage,
            condition: user?.team?.status === Status.FINISHED
        },
        {
            path: '/',
            component: TeamPage,
            condition: user,
        },

    ];
    return (
        <>
            {
                routesList.map(route=> {
                    return (
                        <ProtectedRoute gameData={gameData} key={route.path} {...route}/>
                    )
                })
            }
            </>
    );
};

export default RoutesList;

import React, { FC } from 'react';
import TeamPage from '../pages/TeamPage/teamPage';
import BriefingPage from '../pages/BriefingPage/briefingPage';
import QuestionPage from '../pages/QuestionPage/questionPage';
import AdminPage from '../pages/AdminPage';
import FinishPage from '../pages/FinishPage';
import ProtectedRoute from './protectedRoutes';
import { iUser, Role, Status } from '../__shared/types';
import { iGameData } from '../redux/game/gameReducer';
import InstructionPage from '../pages/InstructionPage';
import { StatusGame } from '../__shared/enum';

const RoutesList:FC<{user: iUser | null, gameData: iGameData}> = ({user, gameData}) => {
    const routesList = [

        {
            path: '/briefing',
            component: BriefingPage,
            condition: user?.team,
        },
        {
            path: '/quest',
            component: user?.team && user.team.status === Status.ACTIVATED ? QuestionPage : FinishPage,
            condition: user?.team && user.team.status !== Status.NOT_ACTIVATED ? user : null
        },
        {
            path: '/admin/:path',
            component: AdminPage,
            condition: user?.role === Role.Admin ? user : null,
            exact: false
        },
        {
            path: '/finish',
            component: FinishPage,
            condition: user?.team?.status === Status.FINISHED || gameData.statusGame === StatusGame.FINISHED
        },
        {
            path: '/',
            component: TeamPage,
            condition: user,
        },
        {
            path: '/instruction',
            component: InstructionPage,
            condition: user?.team?.status === Status.ACTIVATED
        }

    ];
    return (
        <>
            {
                routesList.map(route=> {
                    return (
                        <ProtectedRoute exact gameData={gameData} key={route.path} {...route}/>
                    )
                })
            }
            </>
    );
};

export default RoutesList;

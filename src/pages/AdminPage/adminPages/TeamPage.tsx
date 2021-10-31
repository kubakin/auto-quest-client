import React, { FC, useEffect, useState } from 'react';
import API from '../../../__shared/api';
import { iTeam } from '../../../__shared/types';
import styles from './index.module.scss';
import { Button, Col, List, Row } from 'antd';
import Chat from '../../../components/chat';

const TeamPage = () => {
    const [teams, setTeams] = useState<iTeam[]>([]);
    const [team, setTeam] = useState<iTeam>();
    const [chat, setChat] = useState(false);
    const updateData = (id: number, data: iTeam) => {
        const index = teams.findIndex((item) => item.id === id);
        setTeams((prev) => {
            return [
                ...prev.slice(0, index),
                data,
                ...prev.slice(index + 1, prev.length)
            ];
        });
    };
    const activateTeam = (id) => {
        API.post(`/team/activate/${id}`)
            .then(data => {
                updateData(id, data.data);
            });
    };
    const teamClickHandler = (item) => {
        setTeam(item);
        setChat(true);
    };
    useEffect(() => {
        API.get('/team').then((data) => {
            setTeams(data.data);
        });
    }, []);
    return (
        <>
            <List
                size="small"
                className={'width100'}
                header={<div><h1>Команды</h1></div>}
                itemLayout={'horizontal'}
                bordered
                dataSource={teams}
                renderItem={team => <List.Item className={'borderBottomGray'}><TeamRow chatHandler={(team) => teamClickHandler(team)} team={team}
                                                        actionHandler={(id) => activateTeam(id)}/></List.Item>}
            />
            {/*<div className={styles.TeamPage}>*/}
            {/*    {teams.length > 0 ? (*/}
            {/*        teams.map((item) => {*/}
            {/*            return <div onClick={() => teamClickHandler(item)} className={styles.teamRow}>*/}
            {/*                <div>{item.name}</div>*/}
            {/*                <div>{item.status}</div>*/}
            {/*                <Button onClick={() => activateTeam(item.id)}>Activate</Button>*/}
            {/*            </div>;*/}
            {/*        })*/}
            {/*    ) : (*/}
            {/*        <></>*/}
            {/*    )}*/}

            {/*</div>*/}
            <Chat show={chat} handleClose={() => setChat(!chat)} team={team || null}/>
        </>
    );
};
export default TeamPage;


const TeamRow: FC<{
    team: iTeam,
    actionHandler: (id: number) => void,
    chatHandler: (team: iTeam) => void
}> = ({team, actionHandler, chatHandler}) => {
    const clickChatHandler = (e, team) => {
        e.preventDefault();
        chatHandler(team);
    };
    return (
        <Row className={'width100'}>
            <Col span={6}>{team.name} </Col>
            <Col span={6}><a href="" onClick={(e) => clickChatHandler(e, team)}>Начать чат</a></Col>
            <Col span={6}>{team.status}</Col>
            <Col span={6}><Button onClick={() => actionHandler(team.id)}>Activate</Button></Col>
        </Row>
    );
};

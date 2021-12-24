import { Row } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EnterTeam from './components/enterToTeam';
import styles from './index.module.scss';
import Modal from '../../components/modal';
import { useDispatch } from 'react-redux';
import { createTeamAsync, enterToTeamAsync, leaveTeamAsync, meAsync } from '../../redux/user/userAsync';
import { useTypedSelector } from '../../__shared/hooks';
import plus from './media/plus.png';
import TeamBlock from './components/teamBlock';
import { Status } from '../../__shared/types';
import { StatusGame } from '../../__shared/enum';
import { iGameData } from '../../redux/game/gameReducer';

const TeamPage: FC<{game: iGameData}> = ({game}) => {
    console.log(game);
    const [enterModal, setEnterModal] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const user = useTypedSelector((state) => state.user);
    const enterToTeam = () => {
        dispatch(enterToTeamAsync(name));
        setEnterModal(false);
    };
    const createTeam = () => {
        dispatch(createTeamAsync(name));
        setCreateModal(false);
    };
    useEffect(()=>{
        const tick = setInterval(()=> {
            console.log('tick');
            dispatch(meAsync());
        }, 3000)
        if (user.user?.team?.status === Status.ACTIVATED) {
            clearInterval(tick);
        }
            return function cleanup() {
                clearInterval(tick);
        }
    }, [user])
    return (
        <>
            <div className={styles.teamPage}>
                {!user.user?.team ? <div className={styles.buttonGroup}>
                    <Row
                        onClick={() => setEnterModal(true)}
                        className={styles.enterBlock}
                        align="middle"
                    >
                        <img alt="plus" src={plus}/>
                        <p>Вступить в команду</p>
                    </Row>
                    <Row
                        onClick={() => setCreateModal(true)}
                        className={styles.enterBlock}
                        align="middle"
                    >
                        <img alt="plus" src={plus}/>
                        <p>Создать команду</p>
                    </Row>
                    {game.statusGame === StatusGame.TEST && <button onClick={()=>dispatch(meAsync())}>TEST</button>}
                </div> : <TeamBlock leaveTeam={() => dispatch(leaveTeamAsync())} team={user.user?.team}/>}

                {/*{user.user?.team?.status === Status.NOT_ACTIVATED && <Row className={styles.activationWait}>*/}
                {/*    <p>Дождитесь активации команды</p>*/}
                {/*</Row>}*/}
                {<Row className={styles.briefingLink}>
                    <Link to="/briefing">Перейти к брифингу</Link>
                </Row>}
                {/*{user.user?.team?.status === Status.ACTIVATED && <Row className={styles.briefingLink}>*/}
                {/*    <Link to="/briefing">Перейти к брифингу</Link>*/}
                {/*</Row>}*/}
            </div>
            <Modal
                title="Вступить"
                visible={enterModal}
                handleOk={() => enterToTeam()}
                handleClose={() => setEnterModal(false)}
            >
                <EnterTeam value={name} changeHandler={(name) => setName(name)}/>
            </Modal>
            <Modal
                title="Создать"
                visible={createModal}
                handleOk={() => createTeam()}
                handleClose={() => setCreateModal(false)}
            >
                <EnterTeam value={name} changeHandler={(name) => setName(name)}/>
            </Modal>
        </>
    );
};
export default TeamPage;

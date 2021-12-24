import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { useDispatch } from 'react-redux';
import { getTopTeamAsync } from '../../redux/game/gameAsync';
import { useTypedSelector } from '../../__shared/hooks';
import { Table } from 'antd';
import * as buffer from 'buffer';
import { logout } from '../../redux/user/userActions';

const columns = [
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Счет',
        dataIndex: 'score',
        key: 'score',
    },
    {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status',
    },
];

const FinishPage = () => {
    // const dispatch = useDispatch();
    // const {topTeams} = useTypedSelector(state => state.game);
    // useEffect(() => {
    //     dispatch(getTopTeamAsync());
    // }, []);
    return (
        <div className={styles.FinishPage}>
            <h1>Ждем вас на старте для подведения итогов!</h1>
        </div>)

};
export default FinishPage;

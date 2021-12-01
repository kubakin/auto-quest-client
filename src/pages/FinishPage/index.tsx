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
    const dispatch = useDispatch();
    const {topTeams} = useTypedSelector(state => state.game);
    useEffect(() => {
        dispatch(getTopTeamAsync());
    }, []);
    // return <></>
    return topTeams &&(
        <div className={styles.FinishPage}>
            <div>TOP 10</div>
            <Table
                pagination={false}
                dataSource={topTeams} columns={columns}/>
            <button onClick={()=>dispatch(logout())}>EXIT</button>
        </div>

    );
};
export default FinishPage;

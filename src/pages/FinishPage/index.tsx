import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { useDispatch } from 'react-redux';
import { getTopTeamAsync } from '../../redux/game/gameAsync';
import { useTypedSelector } from '../../__shared/hooks';
import { Table } from 'antd';

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
    return (
        <div className={styles.FinishPage}>
            <div>TOP 10</div>
            <Table
                pagination={false}
                dataSource={topTeams} columns={columns}/>
        </div>
    );
};
export default FinishPage;

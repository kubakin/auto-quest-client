import React, { FC } from 'react';
import { iUser } from '../../../__shared/types';
import { Col, List, Row } from 'antd';
import { useHistory } from 'react-router-dom';
const UserRow:FC<{user: iUser}> = ({user}) => {
    const history = useHistory();
    return (
        <Row justify={'center'} className={'user_row'} onClick={() => history.push(`/admin/user/${user.id}`)}>
            <Col span={4}>
                {user.username}
            </Col>
            {/*<Col span={3}>*/}
            {/*    {user.id}*/}
            {/*</Col>*/}
            <Col span={3}>
                {user.team?.name || 'Нет команды'}
            </Col>
        </Row>
    )
}

export default UserRow;

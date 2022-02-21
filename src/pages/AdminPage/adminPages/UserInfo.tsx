import React, { FC, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import API from '../../../__shared/api';
import moment from 'moment';
import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Radio } from 'antd';
import { StatusGame, StatusTeam } from '../../../__shared/enum';
import UserRow from '../components/user-row';
interface RouterParams {
    id: string;
}
const UserInfo = () => {
    const routerParams = useParams<RouterParams>();
    const history = useHistory();
    const [user, setUser] = useState();
    useEffect(()=> {
            API.get(`/user/${routerParams.id}`)
                .then(data => {
                    setUser(data.data);
                    console.log(data.data)
                });
    }, [routerParams.id])

    const onDelete = () => {
        API.post(`/user/${routerParams.id}/delete`)
            .then(data=>{
                console.log('deleted');
                history.push('/admin/users');
            })
    }
    return user ? (
        <>
        <UserRow user={user}/>
            <Button onClick={()=>onDelete()} className={'delete-admin'} type="primary">
                Удалить
            </Button>
    </>
    ): <></>
};
export default UserInfo;



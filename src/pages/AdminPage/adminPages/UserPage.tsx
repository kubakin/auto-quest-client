import React, { useEffect, useState } from 'react';
import API from '../../../__shared/api';
import { iUser } from '../../../__shared/types';
import { List } from 'antd';
import UserRow from '../components/user-row';
import UserList from '../components/user-list';

const UserPage = () => {
    const [users, setUsers] = useState<iUser[]>();
    useEffect(()=> {
        API.get('/user')
            .then(data=> {
                setUsers(data.data);
            })
    }, [])
    return users ? (
        <div className={'width100'}>
            <UserList users={users}/>
        </div>
    ) : <></>
}
export default UserPage;

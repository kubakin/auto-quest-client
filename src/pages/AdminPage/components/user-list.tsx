import React, { FC } from 'react';
import { iUser } from '../../../__shared/types';
import UserRow from './user-row';

const UserList:FC<{users: iUser[]}> = ({users}) => {
    return (
        <div>
            {
                users.map(user=> {
                    return (
                        <UserRow user={user}/>

                    )
                })
            }
        </div>
    )
}

export default UserList;

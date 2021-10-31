import React from 'react';
import { Spin } from 'antd';

const WithLoader = ({children, condition}) => {
    return condition ? children : <Spin tip="Loading..."/>
}

export default WithLoader;

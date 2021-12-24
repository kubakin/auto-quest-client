import React from 'react';
import { Spin } from 'antd';

const WithLoader = ({children, condition}) => {
    return condition ? children : <div className={'shadow'}>{children}<Spin tip="Loading..."/></div>
}

export default WithLoader;

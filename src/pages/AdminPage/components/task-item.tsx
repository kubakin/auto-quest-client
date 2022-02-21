import React, { FC } from 'react';
import { iTask } from '../../../__shared/types';
import { Card } from 'antd';
import FileType from '../../../components/fileType';
const {Meta} = Card;
const TaskItem: FC<{ task: iTask }> = ({task}) => {
    if (!task) {
        return <div>No Task</div>
    }
    return (
        <Card
            hoverable
            style={{width: 240}}
            cover={<FileType task={task}/>}
        >
            <Meta title={task.text} description={task.answer}/>
        </Card>
    );
};
export default TaskItem;

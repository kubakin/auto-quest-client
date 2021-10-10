import React, { FC } from 'react';
import { iTask } from '../__shared/types';

const FileType:FC<{task: iTask}> = ({task}) => {
    const {fileType, file} = task;
    const fullPath = 'http://localhost:8000/' + file;
    return (
        <>
            {
                fileType === 'audio' ? <audio src={fullPath}></audio> : <img src={fullPath} alt=""/>
            }
        </>
    )
}

export default  FileType;

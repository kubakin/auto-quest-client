import { Button, Input, InputNumber, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import API from '../../../__shared/api';
import { iHelp, iTask } from '../../../__shared/types';
import styles from './index.module.scss';
import FileType from '../../../components/fileType';
import { CreateTaskDto, CreateUpdateTask, postTask } from './TaskPage';

interface RouterParams {
    id: string;
}

interface iHelpForm {
    task_id: number;
    text: string;
    price: number;
}

interface DataI<T> {
    data: T;
}

const TaskInfo = () => {
    const routerParams = useParams<RouterParams>();
    const [taskInfo, setTaskInfo] = useState<iTask>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalTaskVisible, setIsModalTaskVisible] = useState(false);
    const [default_order, setDefault_order] = useState();
    const [text, setText] = useState('');
    const [price, setPrice] = useState('');
    const history = useHistory();
    const showModal = () => setIsModalVisible(true);
    const hideModal = () => setIsModalVisible(false);
    const updateTask = async (obj: CreateTaskDto, file) => {
        await postTask({...taskInfo, ...obj}, file);
        getTask();
        setIsModalTaskVisible(false);
    };

    const getTask = async () => {
        await API.get(`/task/${routerParams.id}`).then((data) => {
            setTaskInfo(data.data);
        });
    }

    const deleteTask = async () => {
        await API.post(`/task/delete/${routerParams.id}`).then((data) => {
            history.push('/admin/tasks');
        });
    }

    useEffect(() => {
        getTask();
    }, [routerParams]);

    const deleteHelp = async (id: number) => {
        await API.post(`/help/delete/${id}`)
        window.location.reload();
    }

    const postHelp = () => {
        if (!text) return;
        const form: iHelpForm = {task_id: Number(routerParams.id), text: text, price: Number(price)};
        API.post('/help', form)
            .then((data: DataI<iHelp>) => setTaskInfo(prev => {
                return prev ? {...prev, helps: [...(prev.helps), data.data]} : undefined;
            }));
        setIsModalVisible(false);
    };
    return (
        taskInfo ? (
        <div>
            <Button onClick={()=>setIsModalTaskVisible(true)}>????????????????</Button>
            <Button onClick={()=>deleteTask()}>??????????????</Button>
            <CreateUpdateTask initState={taskInfo} isModalVisible={isModalTaskVisible} handleCancel={()=>setIsModalTaskVisible(false)} handleSubmit={(obj, file)=>updateTask(obj, file)}/>
            <div className={styles.taskInfo}>
                <div className={styles.row}>
                    <div>
                        ??????????????:
                    </div>
                    <p>
                        {taskInfo?.text}
                    </p>
                </div>
                <div className={styles.row}>
                    <div>
                        ??????????:
                    </div>
                    <p>
                        {taskInfo?.answer}
                    </p>
                </div>
                <div className={styles.row}>
                    <div>
                        ??????????????:
                    </div>
                    <p>
                        {taskInfo?.default_order}
                    </p>
                </div>
                <div className={styles.row}>
                    <FileType task={taskInfo}/>
                </div>
            </div>
            <Button type="primary" onClick={showModal}>
                ?????????????? ??????????????????
            </Button>
            <div className={styles.list}>
                <div className={styles.head}>
                    <div>id</div>
                    <div>??????????</div>
                    <div>????????</div>
                </div>
                {taskInfo && (
                    (taskInfo.helps as iHelp[])?.map((item: iHelp) => (
                        <div className={styles.item} key={item.id}>
                            <div>{item.id}</div>
                            <div>{item.text}</div>
                            <div>{item.price}</div>
                            <Button onClick={()=>deleteHelp(item.id)}>??????????????</Button>
                        </div>
                    ))
                )}
            </div>
            <>
                <Modal title="???????????????? ?????????? ??????????????????" visible={isModalVisible} onOk={postHelp} onCancel={hideModal}>
                    <p>?????????? ??????????????????:</p>
                    <Input value={text} onChange={(e) => setText(e.target.value)}/>
                    <Input value={price} onChange={(e) => setPrice(e.target.value)}/>
                </Modal>
            </>
        </div>
        ) : <></>
    );
};
export default TaskInfo;

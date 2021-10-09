import { Button, Input, Modal, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import API from "../../../__shared/api";
import { iHelp, iTask } from "../../../__shared/types";
import styles from "./index.module.scss";

interface RouterParams {
    id: string;
}

interface iHelpForm {
    task_id: number;
    text: string;
}
interface DataI<T> {
    data: T
}

const TaskInfo = () => {
    const routerParams = useParams<RouterParams>();

    const [taskInfo, setTaskInfo] = useState<iTask>();
    const [help, setTHelp] = useState<iHelp[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [text, setText] = useState('');

    const showModal = () => setIsModalVisible(true);
    const hideModal = () => setIsModalVisible(false);

    useEffect(() => {
        API.get(`/task/${routerParams.id}`).then((data) => {
            setTaskInfo(data.data);
        });
    });

    const postTask = () => {
        if (!text) return;
        const form: iHelpForm = { task_id: Number(routerParams.id), text: text };
        API.post('/help', form)
            .then((data: DataI<iHelp>) => setTaskInfo(prev => {
                return prev ? { ...prev, helps: [...(prev.helps), data.data] } : undefined;
            }))
        setIsModalVisible(false);
    }
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Создать подсказку
            </Button>
            <div className={styles.list}>
                <div className={styles.head}>
                    <div>Текст</div>
                    <div>Цена</div>
                </div>
                {taskInfo && (
                    (taskInfo.helps as iHelp[]).map((item: iHelp) => (
                        <div className={styles.item} key={item.id}>
                            <div>{item.text}</div>
                            <div>{item.price}</div>
                        </div>
                    ))
                )}
            </div>
            <>
                <Modal title="Создание новой подсказки" visible={isModalVisible} onOk={postTask} onCancel={hideModal}>
                    <p>Текст подсказки:</p>
                    <Input value={text} onChange={(e) => setText(e.target.value)} />
                </Modal>
            </>
        </>
    );
};
export default TaskInfo;

import { Button, Input, Modal, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from 'react-router-dom';
import API from "../../../__shared/api";
import styles from "./index.module.scss";

interface DataI<T> {
    data: T
}

const TaskPage = () => {
    const history = useHistory();
    const [tasks, setTasks] = useState<any>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [text, setText] = useState('');
    const [answer, setAnswer] = useState('');
    const [files, setFiles] = useState<Array<any> | any>([]);
    const showModal = () => {
        setIsModalVisible(true);
    };

    function handleClick() {
        history.push("/home");
    }
    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    useEffect(() => {
        API.get("/task").then((data) => {
            setTasks(data.data);
            console.log(data.data);
        });
    }, []);

    const postTask = () => {
        const file = files[0];
        const formData = new FormData();
        formData.append('file', file)
        formData.append('text', text)
        formData.append('answer', answer)
        API.post('/task', formData)
            .then((data: DataI<number>) => setTasks(prev => {
                return [...prev, data.data]
            }))
        setIsModalVisible(false);
    }
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Создать
            </Button>
            <div className={styles.TaskPage}>
                <div className={styles.taskRow}>
                    <div>id</div>
                    <div>Текст</div>
                    <div>Ответ</div>
                </div>
                {tasks?.length > 0 ? (
                    tasks.map((item: any) => {
                        return (
                            <div className={styles.taskWithHelps} onClick={() => history.push(`/admin/tasks/${item.id}`)}>
                                <div className={styles.taskRow}>
                                    <div>{item.id}</div>
                                    <div>{item.text}</div>
                                    <div>{item.answer}</div>
                                </div>
                                {/* <div>{item.text}</div> */}
                                {/*<div>*/}
                                {/*    {item?.helps?.length > 0 ? (*/}
                                {/*        item?.helps?.map((item) => {*/}
                                {/*            return <div className={styles.helpRow}>{item.text}</div>;*/}
                                {/*        })*/}
                                {/*    ) : (*/}
                                {/*        <></>*/}
                                {/*    )}*/}
                                {/*</div>*/}
                            </div>
                        );
                    })
                ) : (
                    <></>
                )}
            </div>
            <>

                <Modal title="Basic Modal" visible={isModalVisible} onOk={postTask} onCancel={handleCancel}>
                    <span>Текст задания:</span>
                    <Input value={text} onChange={(e) => setText(e.target.value)} />
                    <span>Ответ:</span>
                    <Input value={answer} onChange={(e) => setAnswer(e.target.value)} />
                    <span>Файл:</span>
                    <input type="file" onChange={(e) => setFiles(e.target.files)} name="" id="" />
                </Modal>
            </>
        </>
    );
};
export default withRouter(TaskPage);

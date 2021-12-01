import { Button, Card, Form, Input, Modal, Upload } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import API from '../../../__shared/api';
import styles from './index.module.scss';
import FileType from '../../../components/fileType';
import { iTask } from '../../../__shared/types';
import { UploadOutlined } from '@ant-design/icons';

const {Meta} = Card;

interface DataI<T> {
    data: T;
}

export interface CreateTaskDto {
    text: string;
    answer: string;
}


export const postTask = async (fieldValues, file) => {
    let formData = new FormData();
    formData.append('val', JSON.stringify(fieldValues));
    formData.append('file', file[0]);
    await API.post('/task', formData)
        .then((data: DataI<number>) => {
            console.log(data);
        });
};

const TaskPage = () => {
    const history = useHistory();
    const [tasks, setTasks] = useState<any>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const createTask = async (obj: CreateTaskDto, file) => {
        await postTask(obj, file);
        setIsModalVisible(false);
        getTasks();
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const getTasks = async () => {
        const data = await API.get('/task').then((data) => {
            setTasks(data.data);
        });
        return data;
    }
    useEffect(function() {
        getTasks();
    }, []);


    return (
        <>
            <Button className={styles.actionButton} type="primary" onClick={showModal}>
                Создать
            </Button>
            <div className={styles.TaskPage}>
                <div className={styles.tasks}>
                {
                    tasks.map((item: iTask) => {
                        return (
                            <div key={item.id} className={styles.task} onClick={() => history.push(`/admin/tasks/${item.id}`)}>
                                <TaskItem key={item.id} task={item}/>
                            </div>
                        );
                    })
                }
                </div>
            </div>
            <>
                <CreateUpdateTask handleSubmit={(obj, file) => createTask(obj, file)} handleCancel={handleCancel}
                            isModalVisible={isModalVisible}/>

            </>
        </>
    );
};
export default withRouter(TaskPage);

export const CreateUpdateTask: FC<{
    isModalVisible: boolean,
    handleCancel: () => void,
    initState?: iTask,
    handleSubmit: (obj: CreateTaskDto, file) => void
}> = ({
          isModalVisible,
          handleCancel,
          initState,
          handleSubmit
      }) => {
    const [file, setFile] = useState<Array<any> | any>([]);
    const [form] = Form.useForm();

    return (
        <Modal title="Создать задание" visible={isModalVisible} onOk={() => handleSubmit(form.getFieldsValue(), file)}
               onCancel={handleCancel}>
            <Form form={form}>
                <Form.Item
                    name={'text'}
                    label={'Текст'}
                    initialValue={initState?.text || ''}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name={'answer'}
                    label={'Ответ'}
                    initialValue={initState?.answer || ''}
                >
                    <Input/>
                </Form.Item>
                <Input onChange={(e) => setFile(e.target.files)} type={'file'}/>
            </Form>
        </Modal>
    );
};

const TaskItem: FC<{ task: iTask }> = ({task}) => {
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

import React, { FC, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import API from '../../../__shared/api';
import moment from 'moment';
import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Radio } from 'antd';
import { StatusGame, StatusTeam } from '../../../__shared/enum';
interface RouterParams {
    id: string;
}
const TeamInfo = () => {
    const routerParams = useParams<RouterParams>();
    const history = useHistory();
    const [team, setTeam] = useState();
    useEffect(()=> {
            API.get(`/team/${routerParams.id}`)
                .then(data => {
                    setTeam(data.data);
                    console.log(data.data)
                });
    }, [routerParams.id])
    const onSubmit = (data) => {
        API.post(`/team/${routerParams.id}/update`, data)
            .then(data=> {
                console.log(data.data);
                setTeam(data.data);
            })
    }
    const onDelete = () => {
        API.post(`/team/${routerParams.id}/delete`)
            .then(data=>{
                console.log('deleted');
                history.push('/admin/team');
            })
    }
    return team ? (
        <>
        <Form
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            onFinish={(val) => onSubmit(val)}
            autoComplete="off"
            initialValues={team}
        >
            <Form.Item
                label="Название"
                name="name"
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Счет"
                name="score"
            >
                <InputNumber/>
            </Form.Item>

            <Form.Item
                label="Прогресс"
                name="progress"
            >
                <InputNumber/>
            </Form.Item>

            <Form.Item name="status" wrapperCol={{offset: 8, span: 16}}>
                <Radio.Group>
                    <Radio value={StatusTeam.NOT_ACTIVATED}>Не активирована</Radio>
                    <Radio value={StatusTeam.ACTIVATED}>Активирована</Radio>
                    <Radio value={StatusTeam.PROGRESS}>Проходит</Radio>
                    <Radio value={StatusTeam.FINISHED}>Закончила</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
            <Button onClick={()=>onDelete()} className={'delete-admin'} type="primary">
                Удалить
            </Button>
        </>
    ) : <></>;
};
export default TeamInfo;



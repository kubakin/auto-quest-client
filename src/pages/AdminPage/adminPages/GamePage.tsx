import React, { FC } from 'react';
import API from '../../../__shared/api';
import moment from 'moment';
import { Button, Checkbox, DatePicker } from 'antd';
import { iGameData } from '../../../redux/game/gameReducer';
import { Radio } from 'antd';
import { StatusGame } from '../../../__shared/enum';
import { Form } from 'antd';

const GamePage: FC<{ game: iGameData }> = ({game}) => {
    const onSubmit = (data) => {
        API.post('/game', data)
            .then((data) => {
            });
    };
    return game && (
        <Form
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            onFinish={(val) => onSubmit(val)}
            autoComplete="off"
            initialValues={{
                mix: game.mix,
                start: moment(game.start),
                end: moment(game.end),
                statusGame: game.statusGame
            }}
        >
            <Form.Item
                label="Start"
                name="start"
            >
                <DatePicker showTime/>
            </Form.Item>

            <Form.Item
                label="End"
                name="end"
            >
                <DatePicker showTime/>
            </Form.Item>

            <Form.Item name="statusGame" wrapperCol={{offset: 8, span: 16}}>
                <Radio.Group>
                    <Radio value={StatusGame.STARTED}>Игра началась</Radio>
                    <Radio value={StatusGame.NOT_STARTED}>Игра не началась</Radio>
                    <Radio value={StatusGame.FINISHED}>Игра закончена</Radio>
                    <Radio value={StatusGame.TEST}>Test</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                label={'Перемешивать'}
                name={'mix'}
                valuePropName="checked">
                <Checkbox>Размешивать</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
export default GamePage;

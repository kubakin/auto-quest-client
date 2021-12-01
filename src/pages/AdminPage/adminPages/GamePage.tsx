import React, { FC, useEffect, useState } from 'react';
import API from "../../../__shared/api";
import moment, { Moment } from 'moment';
import { Button, DatePicker, Space } from 'antd';
import { useTypedSelector } from '../../../__shared/hooks';
import { isEmpty } from '../../../__shared/helpers';
import { iGameData } from '../../../redux/game/gameReducer';
import { Radio } from 'antd';
import { StatusGame } from '../../../__shared/enum';

const GamePage:FC<{game: iGameData}> = ({game}) => {
    const [start, setStart] = useState<Moment>(moment(game.start));
    const [end, setEnd] = useState<Moment>(moment(game.end));
    const [statusGame, setStatus] = useState<StatusGame>(game.statusGame);
    const changeGame = () => {
        API.post("/game", {start, end, statusGame})
            .then((data) => {
                console.log(data.data);
            });
    };
    return game ? (
        <div>
            <p>СТАРТ: {`${moment(game.start).format('MMMM Do YYYY, h:mm:ss')}`}</p>
            <p>КОНЕЦ: {`${moment(game.end).format('MMMM Do YYYY, h:mm:ss')}`}</p>
        <DatePicker defaultValue={start} showTime onOk={(val) => setStart(val)}/>
        <DatePicker defaultValue={end} showTime onOk={(e) => setEnd(e)}/>
            <Radio.Group onChange={(e)=>setStatus(e.target.value)} value={statusGame}>
                <Radio value={StatusGame.STARTED}>Игра началась</Radio>
                <Radio value={StatusGame.NOT_STARTED}>Игра не началась</Radio>
                <Radio value={StatusGame.FINISHED}>Игра закончена</Radio>
            </Radio.Group>
        <Button onClick={changeGame}>Сохранить</Button>
    </div>

    ) : <></>;
};
export default GamePage;

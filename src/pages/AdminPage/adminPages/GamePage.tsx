import React, { FC, useEffect, useState } from 'react';
import API from "../../../__shared/api";
import moment, { Moment } from 'moment';
import { Button, DatePicker, Space } from 'antd';
import { useTypedSelector } from '../../../__shared/hooks';
import { isEmpty } from '../../../__shared/helpers';
import { iGameData } from '../../../redux/game/gameReducer';

const GamePage:FC<{game: iGameData}> = ({game}) => {
    const [start, setStart] = useState<Moment | null>(moment(game.start));
    const [end, setEnd] = useState<Moment | null>(moment(game.end));
    const changeGame = () => {
        API.post("/game", {start, end})
            .then((data) => {
                console.log(data.data);
            });
    };
    return game ? (
        <div>
            <p>СТАРТ: {`${moment(game.start).format('MMMM Do YYYY, h:mm:ss')}`}</p>
            <p>КОНЕЦ: {`${moment(game.end).format('MMMM Do YYYY, h:mm:ss')}`}</p>
        <DatePicker showTime onOk={(val) => setStart(val)}/>
        <DatePicker showTime onChange={(e) => setEnd(e)}/>
        <Button onClick={changeGame}>Сохранить</Button>
    </div>

    ) : <></>;
};
export default GamePage;

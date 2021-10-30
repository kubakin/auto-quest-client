import React, {useEffect, useState} from "react";
import API from "../../../__shared/api";
import moment from "moment";
import {DatePicker, Space} from "antd";

const {RangePicker} = DatePicker;
const GamePage = () => {
    const [gameData, setGameData] = useState<any>();
    const changeGame = (e) => {
        console.log(e[0].toDate());
        API.post("/game", {start: e[0], end: e[1]})
            .then((data) => {
                console.log(data.data);
            });
    };
    useEffect(() => {
        API.get("/game").then((data) => {
            setGameData([data.data.game.start, data.data.game.end]);
        });
    }, []);
    return (
        <div>
            <Space direction="vertical" size={12}>
                {gameData?.length > 1 ? <RangePicker
                    onChange={(e) => changeGame(e)}
                    value={[moment(gameData[0]), moment(gameData[1])]}
                    showTime={{
                        hideDisabledOptions: true,
                        defaultValue: [
                            moment("00:00:00", "HH:mm:ss"),
                            moment("11:59:59", "HH:mm:ss"),
                        ],
                    }}
                    format="YYYY-MM-DD HH:mm:ss"
                /> : <></>}
            </Space>
        </div>
    );
};
export default GamePage;

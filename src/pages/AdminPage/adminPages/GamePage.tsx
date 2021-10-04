import React, { useEffect, useState } from "react";
import API from "../../../__shared/api";
import moment from "moment";
import { DatePicker, Space } from "antd";

const { RangePicker } = DatePicker;
const GamePage = () => {
  const [teams, setTeams] = useState([]);
  const changeGame = (e) => {
    console.log(e[0].toDate());
    API.post("/game", { start: e[0], end: e[1] }).then((data) => {
      console.log(data.data);
    });
  };
  useEffect(() => {
    API.get("/game").then((data) => {
      console.log(data.data);
      // setTeams(data.data);
    });
  }, []);
  return (
    <div>
      <Space direction="vertical" size={12}>
        <RangePicker
          onChange={(e) => changeGame(e)}
          showTime={{
            hideDisabledOptions: true,
            defaultValue: [
              moment("00:00:00", "HH:mm:ss"),
              moment("11:59:59", "HH:mm:ss"),
            ],
          }}
          format="YYYY-MM-DD HH:mm:ss"
        />
      </Space>
    </div>
  );
};
export default GamePage;

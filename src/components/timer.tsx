import React, { FC, useEffect, useState } from "react";
interface ITimerComponent {
  timerTo?: Date;
  timerEnd: () => void;
}
interface ITimerFormat {
  day: string;
  hour: string;
  min: string;
  sec: string;
}
const addNull = (value: number) => {
  const valStr = String(value);
  return valStr.length === 1 ? "0" + valStr : valStr;
};
const convertToDate = (dist: number) => {
  const sec = Math.floor(dist % 60);
  const min = Math.floor((dist / 60) % 60);
  const hour = Math.floor((dist / 24 / 60) % 24);
  const day = Math.floor((dist / 24 / 60 / 30) % 30);
  const date = {
    day: addNull(day),
    hour: addNull(hour),
    min: addNull(min),
    sec: addNull(sec),
  };
  return date;
};
const Timer: FC<ITimerComponent> = ({
  timerTo = new Date("Sep 16, 2022 16:34:25"),
  timerEnd,
}: ITimerComponent) => {
  const end = timerTo.getTime();
  const date = new Date();
  const [dist, setDist] = useState((end - date.getTime()) / 1000);
  const [timer, setTimer] = useState<ITimerFormat>({
    day: "00",
    hour: "00",
    min: "00",
    sec: "00",
  });
  useEffect(() => {
    if (dist > 0) {
      const timeOutId = setTimeout(() => {
        setDist(dist - 1);
        setTimer(convertToDate(dist));
      }, 1000);
      return function cleanup() {
        clearTimeout(timeOutId);
      };
    } else {
      timerEnd();
    }
  });
  return (
    <>
      <div>{timer?.day}</div>
      <div>{timer?.hour}</div>
      <div>{timer?.min}</div>
      <div>{timer?.sec}</div>
    </>
  );
};
export default Timer;

import { Button, Col, Row } from "antd";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentTaskAsync, getHelpAsync, toAnswerAsync } from "../../redux/game/gameAsync";
import { iState } from "../../redux/game/gameReducer";
import { RootState } from "../../redux/store";
import { useTypedSelector } from "../../__shared/hooks";
import AnswerComponent from "./components/answerComponent";
import ProgressComponent from "./components/progressComponent";
import styles from "./index.module.scss";

const toMinutesLeft = (stamp:number):number => {
  return Math.round((stamp - new Date().getTime()) / 1000 / 60);
}

const QuestionPage = () => {
  const dispatch = useDispatch();
  const state = useTypedSelector((state) => state);
  const quest = state.game;
  const team = state.user.user?.team;
  const [timeLeftToHelp, setTimeLeftToHelp] = useState(0);
  const [timeLeftToEnd, setTimeLeftToEnd] = useState(0);
  const [answer, setAnswer] = useState('');
  const nextAnswer = new Date(team?.next_answer || new Date());
  const endGame = new Date(quest.range.end);
  useEffect(() => {
    dispatch(getCurrentTaskAsync());
  },[dispatch]);

  const getHelp = () => {
    // dispatch(getHelpAsync());
    dispatch(getHelpAsync());
  }
  
  useEffect(()=> {
    const timeOutId = setInterval(()=>{
      setTimeLeftToHelp(toMinutesLeft(nextAnswer.getTime()))
      setTimeLeftToEnd(toMinutesLeft(endGame.getTime()))
    }, 1000);
    return function cleanup() {
      clearTimeout(timeOutId);
  }

  })

  return (
    <div className={styles.questionPage}>
      <Row justify="space-around">
        <Col onClick={getHelp}>
          <AnswerComponent min={timeLeftToHelp} />
        </Col>
        <Col>
          <ProgressComponent progress={team.progress} totalTasks={quest.totalTasks} min={timeLeftToEnd} />
        </Col>
      </Row>
      <Row className={styles.questComponent} justify="center">
        <Col><img alt='' src={`http://localhost:5000/${quest.quest.file}`}/></Col>
        <Col>{quest.quest.text}</Col>
      </Row>
      <Row className={styles.answerBottomBlock} justify="center">
        <Col  span={12}><input placeholder='Введите ответ' type="text" value={answer} onChange={(e:ChangeEvent<HTMLInputElement>)=>setAnswer(e.target.value)} /></Col>
        <Col span={8}><Button onClick={()=>dispatch(toAnswerAsync(answer))}>Отправить</Button></Col>
      </Row>
    </div>
  );
};
export default QuestionPage;

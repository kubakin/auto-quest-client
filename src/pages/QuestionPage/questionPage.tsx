import { Button, Col, Row } from 'antd';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getHelpAsync, toAnswerAsync } from '../../redux/game/gameAsync';
import { useTypedSelector } from '../../__shared/hooks';
import AnswerComponent from './components/answerComponent';
import ProgressComponent from './components/progressComponent';
import styles from './index.module.scss';
import FileType from '../../components/fileType';
import { useHistory } from 'react-router-dom';
import { Status } from '../../__shared/types';
import AuthContext, { IAuthContext } from '../../context';
import { ModalTypeEnum } from '../../types/enums';

const toMinutesLeft = (stamp:number):number => {
  return Math.round((stamp - new Date().getTime()) / 1000 / 60);
}

const QuestionPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {user: {user}, game} = useTypedSelector((state) => state);
  const task = user?.team?.currentTask?.task;
  const quest = game;
  const team = user?.team;
  const [timeLeftToHelp, setTimeLeftToHelp] = useState(0);
  const [timeLeftToEnd, setTimeLeftToEnd] = useState(0);
  const [answer, setAnswer] = useState('');
  const nextHelp = new Date(user?.team?.currentTask?.next_help || new Date());
  const endGame = new Date(quest.range.end);
  const value: IAuthContext = useContext(AuthContext);
  const getHelp = () => {
    dispatch(getHelpAsync());

  }

  const toAnswer = () => {
    dispatch(toAnswerAsync(answer))
  }

  useEffect(()=> {
    if (team?.status === Status.FINISHED) {
      history.push('/finish');
    }
  },[task])

  // useEffect(()=> {
  //   server.emit('next', team?.name)
  // },[team])

  useEffect(()=> {
    const timeOutId = setInterval(()=>{
      setTimeLeftToHelp(toMinutesLeft(nextHelp.getTime()))
      setTimeLeftToEnd(toMinutesLeft(endGame.getTime()))
    }, 1000);
    return function cleanup() {
      clearTimeout(timeOutId);
  }


  })
  return task && team ? (
    <div className={styles.questionPage}>
      <Row justify="space-around">
        <Col onClick={getHelp}>
          <AnswerComponent min={timeLeftToHelp} />
        </Col>
        <Col onClick={()=>value.setModalType(ModalTypeEnum.chat)}>
          <ProgressComponent  progress={team.progress} totalTasks={quest.totalTasks} min={timeLeftToEnd} />
        </Col>
      </Row>
      <div  className={styles.questComponent}>
        {task && <div><FileType task={task}/></div>}
        <div >{task?.text}</div>
      </div>
      <Row className={styles.answerBottomBlock} justify="center">
        <Col  span={12}><input placeholder='Введите ответ' type="text" value={answer} onChange={(e:ChangeEvent<HTMLInputElement>)=>setAnswer(e.target.value)} /></Col>
        <Col span={8}><Button onClick={()=>toAnswer()}>Отправить</Button></Col>
      </Row>
    </div>
  ): <></>;
};
export default QuestionPage;

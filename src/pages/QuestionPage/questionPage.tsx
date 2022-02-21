import { Button, Col, Row, Spin } from 'antd';
import React, { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getGameAsync, getHelpAsync, toAnswerAsync } from '../../redux/game/gameAsync';
import AnswerComponent from './components/answerComponent';
import ProgressComponent from './components/progressComponent';
import styles from './index.module.scss';
import FileType from '../../components/fileType';
import { useHistory } from 'react-router-dom';
import { iUserWithTeam, Status } from '../../__shared/types';
import AuthContext, { IAuthContext } from '../../context';
import { ModalTypeEnum } from '../../types/enums';
import { iGameData } from '../../redux/game/gameReducer';
import { StatusGame } from '../../__shared/enum';
import { useTypedSelector } from '../../__shared/hooks';

const toMinutesLeft = (stamp:number):number => {
  return Math.ceil((stamp - new Date().getTime()) / 1000 / 60);
}

const QuestionPage:FC<{user: iUserWithTeam, game: iGameData}> = ({user, game}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    user: {userLoaded},
  } = useTypedSelector((state) => state);
  const task = user.team?.currentTask?.task;
  const team = user?.team;
  const [timeLeftToHelp, setTimeLeftToHelp] = useState(0);
  const [timeLeftToEnd, setTimeLeftToEnd] = useState(0);
  const [answer, setAnswer] = useState('');
  const nextHelp = new Date(user?.team?.currentTask?.next_help || new Date());
  // const endGame = new Date(quest?.range?.end || new Date());
  const endGame = new Date(game.end)
  const value: IAuthContext = useContext(AuthContext);
  const getHelp = () => {
    dispatch(getHelpAsync());

  }

  const toAnswer = () => {
    dispatch(toAnswerAsync(answer.trim()))
    setAnswer('');
  }

  useEffect(()=> {
    if (team?.status === Status.FINISHED) {
      history.push('/finish');
    }
  },[task])

  useEffect(()=> {
    const tick = setInterval(()=> {
      dispatch(getGameAsync());
    },60000*3)
    if (game.statusGame === StatusGame.FINISHED) {
      clearInterval(tick);
      history.push('/finish')
    };
    return ()=> {
      clearInterval(tick);
    }
  }, [game])

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
      <>            {!userLoaded && <div className={'shadow'}><Spin tip="Loading..."/></div>}
    <div className={styles.questionPage}>
      <Row justify="space-around">
        <Col onClick={getHelp}>
          <AnswerComponent min={timeLeftToHelp} />
        </Col>
        <Col onClick={()=>value.setModalType(ModalTypeEnum.chat)}>
          <ProgressComponent  progress={team.progress} totalTasks={game.totalTasks} min={timeLeftToEnd} />
        </Col>
      </Row>
      <div  className={styles.questComponent}>
        {task && <div><FileType task={task}/></div>}
        <div >{task?.text}</div>
      </div>
      <Row className={styles.answerBottomBlock} justify="center">
        <Col  span={12}><input placeholder='Введите ответ' type="text" value={answer} onChange={(e:ChangeEvent<HTMLInputElement>)=>setAnswer(e.target.value.toLowerCase())} /></Col>
        <Col span={8}><Button onClick={()=>toAnswer()}>Отправить</Button></Col>
      </Row>
    </div>
      </>

  ): <></>;

};
export default QuestionPage;

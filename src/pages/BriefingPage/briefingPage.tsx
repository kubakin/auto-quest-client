import React, { FC, MouseEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/user/userActions';
import styles from './index.module.scss';
import { iGameData } from '../../redux/game/gameReducer';
import { StatusGame } from '../../__shared/enum';
import { getGameAsync } from '../../redux/game/gameAsync';
import { useTypedSelector } from '../../__shared/hooks';
import { Status } from '../../__shared/types';
import { meAsync } from '../../redux/user/userAsync';

const BriefingPage:FC<{game: iGameData}> = ({game}) => {
  const [timeEnd, setTimeEnd] = useState(false);
  const user = useTypedSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(()=>{
    const tick = setInterval(()=> {
      console.log('tick');
      dispatch(meAsync());
    }, 3000)
    if (user.user?.team?.status === Status.ACTIVATED) {
      clearInterval(tick);
    }
    return function cleanup() {
      clearInterval(tick);
    }
  }, [user])

  useEffect(()=> {
    const tick = setInterval(()=> {
      dispatch(getGameAsync());
    }, 3000);
    if (game.statusGame !== StatusGame.NOT_STARTED) {
      clearInterval(tick);
    }
    return function cleanup() {
      clearInterval(tick);
    }
  }, [game])
  const exitHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(logout());
  };
  
  return (
    <div className={styles.briefingPage}>
      {/*{!timeEnd ? (*/}
      {/*  <div className={styles.timeLeft}>*/}
      {/*    <p>До начала квеста</p>*/}
      {/*    <p>осталось</p>*/}
      {/*    <div className={styles.timer}>*/}
      {/*      <Timer*/}
      {/*        timerTo={new Date(game.start || new Date())}*/}
      {/*        timerEnd={() => setTimeEnd(true)}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*) : (*/}
      {game.statusGame === StatusGame.STARTED && user.user?.team?.status === Status.ACTIVATED && <Link className={styles.startQuestLink} to='/quest'>Начать квест</Link>}
      {game.statusGame === StatusGame.NOT_STARTED && <p className={styles.waitGame}>Дождитесь начала следующей игры</p>}
      {/*// )}*/}

      <div className={styles.buttonGroup}>
        <a
          href="/"
          className={styles.exitButton}
          onClick={(e: MouseEvent<HTMLAnchorElement>) => exitHandler(e)}
        >
          Выйти
        </a>
        <Link className={styles.briefingButton} to="/instruction">
          Инструктаж
        </Link>
      </div>
    </div>
  );
};
export default BriefingPage;

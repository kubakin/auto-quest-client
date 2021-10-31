import React, { FC, MouseEvent, useState } from 'react';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Timer from "../../components/timer";
import { logout } from "../../redux/user/userActions";
import styles from "./index.module.scss";
import { iGameData } from '../../redux/game/gameReducer';

const BriefingPage:FC<{game: iGameData}> = ({game}) => {
  const [timeEnd, setTimeEnd] = useState(false);
  const dispatch = useDispatch();

  const exitHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(logout());
  };
  
  return (
    <div className={styles.briefingPage}>
      {!timeEnd ? (
        <div className={styles.timeLeft}>
          <p>До начала квеста</p>
          <p>осталось</p>
          <div className={styles.timer}>
            <Timer
              timerTo={new Date(game.start || new Date())}
              timerEnd={() => setTimeEnd(true)}
            />
          </div>
        </div>
      ) : (
        <Link className={styles.startQuestLink} to='/quest'>Начать квест</Link>
      )}

      <div className={styles.buttonGroup}>
        <a
          href="/"
          className={styles.exitButton}
          onClick={(e: MouseEvent<HTMLAnchorElement>) => exitHandler(e)}
        >
          Выйти
        </a>
        <Link className={styles.briefingButton} to="/">
          Инструктаж
        </Link>
      </div>
    </div>
  );
};
export default BriefingPage;

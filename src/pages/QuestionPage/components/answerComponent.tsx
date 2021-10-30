import React, { FC } from "react";
import clockRed from '../media/clockRed.png';
import clockGreen from '../media/clockGreen.png';
import styles from '../index.module.scss';
const AnswerComponent:FC<{min: number}> = ({min}) => {
  return (
    <div className={styles.helpBlock}>
        <img src={min > 0 ? clockRed : clockGreen} alt=''/>
          <div className={styles.paragraphBlockHelp}>
          <p className={styles.time}>{min > 0 ? min : 0} мин</p>
          <p className={styles.help}>ПОДСКАЗКА</p>
          </div>
    </div>
  );
};
export default AnswerComponent;

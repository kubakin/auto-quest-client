import React, { FC } from "react";
import styles from '../index.module.scss';
const ProgressComponent:FC<{min:number, progress: number, totalTasks: number}> = ({min, progress, totalTasks}) => {
  return (
    <div className={styles.progressComponent}>
        <p className={styles.progress}>Авто Квест#1 ({progress}/{totalTasks})</p>
        <p className={styles.chat}> Чат</p>
        <p className={styles.time}>Осталось {min > 0 ? min : 0} минут</p>
    </div>
  );
};
export default ProgressComponent;

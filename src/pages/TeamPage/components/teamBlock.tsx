import { Row } from "antd";
import React from "react";
import styles from "../index.module.scss";
import exit from "../media/exit.png";
const TeamBlock = ({team, leaveTeam}) => {
  return (
    <>
      <div className={styles.teamBlock}>
        <h2>{team?.name}</h2>
        <p>Прогресс : {team?.progress}</p>
        <p>Очков : {team?.score}</p>
        <Row
          onClick={() => leaveTeam()}
          className={styles.enterBlock}
          align="middle"
        >
          <img onClick={() => leaveTeam()} alt="plus" src={exit} />
          <p>Покинуть команду</p>
        </Row>
      </div>
    </>
  );
};

export default TeamBlock;

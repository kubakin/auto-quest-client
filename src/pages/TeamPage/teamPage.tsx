import {  Row } from "antd";
import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import EnterTeam from "./components/enterToTeam";
import styles from "./index.module.scss";
import Modal from "../../components/modal";
import { useDispatch } from "react-redux";
import { createTeamAsync, enterToTeamAsync, leaveTeamAsync } from '../../redux/user/userAsync';
import { useTypedSelector } from "../../__shared/hooks";
import plus from "./media/plus.png";
import TeamBlock from "./components/teamBlock";
const TeamPage: FC = () => {
  const [enterModal, setEnterModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const user = useTypedSelector((state) => state.user);
  const enterToTeam = () => {
    dispatch(enterToTeamAsync(name));
    setEnterModal(false);
  };
  const createTeam = () => {
    dispatch(createTeamAsync(name));
    setCreateModal(false);
  };
  return (
    <>
      <div className={styles.teamPage}>
        {!user.user?.team ? <div className={styles.buttonGroup}>
          <Row
            onClick={() => setEnterModal(true)}
            className={styles.enterBlock}
            align="middle"
          >
            <img alt="plus" src={plus} />
            <p>Вступить в команду</p>
          </Row>
          <Row
            onClick={() => setCreateModal(true)}
            className={styles.enterBlock}
            align="middle"
          >
            <img alt="plus" src={plus} />
            <p>Создать команду</p>
          </Row>
        </div> : <TeamBlock leaveTeam={()=>dispatch(leaveTeamAsync())} team={user.user?.team}/>}
        
        

       
        <Row className={styles.briefingLink}>
          <Link to="/briefing">Перейти к брифингу</Link>
        </Row>
      </div>
      <Modal
        title="Вступить"
        visible={enterModal}
        handleOk={() => enterToTeam()}
        handleClose={() => setEnterModal(false)}
      >
        <EnterTeam value={name} changeHandler={(name) => setName(name)} />
      </Modal>
      <Modal
        title="Создать"
        visible={createModal}
        handleOk={() => createTeam()}
        handleClose={() => setCreateModal(false)}
      >
        <EnterTeam value={name}  changeHandler={(name) => setName(name)} />
      </Modal>
    </>
  );
};
export default TeamPage;

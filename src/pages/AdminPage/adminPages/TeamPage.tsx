import React, { useEffect, useState } from "react";
import API from "../../../__shared/api";
import { iTeam } from '../../../__shared/types';
import styles from './index.module.scss';
import { Button } from 'antd';
const TeamPage = () => {
  const [teams, setTeams] = useState <iTeam[]>([]);
  const updateData = (id: number, data: iTeam) => {
    const index = teams.findIndex((item)=>item.id === id);
    setTeams((prev)=> {
      return [
        ...prev.slice(0, index),
        data,
          ...prev.slice(index+1, prev.length)
      ]
    })
  }
  const activateTeam = (id) => {
    API.post(`/team/activate/${id}`)
        .then(data=> {
          console.log(data);
          updateData(id, data.data);
        })
  }

  useEffect(() => {
    API.get("/team").then((data) => {
      console.log(data.data);
      setTeams(data.data);
    });
  }, []);
  return (
    <div className={styles.TeamPage}>
      {teams.length > 0 ? (
        teams.map((item) => {
          return <div className={styles.teamRow}>
            <div>{item.name}</div>
            <div>{item.status}</div>
            <Button onClick={()=>activateTeam(item.id)}>Activate</Button>
          </div>
        })
      ) : (
        <></>
      )}
    </div>
  );
};
export default TeamPage;

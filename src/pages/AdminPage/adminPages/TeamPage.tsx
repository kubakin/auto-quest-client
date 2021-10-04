import React, { useEffect, useState } from "react";
import API from "../../../__shared/api";

const TeamPage = () => {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    API.get("/team").then((data) => {
      console.log(data.data);
      setTeams(data.data);
    });
  }, []);
  return (
    <div>
      {teams.length > 0 ? (
        teams.map((item: any) => {
          return <div>{item.name}</div>;
        })
      ) : (
        <></>
      )}
    </div>
  );
};
export default TeamPage;

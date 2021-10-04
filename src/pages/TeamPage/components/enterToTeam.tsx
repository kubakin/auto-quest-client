import { Input } from "antd";
import React, { ChangeEvent, FC } from "react";
const EnterTeam: FC<any> = ({ name, changeHandler }) => {
  return (
    <div>
      <Input
        value={name}
        size='large'
        placeholder='Название команды'
          className='modal-input'
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          changeHandler(e.target.value)
        }
      />
    </div>
  );
};

export default EnterTeam;

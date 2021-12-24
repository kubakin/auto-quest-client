import { Input } from "antd";
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { loginAsync } from "../redux/user/userAsync";
import Modal from "./modal";
interface ILoginModal {
  show: boolean;
  handleClose: () => void;
}
const LoginModal: FC<ILoginModal> = ({ show, handleClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleOk = () => {
    dispatch(loginAsync({username: username.toLowerCase(), password: password.toLowerCase()}))
    handleClose();
  };
  return (
    <Modal
      visible={show}
      handleClose={handleClose}
      title="Вход"
      handleOk={handleOk}
    >
      <>
      <Input
          placeholder="Номер телефона"
          allowClear
          value={username}
          className='modal-input'
          size='large'
          onChange={(e:any) => setUsername(e.target.value)}
        />
        <Input.Password
          placeholder="Password"
          allowClear
          size='large'
          className='modal-input'
          value={password}
          onChange={(e:any) => setPassword(e.target.value)}
        />
      </>
    </Modal>
  );
};
export default LoginModal;

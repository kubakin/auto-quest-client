import { Input } from "antd";
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { loginAsync } from "../redux/user/userAsync";
import API from "../__shared/api";
import cookies from "../__shared/cookie";
import Modal from "./modal";
interface ILoginModal {
  show: boolean;
  handleClose: () => void;
}
const LoginModal: FC<ILoginModal> = ({ show, handleClose }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const handleOk = () => {
    dispatch(loginAsync({email: login, password}))
    console.log(login);
    console.log(password);
    // history.push('/briefing');
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
          placeholder="Login"
          allowClear
          value={login}
          className='modal-input'
          size='large'
          onChange={(e:any) => setLogin(e.target.value)}
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

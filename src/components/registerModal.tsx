import { Input } from 'antd';
import React, {FC, useState} from 'react';
import { useDispatch } from 'react-redux';
import { registerAsync } from '../redux/user/userAsync';
import Modal from "./modal";

interface IRegisterModal {
  show: boolean,
  handleClose: ()=>void
}
const RegisterModal:FC<IRegisterModal> = ({show, handleClose})  => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const handleOk = () => {
    dispatch(registerAsync({email, password}));
    console.log(login);
    console.log(password);
    console.log(email);
    handleClose();
  };
  return (
    <Modal
      visible={show}
      handleClose={handleClose}
      title="Регистрация"
      handleOk={handleOk}
    >
      <div>
      {/* <Input
          placeholder="Login"
          allowClear
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        /> */}
        <Input
          placeholder="Email"
          allowClear
          value={email}
          size='large'
          className='modal-input'
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input.Password
          placeholder="Password"
          allowClear
          size='large'
          className='modal-input'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </Modal>
  );
}
export default RegisterModal;

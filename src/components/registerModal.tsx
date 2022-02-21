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
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const handleOk = () => {
    if (username) {
      dispatch(registerAsync({username: username.toLowerCase(), password: password.toLowerCase()}));
      handleClose();
    }
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
          placeholder="Номер телефона"
          allowClear
          autoComplete={'false'}
          aria-autocomplete={'none'}
          value={username}
          size='large'
          className='modal-input'
          onChange={(e) => setUsername(e.target.value)}
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

import React, { useContext } from 'react';
import AuthContext from '../../context';
import { ModalTypeEnum } from '../../types/enums';
import styles from './index.module.scss';
import logoCar from './media/logo-car.png';
import logoText from './media/logo-text.png';
const AuthPage = () => {
  const {setModalType} = useContext(AuthContext);
    return (
        <>
        <div className={styles.authPage}>
            <div className={styles.header}>
                <img className={styles.logoText} src={logoText} alt="" />
                <img className={styles.logoCar} src={logoCar} alt="" />
            </div>
            <div className={styles.buttonGroup}>
                <div onClick={()=>setModalType(ModalTypeEnum.signUp)} className={styles.signUp}>Создать аккаунт</div>
                <div onClick={()=>setModalType(ModalTypeEnum.signIn)} className={styles.signIn}>Войти</div>
            </div>
        </div>
        </>
    )
}
export default AuthPage;
import { ModalTypeEnum } from './../types/enums';
import { createContext } from 'react';
export interface IAuthContext {
    modalType:ModalTypeEnum,
    setModalType:(type:ModalTypeEnum)=>void
}
const AuthContext:any = createContext({});
export default AuthContext;
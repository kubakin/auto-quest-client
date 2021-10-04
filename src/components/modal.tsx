import React, { ReactChild } from "react";
import { Button, Col, Layout, Row } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import logoCar from "../pages/AuthPage/media/logo-car.png";
interface IModalComponent {
  visible: boolean;
  children: ReactChild;
  handleClose: () => void;
  handleOk: () => void;
  title: string;
}
const Modal = ({
  children,
  visible,
  handleClose,
  title,
  handleOk,
}: IModalComponent) => {
  return visible ? (
    <div className="shadow">
      <div className="wrapper">
        <div className="modal">
          <div className="modal-header">
          <div ><img src={logoCar} alt="" /></div>

            <div >{title}</div>

            </div>
            <Row>
          </Row>
          <Row className="modal-content">{children}</Row>
          <Row className="modal-footer">
            <div onClick={handleClose}>Отмена</div>
            <div onClick={handleOk}>{title}</div>
          </Row>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
export default Modal;

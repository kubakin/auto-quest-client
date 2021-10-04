import React, { FC } from "react";

const AlertModal: FC<{ visible: boolean; text: string, clickHandler: ()=>void }> = ({
  visible,
  text,
  clickHandler
}) => {
  return visible ? (
    <div className="shadow">
      <div className="alertModal">
        <p>{text}</p>
        <button onClick={clickHandler}>Хорошо</button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default AlertModal;

import React, { FC, useEffect, useRef, useState } from 'react';
import { Button, Col, Drawer, Input, Row } from 'antd';
import { useTypedSelector } from '../__shared/hooks';
import { useDispatch } from 'react-redux';
import { addMsg } from '../redux/game/gameActions';
import server from '../__shared/socket';

const Chat: FC<{ show: boolean, handleClose: () => void }> = ({show, handleClose}) => {
    const {game: {chat}, user: {user}} = useTypedSelector(state=>state);
    const team = user?.team;
    const dispatch = useDispatch();
    const [msg, setMsg] = useState('');
    const wrapperRef = useRef<null | HTMLDivElement>(null);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    useEffect(()=> {
        wrapperRef.current?.scrollTo(0, messagesEndRef.current?.clientHeight || 0)
    }, [chat])
    const sendMsg = () => {
        server.emit('chat', {team: user?.team?.name, msg: msg});
        setMsg('');

    }
    return (
        <>
            <Drawer bodyStyle={{display: 'flex',flexDirection:'column', justifyContent: 'space-between'}} title="Чат" placement="right" onClose={handleClose} visible={show && !!team}>
                <div ref={wrapperRef} className={'msgWrapper'}><div className={'msgBlock'} ref={messagesEndRef}>
                {
                    chat.map((item, index)=> {
                        return <p key={index}>{item}</p>
                    })
                }
                </div>
                </div>
                <Row>
                    <Col span={16}><Input value={msg} onInput={(e:React.ChangeEvent<HTMLInputElement>)=>setMsg(e.target.value)} placeholder={'Сообщение'}/></Col>
                    <Col span={8}><Button onClick={sendMsg}>Send</Button></Col>
                </Row>
            </Drawer>
        </>
    );
};

export default Chat;

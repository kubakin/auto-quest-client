import React, { FC, useEffect, useRef, useState } from 'react';
import { Button, Col, Drawer, Input, Row } from 'antd';
import { useTypedSelector } from '../__shared/hooks';
import { useDispatch } from 'react-redux';
import { addMsg } from '../redux/game/gameActions';
import server from '../__shared/socket';
import { iTeam } from '../__shared/types';

const Chat: FC<{ show: boolean, handleClose: () => void, team: iTeam | null}> = ({show, handleClose, team}) => {
    const {game: {chat}, user: {user}} = useTypedSelector(state => state);
    const dispatch = useDispatch();
    const [msg, setMsg] = useState('');
    const wrapperRef = useRef<null | HTMLDivElement>(null);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
        wrapperRef.current?.scrollTo(0, messagesEndRef.current?.clientHeight || 0);
    }, [chat]);
    const sendMsg = () => {
        server.emit('chat', {team: team?.name, msg: msg});
        setMsg('');

    };
    return (
        <>
            <Drawer bodyStyle={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}} title="Чат"
                    placement="right" onClose={handleClose} visible={show && !!team}>
                <div ref={wrapperRef} className={'msgWrapper'}>
                    <div className={'msgBlock'} ref={messagesEndRef}>
                        {
                            team && chat[team.name]?.map((item, index) => {
                                return <p key={index}>{item}</p>;
                            })
                        }
                    </div>
                </div>
                <Row>
                    <Col span={16}><Input value={msg}
                                          onInput={(e: React.ChangeEvent<HTMLInputElement>) => setMsg(e.target.value)}
                                          placeholder={'Сообщение'}/></Col>
                    <Col span={8}><Button onClick={sendMsg}>Send</Button></Col>
                </Row>
            </Drawer>
        </>
    );
};

export default Chat;

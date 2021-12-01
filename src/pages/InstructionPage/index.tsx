import React from 'react';
import Img from './media/instruction.png';
import styles from './index.module.scss';
import {ArrowLeftOutlined} from '@ant-design/icons'
import { Link } from "react-router-dom";
const InstructionPage = () => {
    return (
        <div>
            <Link to={'/briefing'}><ArrowLeftOutlined color={'blue'} className={styles.backIcon}/></Link>
            <img className={styles.instruction} src={Img} alt="instruction"/>
        </div>
    )
}

export default InstructionPage;

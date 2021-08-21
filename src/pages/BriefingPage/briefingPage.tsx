import React from 'react';
import { Link } from 'react-router-dom';
import Timer from '../../components/timer';
import styles from './index.module.scss';
const BriefingPage = () => {
    return (
        <div className={styles.briefingPage}>
            <div className={styles.timeLeft}>
                <p>До начала квеста</p>
                <p>осталось</p>
                <div className={styles.timer}>
                    <Timer />
                </div>
            </div>
            <div className={styles.buttonGroup}>
                <Link className={styles.exitButton} to="/">Выйти</Link>
                <Link className={styles.briefingButton} to="/">Инструктаж</Link>
            </div>
        </div>
    )
}
export default BriefingPage;
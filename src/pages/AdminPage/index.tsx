import { Layout, Menu } from 'antd';
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import React, { FC, useEffect } from 'react';
import styles from './index.module.scss';
import TaskPage from './adminPages/TaskPage';
import TeamPage from './adminPages/TeamPage';
import { Link, Route, Switch } from 'react-router-dom';
import GamePage from './adminPages/GamePage';
import TaskInfo from './adminPages/TaskInfo';
import server from '../../__shared/socket';
import RoutesAdminList, { baseAdminPath } from './components/routesAdminList';
import { iUser } from '../../__shared/types';
import { iGameData } from '../../redux/game/gameReducer';

const {Header, Content, Footer, Sider} = Layout;

const AdminPage: FC<{ user: iUser, game: iGameData, match: any }> = ({match, user, game}) => {

    useEffect(() => {
        server.emit('join', 'admin');
    });

    return (
        <div className={styles.AdminPage}>
            <Layout className={styles.minHeight100}>
                <Sider>
                    <div className="logo"/>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={[window.location.pathname]}
                    >
                        <Menu.Item key={match.path + '/tasks'} icon={<UserOutlined/>}>
                            <Link to={baseAdminPath + '/tasks'}>Задания</Link>
                        </Menu.Item>
                        <Menu.Item key={match.path + '/team'} icon={<VideoCameraOutlined/>}>
                            <Link to={baseAdminPath + '/team'}>Команды</Link>
                        </Menu.Item>
                        <Menu.Item key={match.path + '/game'} icon={<UploadOutlined/>}>
                            <Link to={baseAdminPath + '/game'}>Игра</Link>
                        </Menu.Item>

                    </Menu>
                </Sider>
                <Layout>
                    <Header
                        className="site-layout-sub-header-background"
                        style={{padding: 0}}
                    />
                    <Content className={styles.AdminContent} style={{margin: '24px 16px 0'}}>
                        <Switch>
                            <RoutesAdminList match={match} user={user} game={game}/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        ТВОЙ КВЕСТ
                    </Footer>
                </Layout>
            </Layout>
        </div>
    );
};
export default AdminPage;

import { Layout, Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import API from "../../__shared/api";
import { Router, useHistory } from "react-router";
import TaskPage from "./adminPages/TaskPage";
import TeamPage from "./adminPages/TeamPage";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import GamePage from "./adminPages/GamePage";
const { Header, Content, Footer, Sider } = Layout;

const AdminPage = ({ match }) => {
  const history = useHistory();
  console.log(match);

  return (
    <div className={styles.AdminPage}>
      <Layout className={styles.minHeight100}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            onClick={(event: any) => console.log(event)}
            defaultSelectedKeys={["4"]}
          >
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to={match?.path + "/tasks"}>Задания</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              <Link to={match?.path + "/team"}>Команды</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
            <Link to={match?.path + "/game"}>Игра</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              nav 4
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            className="site-layout-sub-header-background"
            style={{ padding: 0 }}
          />
          <Content className={styles.AdminContent} style={{ margin: "24px 16px 0" }}>
            <Switch>
              <Route path={match.path + "/tasks"} component={TaskPage} />
              <Route path={match.path + "/team"} component={TeamPage} />
              <Route path={match.path + "/game"} component={GamePage} />
            </Switch>
            {/* <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              content
            </div> */}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            ТВОЙ КВЕСТ
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};
export default AdminPage;

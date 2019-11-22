import React, { useState } from 'react'
import { Icon, Row, Col } from 'antd'
import { LOCAL_STORAGE } from '@/constants'
import { UserIcon, UserAvatar, UserSubMenu, Wrapper, Menu, LogoIcon } from './styles'

const Component = () => {
  const [selectedKeys, setSelectedKeys] = useState('feed')

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE.TOKEN)
  }

  return (
    <Wrapper>
      <Row type="flex" justify="center">
        <Col span={6}>
          <Menu
            onClick={setSelectedKeys}
            selectedKeys={[selectedKeys]}
            mode="horizontal"
            justify="left"
          >
            <Menu.Item key="feed">
              <Icon type="home" />
              Feed
            </Menu.Item>
            <Menu.Item key="app">
              <Icon type="appstore" />
              Discover
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={12}>
          <Menu mode="horizontal" justify="center">
            <Menu.Item key="fire">
              <LogoIcon type="fire" theme="filled" />
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={6}>
          <Menu
            onClick={setSelectedKeys}
            selectedKeys={[selectedKeys]}
            mode="horizontal"
            justify="flex-end"
          >
            <UserSubMenu
              title={
                <span className="submenu-title-wrapper">
                  <UserAvatar shape="square" icon="user" />
                  Wiedy Mi
                  <UserIcon type="down" />
                </span>
              }
            >
              <Menu.Item>
                <Icon type="user" />
                My profile
              </Menu.Item>
              <Menu.Item>
                <Icon type="setting" />
                Setting
              </Menu.Item>
              <Menu.Item onClick={logout}>
                <Icon type="logout" />
                Log out
              </Menu.Item>
            </UserSubMenu>
          </Menu>
        </Col>
      </Row>
    </Wrapper>
  )
}

export default Component

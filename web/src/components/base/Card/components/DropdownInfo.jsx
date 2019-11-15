import React from 'react'
import { Dropdown, Icon, Menu } from 'antd'

const menu = (
  <Menu>
    <Menu.Item>
      <a rel="noopener noreferrer" href="/">
        Share a link
      </a>
    </Menu.Item>
    <Menu.Item>
      <a href="/">
        Add to favorite
      </a>
    </Menu.Item>
  </Menu>
)

export const DropdownInfo = () => {
  return (
    <Dropdown overlay={menu} placement="bottomLeft">
      <Icon type="more" />
    </Dropdown>
  )
}

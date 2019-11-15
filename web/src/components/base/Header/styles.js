import styled, { css } from 'styled-components'
import { Icon, Avatar, Menu as AntdMenu } from 'antd'
const { SubMenu } = AntdMenu

export const UserIcon = styled(Icon)`
  font-size: 12px !important;
  margin-left: 5px !important;
`
export const LogoIcon = styled(Icon)`
  font-size: 20px !important;
  margin-right: 0 !important;
  color: #40a9ff !important;
`

export const UserAvatar = styled(Avatar)`
  margin-right: 10px !important;
  i {
    margin: 0px !important;
  }
`

export const UserSubMenu = styled(SubMenu)``

export const Wrapper = styled.div`
  .ant-menu-submenu-active {
    border-bottom: 2px solid transparent !important;
  }
`

const disableBorder = css`
  .ant-menu-item-active {
    border-bottom: 2px solid transparent !important;
  }
`

export const Menu = styled(AntdMenu)`
  display: flex !important;
  justify-content: ${({ justify }) => justify} !important;
  ${({ justify }) => (justify === 'center' ? disableBorder : '')}
`

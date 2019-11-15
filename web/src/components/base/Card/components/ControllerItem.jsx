import React from 'react'
import { Typography, Icon } from 'antd'
import { CotrollerItem } from '../styles'

const { Text } = Typography

export const CotrollerItems = (icon, text) => {
  return (
    <CotrollerItem type={icon}>
      <Icon type={icon} />
      <Text>{text}</Text>
    </CotrollerItem>
  )
}

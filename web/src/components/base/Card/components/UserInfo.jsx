import React from 'react'
import grav from 'gravatar'
import { Avatar, Typography } from 'antd'
import { WrapperInfo, CardUserInfo, Badge } from '../styles'

const { Text } = Typography

const getTime = time => {
  const date = new Date(+time)

  return date.toLocaleString()
}

export const UserInfo = ({ email, username, time, avatar }) => {
  const gravatar = grav.url(email)
  const av = avatar !== undefined ? avatar : gravatar

  return (
    <WrapperInfo>
      <Badge dot>
        <Avatar shape="square" src={av} />
      </Badge>
      <CardUserInfo>
        <a href={`/u/${username}`}>{username}</a>
        <Text>{getTime(time)}</Text>
      </CardUserInfo>
    </WrapperInfo>
  )
}

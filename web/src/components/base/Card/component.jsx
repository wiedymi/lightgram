import React from 'react'
import { Card, CardBody, CardImg, CardController } from './styles'
import { UserInfo, DropdownInfo, CotrollerItems } from './components'

const Component = ({ image, user, time }) => {
  return (
    <Card title={<UserInfo {...user} time={time} />} bordered
      size="small" extra={<DropdownInfo />}
    >
      <CardImg src={image.small} />
      <CardBody>
        <CardController>
          {CotrollerItems('heart', 'Like')}
          {CotrollerItems('message', 'Comment')}
          {CotrollerItems('retweet', 'Share')}
        </CardController>
      </CardBody>
    </Card>
  )
}

export default Component

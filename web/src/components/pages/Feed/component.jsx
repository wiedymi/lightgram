import React, { useState } from 'react'
import { Col, Row, Empty } from 'antd'
import { getFeed } from '@/graphql'
import { LOCAL_STORAGE } from '@/constants'
import { useAccess, getData } from '@/helpers'
import { Card, User } from '@/components/base'
import { Auth } from '@/components/forms'
import { ErrorMessage, Pagination, EmptyWrapper } from './styles'

const Emp = ({ text }) => {
  return (
    <EmptyWrapper>
      <Empty
        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
        imageStyle={{
          height: 120,
        }}
        description={<span>{text}</span>} />
    </EmptyWrapper>
  )
}

const Component = () => {
  const [currentPage, setPage] = useState(1)
  const token = localStorage.getItem(LOCAL_STORAGE.TOKEN)
  const [user, showUser] = useState(!!token)
  const perPage = 2
  const { data, loading, error } = getFeed({
    offset: currentPage === 1 ? 0 : currentPage,
    limit: perPage,
  })

  const { isLoaded, hasAccess } = useAccess({
    permissions: {
      'go:read': true,
      'feed:read': true,
    },
  })

  const usersAccess = hasAccess('feed:read')

  if (!usersAccess) {
    return <Emp text="No access" />
  }

  if (loading && isLoaded) {
    return <div>Loading...</div>
  }

  if (error) {
    return <ErrorMessage>Server is not available</ErrorMessage>
  }

  const posts = getData(data, 'feed', true)
  const users = posts.map(props => {
    return (
      <Col span={24} key={props.id}>
        <Card {...props} />
      </Col>
    )
  })

  return (
    <Row gutter={[40, 24]} type="flex">
      <Col span={16}>
        <Row gutter={[40, 24]} type="flex">
          {data.feed.docs.length > 0 ? users : <Emp text="No posts" />}
        </Row>
        {data.feed.totalDocs / perPage > 1 && (
          <Pagination
            defaultCurrent={currentPage}
            defaultPageSize={perPage}
            total={data.feed.totalDocs}
            onChange={setPage} />
        )}
      </Col>
      <Col span={8}>{user ? <User /> : <Auth showUser={showUser} />}</Col>
    </Row>
  )
}

export default Component

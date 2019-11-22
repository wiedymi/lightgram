import React, { useState, useEffect } from 'react'
import { Col, Row, Empty } from 'antd'
import { useInfiniteScroll } from 'react-infinite-scroll-hook'
import { getFeed, subPosts } from '@/graphql'
import { LOCAL_STORAGE } from '@/constants'
import { useAccess, getData } from '@/helpers'
import { Card, User } from '@/components/base'
import { Auth } from '@/components/forms'
import { ErrorMessage, EmptyWrapper } from './styles'

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

const NewPost = () => {
  const [newPost, addNewPost] = useState([])
  const { data, loading } = subPosts()

  useEffect(() => {
    if (data && !loading) {
      const isUpdate = newPost.filter(val => {
        return val.id === data.subPosts.id
      })

      if (isUpdate.length === 0) {
        const post = data ? data.subPosts : {}
        addNewPost([...newPost, post])
      }
    }
  }, [data, loading, addNewPost])

  if (newPost.length > 0) {
    const posts = newPost.reverse().map(props => {
      return (
        <Col span={24} key={props.id}>
          <Card {...props} />
        </Col>
      )
    })

    return posts
  }

  return <></>
}

const Component = () => {
  const token = localStorage.getItem(LOCAL_STORAGE.TOKEN)
  const [user, showUser] = useState(!!token)
  const [infinityLoading, setInfinityLoading] = useState(false)

  const perPage = 2
  const { data, loading, error, fetchMore } = getFeed({
    limit: perPage,
  })

  const { isLoaded, hasAccess } = useAccess({
    permissions: {
      'go:read': true,
      'feed:read': true,
    },
  })

  const usersAccess = hasAccess('feed:read')

  const posts = getData(data, 'feed', true)

  const loadFunc = () => {
    setInfinityLoading(true)

    return fetchMore({
      variables: {
        offset: posts.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev
        }

        const prePost = getData(data, 'feed', true)
        const nextPost = getData(fetchMoreResult, 'feed', true)

        const result = {
          feed: {
            ...fetchMoreResult.feed,
            docs: [...prePost, ...nextPost],
          },
        }
        setInfinityLoading(false)
        return result
      },
    })
  }

  const infiniteRef = useInfiniteScroll({
    loading: infinityLoading,
    hasNextPage: data && data.feed ? data.feed.totalDocs !== posts.length : true,
    onLoadMore: loadFunc,
  })

  if (!usersAccess) {
    return <Emp text="No access" />
  }

  if (loading && isLoaded) {
    return <div>Loading...</div>
  }

  if (error) {
    return <ErrorMessage>Server is not available</ErrorMessage>
  }

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
          <NewPost />
          {data.feed.totalDocs > 0 ? (
            <div ref={infiniteRef}>
              {users}
              {infinityLoading && <div>Loading...</div>}
            </div>
          ) : (
            <Emp text="No posts" />
          )}
        </Row>
      </Col>
      <Col span={8}>
        {user ? <User total={data.feed.totalDocs} /> : <Auth showUser={showUser} />}
      </Col>
    </Row>
  )
}

export default Component

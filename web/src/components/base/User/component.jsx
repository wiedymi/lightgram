import React, { useState, useCallback } from 'react'
import { Post } from '@/components/forms'
import { getStats, getDefaultStats } from '@/graphql'
import * as S from './styles'

const Component = () => {
  const [formOpened, setFormOpened] = useState(false)
  const openForm = useCallback(() => {
    setFormOpened(true)
  }, [formOpened])
  const close = useCallback(() => {
    setFormOpened(false)
  }, [formOpened])
  const { data, loading } = getStats()
  const { data: defaultData, loading: defaultLoading } = getDefaultStats()
  let state = {
    users: 0,
    posts: 0,
  }

  if (!defaultLoading) {
    state = {
      ...defaultData.stats,
    }
  }

  if (!loading) {
    state = {
      ...data.stats,
    }
  }

  return (
    <S.Wrapper>
      <S.Button type="primary" size="large"
        onClick={openForm}
      >
        Create a post
      </S.Button>
      <S.Card title="Stats" size="small">
        <S.Statistic title="Users" value={state.users}
          size="small" />
        <S.Statistic title="Posts" value={state.posts}
          size="small" />
      </S.Card>
      <Post formOpened={formOpened} close={close} />
    </S.Wrapper>
  )
}

export default Component

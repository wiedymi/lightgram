import React, { useState, useCallback } from 'react'
import { Post } from '@/components/forms'
import * as S from './styles'

const Component = ({ total }) => {
  const [formOpened, setFormOpened] = useState(false)
  const openForm = useCallback(() => {
    setFormOpened(true)
  }, [formOpened])
  const close = useCallback(() => {
    setFormOpened(false)
  }, [formOpened])

  return (
    <S.Wrapper>
      <S.Button type="primary" size="large"
        onClick={openForm}
      >
        Create a post
      </S.Button>
      <S.Card title="Stats" size="small">
        <S.Statistic title="Active Users" value={1}
          size="small" />
        <S.Statistic title="Posts" value={total}
          size="small" />
      </S.Card>
      <Post formOpened={formOpened} close={close} />
    </S.Wrapper>
  )
}

export default Component

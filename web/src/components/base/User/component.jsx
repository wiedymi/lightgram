import React, { useState, useCallback } from 'react'
import { Post } from '@/components/forms'
import * as S from './styles'

const Component = ({ usename }) => {
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
      <S.Card title="wiedymi" size="small">
        <S.Statistic title="Active Users" value={1128}
          size="small" />
        <S.Statistic title="Posts" value={1128}
          size="small" />
      </S.Card>
      <Post formOpened={formOpened} close={close} />
    </S.Wrapper>
  )
}

export default Component

import styled from 'styled-components'
import { Badge as BadgeAntd, Card as CardAntd } from 'antd'

export const WrapperInfo = styled.div`
  display: flex;
  align-items: center;
`
export const CardUserInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: small;
  > * {
    margin-left: 10px;
    width: 100%;
  }
`
export const Badge = styled(BadgeAntd)`
  background-color: '#52c41a';
  font-size: unset !important;
`
export const Card = styled(CardAntd)`
  .ant-card-body {
    padding: 0px !important;
  }
`
export const CardBody = styled.div`
  padding: 12px;
`

export const CardImg = styled.img`
  width: 100%;
`

export const CardController = styled.div`
  display: flex;
  justify-content: space-around;
`

export const CotrollerItem = styled.a`
  font-size: 16px;
  transition: 0.2s ease all;
  i,
  span {
    transition: 0.2s ease all;
    color: #000;
    margin-right: 5px;
  }

  :hover {
    color: ${({ type }) => (type === 'heart' ? 'red' : '#40a9ff')};
    i,
    span {
      color: ${({ type }) => (type === 'heart' ? 'red' : '#40a9ff')};
    }
  }
`

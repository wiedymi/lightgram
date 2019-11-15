import styled from 'styled-components'
import { Pagination as Paginate } from 'antd'

export const ErrorMessage = styled.div`
  font-size: 2rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`

export const Pagination = styled(Paginate)`
  display: flex !important;
  justify-content: center !important;
  margin-top: 20px !important;
`

export const EmptyWrapper = styled.div`
  margin-top: calc(100vh - 67vh);
  display: flex;
  justify-content: center;
  width: 100%;
`

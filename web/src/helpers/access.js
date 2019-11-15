/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import deepmerge from 'deepmerge'
import { useAccess as getAccess } from 'react-access-control'
import { ACCESS } from '@/constants'

export const useAccess = (permission = ACCESS.GUEST) => {
  const { isLoaded, hasPermission, define } = getAccess()
  useEffect(() => {
    const defaultValues = deepmerge(ACCESS.GUEST, permission)

    define(defaultValues)
  }, [])

  const hasAccess = (...params) => hasPermission(...params)

  return {
    isLoaded,
    hasAccess,
  }
}

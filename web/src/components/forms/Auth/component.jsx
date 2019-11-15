import React, { useState } from 'react'
import { Card } from 'antd'
import { Login, Registration } from './components'

const Auth = ({ showUser }) => {
  const [currentForm, toggleAuthForm] = useState(false)
  const [title, setTitle] = useState(useState(false))
  return (
    <Card title={title} bordered
      size="small"
    >
      {currentForm ? (
        <Registration showUser={showUser} toggleAuthForm={toggleAuthForm}
          setTitle={setTitle} />
      ) : (
        <Login showUser={showUser} toggleAuthForm={toggleAuthForm}
          setTitle={setTitle} />
      )}
    </Card>
  )
}

export default Auth

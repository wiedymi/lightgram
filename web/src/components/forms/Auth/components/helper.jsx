import React, { useCallback } from 'react'
import { Form, Icon, Input, notification } from 'antd'
import { LOCAL_STORAGE } from '@/constants'
import { SubmitField, Button } from './styles'

const openNotificationWithIcon = type => {
  notification[type]({
    message: 'Login',
    description: 'Success',
  })
}

const createAuthFrom = (
  name,
  field,
  mutation,
  sumbitText,
  switchText,
  showFormValue,
  newFields,
) => {
  const Registration = ({ form, showUser, toggleAuthForm, setTitle }) => {
    setTitle(sumbitText)
    const [add, { data, loading, error }] = mutation()
    const handleSubmit = useCallback(
      e => {
        e.preventDefault()
        form.validateFields((err, variables) => {
          if (!err) {
            add({ variables })
          }
        })
      },
      [form],
    )
    const showForm = useCallback(() => toggleAuthForm(showFormValue), [toggleAuthForm])

    if (loading) {
      console.log('loading')
    }
    if (error) {
      console.log(error.graphQLErrors)
    }

    if (!error && !loading && data !== undefined) {
      localStorage.setItem(LOCAL_STORAGE.TOKEN, data[field].token)
      showUser(true)
      openNotificationWithIcon('success')
    }

    const { getFieldDecorator } = form

    return (
      <Form onSubmit={handleSubmit} className="registration-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username" />,
          )}
        </Form.Item>
        {newFields && (
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your Email!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="emaik"
                placeholder="Email" />,
            )}
          </Form.Item>
        )}
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password" />,
          )}
        </Form.Item>
        {error && error.graphQLErrors.map(({ message }, i) => <span key={i}>{message}</span>)}
        <SubmitField>
          <Button type="primary" htmlType="submit">
            {sumbitText}
          </Button>
          <a href="#login" onClick={showForm}>
            {switchText}
          </a>
        </SubmitField>
      </Form>
    )
  }

  const WrappedForm = Form.create({ name })(Registration)

  return WrappedForm
}

export { createAuthFrom }

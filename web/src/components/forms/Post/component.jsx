import React, { useState } from 'react'
import { Drawer, Form, Row, Col, Upload, Icon, Button, message } from 'antd'
import { createPost } from '@/graphql'

function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

const UploadImage = ({ close, setSubmit }) => {
  const [state, setState] = useState({
    loading: false,
  })
  const [addPost] = createPost()

  const handleChange = info => {
    getBase64(info.file, imageUrl =>
      setState({
        imageUrl,
        loading: false,
      }),
    )
  }

  function beforeUpload (file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }

    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }

    if (isJpgOrPng && isLt2M) {
      setSubmit(() => () => {
        addPost({ variables: { file } })
        close()
        setState({ loading: false })
      })
    }
    return false
  }

  const uploadButton = (
    <>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </>
  )

  return (
    <div className="clearfix">
      <Upload
        beforeUpload={beforeUpload}
        showUploadList={false}
        listType="picture-card"
        onChange={handleChange}
      >
        <div>
          {state.imageUrl ? (
            <img src={state.imageUrl} alt="avatar"
              style={{ width: '100%' }} />
          ) : (
            uploadButton
          )}
        </div>
      </Upload>
    </div>
  )
}

const PostForm = ({ form, formOpened, close }) => {
  const { getFieldDecorator } = form
  const [handleSubmit, setSubmit] = useState(() => ({}))

  return (
    <Form layout="vertical" hideRequiredMark>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Image">
            {getFieldDecorator('image', {
              rules: [{ required: true, message: 'Please enter user name' }],
            })(<UploadImage close={close} formOpened={formOpened}
              setSubmit={setSubmit} />)}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Button onClick={handleSubmit} type="primary"
            htmlType="submit"
          >
            Publish
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

const WrapperPostForm = Form.create({ name: 'create-a-post' })(PostForm)

const Component = ({ formOpened, close }) => {
  return (
    <Drawer
      title="Create a post"
      placement="right"
      closable
      onClose={close}
      visible={formOpened}
      width={720}
    >
      <WrapperPostForm formOpened={formOpened} close={close} />
    </Drawer>
  )
}

export default Component

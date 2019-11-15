import React, { useState } from 'react'
import { Drawer, Form, Row, Col, Modal, Upload, Icon, Button } from 'antd'
import { createPost } from '@/graphql'

function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
const PicturesWall = () => {
  const initState = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  }

  const [state, setState] = useState(initState)
  const [addPost, { data, loading }] = createPost()

  const handleCancel = () => setState({ ...state, previewVisible: false })

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    setState({
      ...state,
      previewImage: file.url || file.preview,
      previewVisible: true,
    })
  }

  const handleChange = e => {
    const [file] = e.target.files

    addPost({
      variables: { file },
    })
    setState({ ...state, fileList: e.fileList })
  }

  const { previewVisible, previewImage, fileList } = state
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  )

  const handleSubmit = async file => {
    return Promise.resolve()
  }

  return (
    <div className="clearfix">
      <Upload
        action={handleSubmit}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal visible={previewVisible} footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }}
          src={previewImage} />
      </Modal>
      <input type="file" onChange={handleChange}
        name="file" />
    </div>
  )
}

const Component = ({ form, formOpened, close }) => {
  const { getFieldDecorator } = form

  return (
    <div>
      <Drawer
        title="Create a post"
        placement="right"
        closable
        onClose={close}
        visible={formOpened}
        width={720}
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Image">
                {getFieldDecorator('image', {
                  rules: [{ required: true, message: 'Please enter user name' }],
                })(<PicturesWall />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Button onClick={close} type="primary"
                htmlType="submit"
              >
                Publish
              </Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  )
}

export default Form.create({ name: 'create-a-post' })(Component)

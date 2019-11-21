import React from 'react'
import { Drawer, Form, Row, Col, Upload, Icon, Button } from 'antd'
import { createPost } from '@/graphql'

const UploadImage = ({ close }) => {
  const [addPost, { data, loading }] = createPost()

  if (data && !loading) {
    close()
  }

  const handleSubmit = async file => {
    return addPost({ variables: { file } })
  }

  return (
    <div className="clearfix">
      <Upload action={handleSubmit} listType="picture-card" >
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">Upload</div>
        </div>
      </Upload>
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
                })(<UploadImage close={close}/>)}
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

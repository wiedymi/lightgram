import React from 'react'
import { Drawer, Form, Row, Col, Input, Modal, Upload, Icon, message, Button } from 'antd'

const { Dragger } = Upload

function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    })
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  render () {
    const { previewVisible, previewImage, fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <div className="clearfix">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }}
            src={previewImage} />
        </Modal>
      </div>
    )
  }
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

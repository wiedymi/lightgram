import React from 'react'
import ReactDOM from 'react-dom'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import Root from '@/Root'

import 'reset-css'
import 'antd/dist/antd.css'

ReactDOM.render(<Root />, document.getElementById('root'))

OfflinePluginRuntime.install()

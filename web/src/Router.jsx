import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { Feed } from '@/components/pages'
import { Header, Footer } from '@/components/base'

import { Content, Layout } from '@/theme'

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Content>
          <Switch>
            <>
              <Route exact path="/"
                component={Feed} />
            </>
          </Switch>
        </Content>
        <Footer />
      </Layout>
    </BrowserRouter>
  )
}

export default Router

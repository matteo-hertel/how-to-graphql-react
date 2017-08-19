import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import './styles/index.css'
import config from './config.js';
import { ApolloProvider, createNetworkInterface, ApolloClient } from 'react-apollo'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'

import { BrowserRouter } from 'react-router-dom'
const { GC_AUTH_TOKEN } = config;

const networkInterface = createNetworkInterface({
    uri: config.endpoint
})

const wsClient = new SubscriptionClient(config.subscriptionEndpoint, {
    reconnect: true,
    connectionParams: {
        authToken: localStorage.getItem(GC_AUTH_TOKEN),
    }
})

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient
)

networkInterface.use([{
    applyMiddleware(req, next) {
        if (!req.options.headers) {
            req.options.headers = {}
        }
        const token = localStorage.getItem(GC_AUTH_TOKEN)
        req.options.headers.authorization = token ? `Bearer ${token}` : null
        next()
    }
}])

const client = new ApolloClient({
    networkInterface: networkInterfaceWithSubscriptions
})

ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </BrowserRouter>
    , document.getElementById('root')
)
registerServiceWorker()
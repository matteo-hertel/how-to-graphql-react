const config = {
        endpoint: process.env.REACT_APP_HTGQ_ENDPOINT,
        subscriptionEndpoint: process.env.REACT_APP_HTGQ_SUBSCRIPTION_ENDPOINT,
        LINKS_PER_PAGE: (parseInt(process.env.REACT_APP_HTGQ_PER_PAGE, 1) || 2),
        GC_USER_ID: process.env.REACT_APP_HTGQ_GC_USER_ID,
        GC_AUTH_TOKEN: process.env.REACT_APP_HTGQ_GC_AUTH_TOKEN
}
export default config;
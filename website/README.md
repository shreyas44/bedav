# bedav website

All React components and service worker are in this directory.

## Contributing

For general instructions on contributing and setting up the local development environment look at [CONTRIBUTING](../CONTRIBUTING.md).

## Notes

The website is built using React as the frontend Javascript library and Apollo Client to fetch and cache data from the GraphQL API. For state management the Context API was used along with Hooks.

### PWA and Offline Capabilites

The website is a fully function Progressive Web App, which means users can add it to their Home Screen and use it *like* a native app. It's also offline first, which means content is served directly from the cache, assuming the website had been visited previously. The data is also served directly from the cache and is updated automatically by Apollo.

### Searching and Filtering

Even though Search and Filter queries can be added to the GraphQL query and processes on the server side, I found that it was much faster to process everything locally. Processing it locally also allows the features to be available when offline.

---

To learn more about making the website an Offline First PWA, check out [my blog post on Medium](https://medium.com/swlh/improving-the-user-experience-on-bedav-org-104640e3f455).

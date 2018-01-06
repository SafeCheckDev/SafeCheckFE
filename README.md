# Front-end assets for SafeCheck application

The front-end for SafeCheck is using react, webpack and babel to compile the UI.

To build, add a file called `env.js` to the view directory. Including:

```javascript
module.exports = {
  testUrl: 'enpoint.url',
  postUrl: 'post-endpoint.url'
};
```

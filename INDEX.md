# Web Chat release testing

## [01.create-react-app](/WebChat-release-testing/01.create-react-app/index.html)

Using Web Chat inside `create-react-app`.

```jsx
const App = () => <ReactWebChat ... />;
```

## [02.babel-standalone](02.babel-standalone/index.html)

Using Web Chat with `ReactDOM.render` outside of `create-react-app`.

```html
<script src=".../webchat-es5.js"></script>
<script>
  ReactDOM.render(<ReactWebChat ... />, document.getElementById('webchat'));
</script>
```

## [03.a.renderwebchat-using-es5-bundle](03.a.renderwebchat-using-es5-bundle/index.html)

Using Web Chat with `renderWebChat` with ES5 bundle.

```html
<script src=".../webchat-es5.js"></script>
<script>
  renderWebChat({ ... }, document.getElementById('webchat'));
</script>
```

## [03.b.renderwebchat-using-full-bundle](03.b.renderwebchat-using-full-bundle/index.html)

Using Web Chat with `renderWebChat` with full bundle.

```html
<script src=".../webchat.js"></script>
<script>
  renderWebChat({ ... }, document.getElementById('webchat'));
</script>
```

## [03.c.renderwebchat-using-minimal-bundle](03.c.renderwebchat-using-minimal-bundle/index.html)

Using Web Chat with `renderWebChat` with minimal bundle.

```html
<script src=".../webchat-minimal.js"></script>
<script>
  renderWebChat({ ... }, document.getElementById('webchat'));
</script>
```

## [04.renderwebchat-with-react](04.renderwebchat-with-react/index.html)

Using Web Chat with `renderWebChat` with some JSX.

```html
<script src=".../webchat-es5.js"></script>
<script>
  renderWebChat(
    {
      activityMiddleware: () => next => card => children => (
        <ActivityContainer>{next(card)(children)}</ActivityContainer>
      ),
      ...
    },
    document.getElementById('webchat')
  );
</script>
```

## [05.cdc](05.cdc/index.html)

Using Web Chat hosted like CDC.

```html
<iframe src="cdc.html"></iframe>
```

## [06.esbuild](/WebChat-release-testing/06.esbuild/index.html)

Using Web Chat bundled by ESBuild.

```jsx
const App = () => <ReactWebChat ... />;
```

## [07.a.webpack4-cjs](/WebChat-release-testing/07.a.webpack4-cjs/index.html)

Using Web Chat bundled by Webpack 4 in CJS.

```jsx
const App = () => <ReactWebChat ... />;
```

## [07.b.webpack4-esm](/WebChat-release-testing/07.b.webpack4-esm/index.html)

Using Web Chat bundled by Webpack 4 in ESM.

```jsx
const App = () => <ReactWebChat ... />;
```

## [08.webpack5](/WebChat-release-testing/08.webpack5/index.html)

Using Web Chat bundled by Webpack 5.

```jsx
const App = () => <ReactWebChat ... />;
```

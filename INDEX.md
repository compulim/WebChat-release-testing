# Web Chat release testing

## [01.create-react-app](01.create-react-app/index.html)

Using Web Chat inside `create-react-app`.

```jsx
const App = () => <ReactWebChat ... />;
```

## [02.babel-standalone](02.babel-standalone/index.html)

Using Web Chat with `ReactDOM.render` outside of `create-react-app`.

```html
<script type="text/babel" data-presets="es2015,react,stage-3">
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
<script type="text/babel" data-presets="es2015,react,stage-3">
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

## [05.renderwebchat-with-directlinespeech](05.renderwebchat-with-directlinespeech/index.html)

Using Web Chat with Direct Line Speech channel.

```html
<script>
  const adapters = await createDirectLineSpeechAdapters({ ... });

  renderWebChat({ ...adapters, ... }, document.getElementById('webchat'));
</script>
```

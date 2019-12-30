# Web Chat release testing

## What is?

Formalized directions for testing Web Chat for pre- and post-release.

## Do what?

1. Navigate to [VSTS Web Chat daily builds](https://fuselabs.visualstudio.com/BotFramework-WebChat/_build?definitionId=498)
1. Queue a new daily build (upper right corner)
1. Once the build finishes, click the Artifacts button (upper right corner)
1. Download the `cdn_files` and `tgzfiles` .zip folders
1. Extract into the root folder:
   - `webchat.js`
   - `webchat-es5.js`
1. Into `npmwebchat`:
   - `.tgz` files
1. Move to npmwebchat directory
1. Delete Web Chat and directlinespeech dependencies from `package.json`
1. `npm i microsoft-cognitiveservices-speech-sdk` package, but make sure `directlinespeech` is not using an external `.tgz`
1. `npm i botframework-directlinespeech-sdk....tgz`
1. `npm i botframework-webchat...core....tgz`
1. `npm i botframework-webchat...component....tgz`
1. `npm i botframework-webchat...tgz` (no suffix)

## Browsers, which?

- Chrome
- Edge
- Firefox
- Internet Explorer (`renderWebChat es5.js`)
- Safari (Mac)
- Safari (iOS)
- Chrome (Android)

## Commands, test?

- 'Hello world'
- Adaptive Cards
- Speech: 'Input hint expecting'
  - Should re-open mic
  - Speech from bot will be interrupted via keyboard input
  - Speech from bot will be interrupted if mic button is pressed
- Run through all Mock Bot commands

  - To do it automatically:

  ```
  const commands = [
  'card bingsports',
  'card breakfast',
  'card broken:lang',
  'card broken',
  'card flight',
  'card flighttracking',
  'card inputs',
  'card ol',
  'card markdown',
  'card reminder',
  'card restaurant',
  'card review',
  'card richmessage',
  'card simple',
  'card sportsclub',
  'card ul',
  'card weather',
  'animationcard',
  'audio',
  'audiocard',
  'card-actions',
  'carousel',
  'channel-data',
  'document-data-uri',
  'document-plain',
  'document-word',
  'dump-activity',
  'echo Hello world',
  'emptycard',
  'file',
  'herocard',
  'herocard long title',
  'image',
  'image-svg',
  'input-hint accepting',
  'input-hint expecting',
  'input-hint ignoring',
  'invalidCard',
  'layout single',
  'layout single carousel',
  'layout double',
  'layout carousel',
  'layout',
  'localization',
  'markdown',
  'content-multimedia',
  'oauth',
  'oauth signout',
  'proactive',
  'receiptcard',
  'sample:backchannel',
  'sample:github-repository',
  'sample:password-input',
  'sample:redux-middleware',
  'signin',
  'slow',
  'speech',
  'tell me a story',
  'suggested-actions',
  'text',
  'thumbnailcard',
  'thumbnailcard long title',
  'timestamp grouping',
  'typing',
  'typing 1',
  'unknown activity',
  'unknown attachment',
  'upload',
  'user',
  'user id',
  'user name',
  'video',
  'video vimeo',
  'video youtube',
  'videocard',
  'xml'
  ];
  function runCommands(commands, dispatch) {
  if (!commands.length){ return }
  const text = commands.shift();
  dispatch({
   type: 'WEB_CHAT/SEND_MESSAGE',
   payload: {
     text
   }
  });

  new Promise(function (resolve) {
   setTimeout(resolve, 3000);
  }).then(function () {
   runCommands(commands, dispatch);
  });
  }
  ```

* On the release checklist, go through manual tests... manually.

## Why.

We assume the hosting app has 4 ways to load Web Chat:

- Without React
  - Pure JavaScript: use `renderWebChat()`
  - Direct Line Speech
- With React
  - Babel
    - Use `renderWebChat()`
    - Use JSX `<ReactWebChat>`
  - `create-react-app`: use JSX `<ReactWebChat>`

In a React app, assume the hosting page will call React Hooks. Because Web Chat may not violate any rules of hooks, React will always be used/tested with Babel.

```

```

## Browsers

- All modern desktop browsers
   - Chrome, Edge UWP, Firefox, Safari on Mac
- All modern mobile browsers
   - Safari on iOS, Chrome on Android

## Steps to test

1. Web Chat is loaded
1. User can send a simple message
   - Bot will respond with a simple response
1. User can say a simple message using microphone
   - Bot will respond with a synthesized message
1. Bot can display an Adaptive Card
   - Type `card breakfast`
1. Bot can send Markdown and displayed correctly
   - Type `markdown`
1. Check `<meta>` to see the version number should be `4.7.0` and not a pre-release

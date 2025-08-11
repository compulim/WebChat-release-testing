## Steps for auto scroll snap

- [Snap on activity plus 30 pixels](index.html?customization=auto-scroll-snap&mode=activity)
  - Type and send `hello`
  - Click on the button twice to add 2 messages
  - Expect: it should stop after the second message after first line
- [Snap on page minus 30 pixels](index.html?customization=auto-scroll-snap&mode=page)
  - Type and send `hello`
  - Click on the button until it reach top of the page
  - Expect: it should stop at one line before the page filled up

> Note: user must first send a message, before the auto scroll snap would be triggered. This is because chat adapters may restore multiple pages of conversation history on load and Web Chat should not pause.

<button id="add-bot-message" type="button">Click here to add a message</button>

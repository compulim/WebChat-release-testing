## Steps to test

1. Web Chat is loaded
1. Turn on screen reader

### Button disable

1. Click on "I agree" button
   - Both the "I agree" and "I don't agree" button should no longer be focusable
   - Focus will stay on if they were focused
1. Press <kbd>TAB</kbd> should focus on the "Yes" button in the next question
   - The previous set of answer buttons should not be focusable
1. Press <kbd>CAPS</kbd> + <kbd>LEFT</kbd>/<kbd>RIGHT</kbd> should not able to jump to the disabled button

### Live region

1. When a new message arrive, the screen reader should narrate "Bot said, The purpose of the ... or enterprise. One attachment. Sent at 2020 July 13 12:34."
1. When using <kbd>CAPS</kbd> + <kbd>LEFT</kbd>/<kbd>RIGHT</kbd> to browse to the "I agree" button, it should narrate "I agree button"
   - If the cursor was previously on another question, it should say the whole question and the button. For example, "Are you in the United States right now? Yes button."

## Additional context

- [Open the IFRAME page in a new tab](iframe/index.html)

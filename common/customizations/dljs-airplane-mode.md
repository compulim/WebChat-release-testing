## Steps to test airplane mode

> This scenario emulate airplane mode by pointing to non-existing service.

1. Open <kbd>F12</kbd> console
   - It should say network error to http://localhost:0/v3/directline/conversations
1. Initially, it should say "Connecting..."
1. After about 20 seconds, it should say "Taking longer than usual to connect."

## Steps to test

1. Web Chat is loaded
1. Check `<meta>` or version table below to see the version number should be `4.8.0` and not a pre-release
1. User can send a simple message
   - Bot will respond with a simple response
1. User can say a simple message using microphone
   - Bot will respond with a synthesized message
1. Bot can display an Adaptive Card
   - Type `card breakfast`
1. Bot can send Markdown and displayed correctly
   - Type `markdown`

## Steps to test speech

1. Happy path
   1. Click microphone button and say something
   1. Expect: bot to speak
   1. Expect: microphone to turn on automatically after bot message is spoken
1. Turning off microphone
   1. Click microphone button and say something
   1. Expect: while your speech is getting recognized, the microphone button should turn red
   1. Expect: while the microphone button is red, you can click to stop it
   1. Expect: your speech interims should not be sent
1. Keyboard interruption on speech synthesis
   1. Click microphone button and say something
   1. While the bot is speaking, type something on the keyboard
   1. Expect: bot stop speaking immediately and microphone will not turn on by itself
1. Unrecognizable sound (or muted microphone)
   1. Click microphone button and do not say anything
   1. Expect: after a few seconds, the microphone button should be switched off by itself
1. Recognition behavior after synthesis of "input hint expected"
   1. On all browsers including Safari, it should open microphone again and start recognizing
   1. Click on the microphone button should interrupt the synthesis
   1. Type on the keyboard should interrupt the synthesis
1. Proactive message should be synthesized
   1. Say "proactive"
   1. Wait until both first and proactive message arrive, do not type on the keyboard in the meanwhile
   1. Expect: both the first and proactive message should be synthesized.
1. Direct Line Speech: Simple speech recognition and synthesis
   1. Say "What's the weather?"
   1. Expect: bot should say, "here is the forecast of this week."

## Additional steps

1. Test [Direct Line App Service Extension](index.html?customization=direct-line-app-service-extension) via NPM

## Steps for collect telemetry

1. Press <kbd>F12</kbd> to open development tool
1. Type something to the bot
   -  Make sure an event measurement is logged in the console
   -  `event` measurement
      ```
      {
        "name": "init",
        "dimensions": {
          "prop:locale": "en-US",
          "prop:speechRecognition": "true",
          "prop:speechSynthesis": "true",
          "capability:downscaleImage:workerType": "main"
        },
        "level": "info"
      }
      ```
1. Upload a photo (JPEG/PNG) to the bot
   -  Make sure a series of timing measurement and an event measurement is logged in the console
   -  `timingstart` measurement
      ```
      {
        "name": "sendFiles:makeThumbnail",
        "dimensions": {
          "prop:locale": "en-US",
          "prop:speechRecognition": "true",
          "prop:speechSynthesis": "true",
          "capability:downscaleImage:workerType": "main"
        }
      }
      ```
   -  `timingend` measurement
      ```
      {
        "name": "sendFiles:makeThumbnail",
        "dimensions": {
          "prop:locale": "en-US",
          "prop:speechRecognition": "true",
          "prop:speechSynthesis": "true",
          "capability:downscaleImage:workerType": "main"
        },
        "duration": 200
      }
      ```
   -  `event` measurement
      ```
      {
        "name": "sendFiles",
        "data": {
          "numFiles": 1,
          "sumSizeInKB": 544
        },
        "dimensions": {
          "prop:locale": "en-US",
          "prop:speechRecognition": "true",
          "prop:speechSynthesis": "true",
          "capability:downscaleImage:workerType": "main"
        },
        "level": "info"
      }
      ```

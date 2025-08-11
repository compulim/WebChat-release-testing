const parts = document.location.search.replace(/^\?/, '').split('&');
const search = parts.reduce((search, part) => {
  const [key, value] = part.split('=');

  search[key] = value;

  return search;
}, {});

const directLine = window.createDirectLineWithTranscript([
  {
    type: 'message',
    id: 'CONVERSATION_ID-o|00000',
    timestamp: '2000-01-23T12:34:56.12345Z',
    channelId: 'directline',
    from: {
      id: 'webchat-mockbot',
      name: 'webchat-mockbot'
    },
    conversation: {
      id: 'CONVERSATION_ID-o'
    },
    locale: 'en-US',
    suggestedActions: {
      to: [],
      actions: [
        {
          type: 'imBack',
          title: 'A',
          value: 'postback imback-string'
        },
        {
          type: 'postBack',
          title: 'B',
          image:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAK0lEQVQ4T2P8z8Dwn4GKgHHUQIpDczQMKQ5ChtEwHA1DMkJgNNmQEWhoWgBMAiftPRtHngAAAABJRU5ErkJggg==',
          value: 'postback postback-string'
        },
        {
          type: 'postBack',
          title: 'C',
          image:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAAPElEQVRIS+3SsQkAAAgDwbi5m+sQ34i8fUAuqXQmh698ELajIASMggpSAZp3gwpSAZp3gwpSAZp3g+8FF89vHgEqUcfjAAAAAElFTkSuQmCC',
          text: 'Some text',
          value: { hello: 'World!' }
        },
        {
          type: 'messageBack',
          title: 'Et cillum pariatur cillum exercitation anim voluptate.',
          image:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAoCAYAAAD+MdrbAAAAPElEQVRIS+3TMRIAAAQDweT/j6ZXhs7pKXaOpSodjjm41sRwTSgMMQwEyCZAGysYYhgIkE2AxuuRzYdsGviIT9lh+SGAAAAAAElFTkSuQmCC',
          text: 'Some text',
          displayText: 'say Hello World!',
          value: { hello: 'World!' }
        },
        {
          type: 'messageBack',
          title: 'Consequat aute non exercitation do irure in adipisicing id dolor irure.',
          image:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAK0lEQVQ4T2NsYGj4z0BFwDhqIMWhORqGFAchw2gYjoYhGSEwmmzICDQ0LQB6YCgBVqMpPAAAAABJRU5ErkJggg==',
          value: { hello: 'World!' }
        },
        {
          type: 'messageBack',
          title: 'Magna nulla deserunt voluptate ex. Ex ex in excepteur nisi et anim incididunt deserunt occaecat fugiat aute fugiat. Velit commodo sunt magna amet laborum. Nulla cillum deserunt voluptate nulla pariatur laboris dolore consectetur pariatur id.',
          image:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAK0lEQVQ4T2NsYGj4z0BFwDhqIMWhORqGFAchw2gYjoYhGSEwmmzICDQ0LQB6YCgBVqMpPAAAAABJRU5ErkJggg==',
          value: { hello: 'World!' }
        },
        {
          type: 'messageBack',
          title: 'Aliquip et eiusmod aute ut dolor.',
          image:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAWklEQVRYR+3SwQkAIBAEsbP/OqxTi5iPSPwPSG7X2XPm4bd8MF6HYAQcggSrQO1tkGAVqL0NEqwCtbdBglWg9jZIsArU3gYJVoHa2yDBKlB7GyRYBWpvg98LXjVvaaHfJTJKAAAAAElFTkSuQmCC',
          text: 'echo Hello',
          displayText: 'Aloha'
        }
      ]
    }
  }
]);

window.WebChatReleaseTesting.customizations = {
  ...window.WebChatReleaseTesting.customizations,
  createDirectLineMiddleware: () => () => () => directLine,
  patchProps: props => ({
    ...props,
    styleOptions: {
      ...props.styleOptions,
      suggestedActionLayout: 'stacked',
      suggestedActionHeight: 40,
      suggestedActionsStackedLayoutButtonTextWrap: true,

      ...(search.buttonHeight
        ? {
            suggestedActionsStackedLayoutButtonMaxHeight: 55
          }
        : {})
    }
  })
};

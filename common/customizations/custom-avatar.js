if (!window.React) {
  window.WebChatReleaseTesting.customizations = {
    ...window.WebChatReleaseTesting.customizations,
    patchProps: props => ({
      ...props,
      store: window.WebChat.createStore({}, ({ dispatch }) => {
        setTimeout(
          () =>
            dispatch({
              type: 'WEB_CHAT/SET_NOTIFICATION',
              payload: {
                id: 'not-supported',
                level: 'error',
                message: 'Custom avatar is not shown because React is not loaded in this environment.'
              }
            }),
          0
        );

        return next => action => next(action);
      }),
      styleOptions: {
        botAvatarInitials: 'WC',
        userAvatarInitials: 'WW'
      }
    })
  };
} else {
  const PortraitAvatar = ({ fromUser }) => {
    return React.createElement('img', {
      src: `../common/assets/${fromUser ? 'user.jpg' : 'bot.jpg'}`,
      style: { borderRadius: 4 }
    });
  };

  window.WebChatReleaseTesting.customizations = {
    ...window.WebChatReleaseTesting.customizations,
    patchProps: props => ({
      ...props,
      avatarMiddleware:
        () =>
        next =>
        ({ activity, fromUser, ...otherArgs }) => {
          const { text = '' } = activity;

          if (~text.indexOf('1')) {
            return false;
          } else if (~text.indexOf('2')) {
            return () => React.createElement(PortraitAvatar, { fromUser });
          }

          return next({ activity, fromUser, ...otherArgs });
        },
      styleOptions: {
        botAvatarInitials: 'WC',
        userAvatarInitials: 'WW'
      }
    })
  };
}

window.WebChatReleaseTesting.customizations = {
  ...window.WebChatReleaseTesting.customizations,
  createDirectLineMiddleware: () => next => options =>
    next({
      token: 'invalid-token'
    }),
  patchProps: props => ({
    ...props,
    store: window.WebChat.createStore({}, ({ dispatch }) => {
      setTimeout(
        () =>
          dispatch({
            type: 'WEB_CHAT/SET_NOTIFICATION',
            payload: {
              id: 'airplane-mode',
              level: 'error',
              message: 'Direct Line channel: Connecting using bad token.'
            }
          }),
        0
      );

      return next => action => next(action);
    })
  })
};

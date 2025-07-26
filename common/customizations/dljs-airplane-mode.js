window.WebChatReleaseTesting.customizations = {
  ...window.WebChatReleaseTesting.customizations,
  createDirectLineMiddleware: () => next => options =>
    next({
      ...options,
      domain: 'https://localhost:0/v3/directline'
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
              message: 'Direct Line channel: Emulating airplane mode.'
            }
          }),
        0
      );

      return next => action => next(action);
    })
  })
};

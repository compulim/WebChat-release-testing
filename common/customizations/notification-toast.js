const store = window.WebChat.createStore({}, ({ dispatch }) => next => action => {
  if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY' && action.payload.activity.from.role === 'bot') {
    dispatch({
      type: 'WEB_CHAT/SET_NOTIFICATION',
      payload: {
        id: 'incoming',
        level: 'info',
        message: 'You received an incoming message.'
      }
    });
  } else if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
    dispatch({
      type: 'WEB_CHAT/SET_NOTIFICATION',
      payload: {
        id: 'privacypolicy',
        level: 'info',
        message: 'Please read our privacy policy. Cupidatat aliquip labore fugiat duis ad. Lorem aliqua est velit duis anim magna consectetur est.'
      }
    });
  }

  return next(action);
});

window.WebChatReleaseTesting.customizations = {
  ...window.WebChatReleaseTesting.customizations,
  patchProps: props => ({
    ...props,
    store
  })
};

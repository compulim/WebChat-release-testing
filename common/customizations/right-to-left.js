const parts = document.location.search.replace(/^\?/, '').split('&');
const search = parts.reduce((search, part) => {
  const [key, value] = part.split('=');

  search[key] = value;

  return search;
}, {});

window.WebChatReleaseTesting.customizations = {
  ...window.WebChatReleaseTesting.customizations,
  patchProps: props => ({
    ...props,
    locale: 'ar-EG',
    ...(search.options === 'avatar'
      ? {
          styleOptions: {
            bubbleNubSize: 10,
            bubbleFromUserNubSize: 10,
            botAvatarInitials: 'WC',
            userAvatarInitials: 'WW'
          }
        }
      : {}),
    ...(search.options === 'no-speech' ? { webSpeechPonyfillFactory: null } : {})
  })
};

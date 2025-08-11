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
    styleOptions: {
      ...props.styleOptions,
      sendBoxButtonAlignment: search.alignment,
      sendBoxTextWrap: true
    }
  })
};

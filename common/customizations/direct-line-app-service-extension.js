const {
  WebChat: { createDirectLineAppServiceExtension }
} = window;

const { fetchDirectLineAppServiceExtensionToken } = window.createFetchTokens();

window.WebChatReleaseTesting.customizations = {
  ...window.WebChatReleaseTesting.customizations,
  patchProps: async props => {
    const token = await fetchDirectLineAppServiceExtensionToken();

    const directLine = await createDirectLineAppServiceExtension({
      domain: 'https://hawo-mockbot4-mock-bot-app.azurewebsites.net/.bot/v3/directline',
      token
    });

    return {
      ...props,
      directLine
    };
  }
};

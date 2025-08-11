const {
  WebChat: { createDirectLineSpeechAdapters }
} = window;

const { fetchDirectLineSpeechCredentials } = window.createFetchTokens();

window.WebChatReleaseTesting.customizations = {
  ...window.WebChatReleaseTesting.customizations,
  patchProps: async props => {
    const adapters = await createDirectLineSpeechAdapters({ fetchCredentials: fetchDirectLineSpeechCredentials });

    return {
      ...props,
      ...adapters
    };
  }
};

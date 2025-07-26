window.WebChatReleaseTesting.customizations = {
  ...window.WebChatReleaseTesting.customizations,
  patchProps: props => ({
    ...props,
    sendTypingIndicator: true,
    typingIndicatorMiddleware: () => () => ({ activeTyping }) => {
      activeTyping = Object.values(activeTyping);

      return (
        !!activeTyping.length &&
        `Currently typing: ${activeTyping
          .map(({ role }) => role)
          .sort()
          .join(', ')}`
      );
    }
  })
};

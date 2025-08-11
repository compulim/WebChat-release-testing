window.WebChatReleaseTesting.customizations = {
  ...window.WebChatReleaseTesting.customizations,
  patchProps: props => ({
    ...props,
    overrideLocalizedStrings: strings => ({
      ...strings,
      TRANSCRIPT_NEW_MESSAGES: `Unread message from bot`
    })
  })
};

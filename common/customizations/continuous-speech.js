window.WebChatReleaseTesting.customizations = {
  ...window.WebChatReleaseTesting.customizations,
  patchProps: async props => ({
    ...props,
    styleOptions: {
      speechRecognitionContinuous: true
    }
  })
};

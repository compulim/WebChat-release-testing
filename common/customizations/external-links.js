window.WebChatReleaseTesting.customizations = {
  ...window.WebChatReleaseTesting.customizations,
  patchProps: props => ({
    ...props,
    styleOptions: {
      ...props.styleOptions,
      adaptiveCardsParserMaxVersion: "1.2"
    }
  })
};

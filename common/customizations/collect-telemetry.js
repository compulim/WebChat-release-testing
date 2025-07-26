window.WebChatReleaseTesting.customizations = {
  ...window.WebChatReleaseTesting.customizations,
  patchProps: props => ({
    ...props,
    onTelemetry: ({ data, dimensions, duration, error, fatal, level, name, type }) => {
      console.group(`onTelemetry ("${type}")`);
      console.log({ name, data, dimensions, duration, error, fatal, level });
      console.groupEnd();
    }
  })
};

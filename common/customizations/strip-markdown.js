window.WebChatReleaseTesting.customizations = {
  ...window.WebChatReleaseTesting.customizations,
  patchProps: props => ({
    ...props,
    styleOptions: {
      ...props.styleOptions,
      internalLiveRegionFadeAfter: 600000
    }
  })
};

const styleElement = document.createElement('style');

document.head.appendChild(styleElement);

// HTMLStyleElement.sheet only available after appending it to the DOM tree.
styleElement.sheet.insertRule(
  '.webchat__basic-transcript__scrollable .webchat__screen-reader-activity {' +
    'background-color: #E00;' +
    'color: White !important;' +
    'font-family: Calibri, "Helvetica Neue", Arial, sans-serif;' +
    'height: auto !important;' +
    'margin: 10px;' +
    'opacity: 1 !important;' +
    'overflow: auto !important;' +
    'padding: 10px;' +
    'position: relative !important;' +
    'top: 0 !important;' +
    'white-space: normal !important;' +
    'width: auto !important;' +
    '}',
  0
);

styleElement.sheet.insertRule(
  '.webchat__basic-transcript__scrollable .webchat__screen-reader-activity p { margin: 0; }',
  1
);

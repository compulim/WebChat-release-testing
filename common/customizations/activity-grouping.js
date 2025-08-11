window.WebChatReleaseTesting.customizations = {
  ...window.WebChatReleaseTesting.customizations,
  patchProps: props => ({
    ...props,
    styleOptions: {
      botAvatarInitials: 'Bot',
      userAvatarInitials: 'You',
      bubbleBackground: '#F4F4F4',
      bubbleBorderColor: '#F4F4F4',
      bubbleBorderRadius: 4,
      bubbleBorderWidth: 2,
      bubbleNubOffset: 0,
      bubbleNubSize: 10,
      bubbleFromUserBackground: '#F4F4F4',
      bubbleFromUserBorderColor: '#F4F4F4',
      bubbleFromUserBorderRadius: 4,
      bubbleFromUserBorderWidth: 2,
      bubbleFromUserNubOffset: 0,
      bubbleFromUserNubSize: 10,
      groupTimestamp: 3000,
      showAvatarInGroup: 'timestamp'
    }
  })
};

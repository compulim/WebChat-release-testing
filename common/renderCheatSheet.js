const VERSION_TABLE_TEMPLATE = `
## Helpers

<button class="send-all" type="button">Send all commands</button>

## Versions

This table is generated from \`<meta>\` tags.

| Name | Version |
| - | - |
{CONTENT}
`;

function buildVersionTable() {
  return VERSION_TABLE_TEMPLATE.replace(
    '{CONTENT}',
    [].map
      .call(document.querySelectorAll('head meta[name^="bot"]'), meta => {
        return `| ${meta.name} | ${meta.content} |`;
      })
      .join('\n')
  );
}

function sleep(durationMs = 1000) {
  return new Promise(resolve => setTimeout(resolve, durationMs));
}

async function sendAllCommands() {
  const commands = [
    'card bingsports',
    'card breakfast',
    'card broken:lang',
    'card broken',
    'card flight',
    'card flighttracking',
    'card inputs',
    'card ol',
    'card markdown',
    'card reminder',
    'card restaurant',
    'card review',
    'card richmessage',
    'card simple',
    'card sportsclub',
    'card ul',
    'card weather',
    'animationcard',
    'audio',
    'audiocard',
    'card-actions',
    'carousel',
    'channel-data',
    'document-data-uri',
    'document-plain',
    'document-word',
    'dump-activity',
    'echo Hello world',
    'emptycard',
    'file',
    'herocard',
    'herocard long title',
    'image',
    'image-svg',
    'input-hint accepting',
    'input-hint expecting',
    'input-hint ignoring',
    'invalidCard',
    'layout single',
    'layout single carousel',
    'layout double',
    'layout carousel',
    'layout',
    'localization',
    'markdown',
    'content-multimedia',
    'oauth',
    'oauth signout',
    'proactive',
    'receiptcard',
    'sample:backchannel',
    'sample:github-repository',
    'sample:password-input',
    'sample:redux-middleware',
    'signin',
    'slow',
    'speech',
    'tell me a story',
    'suggested-actions',
    'text',
    'thumbnailcard',
    'thumbnailcard long title',
    'timestamp grouping',
    'typing',
    'typing 1',
    'unknown activity',
    'unknown attachment',
    'upload',
    'user',
    'user id',
    'user name',
    'video',
    'video vimeo',
    'video youtube',
    'videocard',
    'xml'
  ];

  while (commands.length) {
    const text = commands.shift();

    console.log(`Running command "${ text }"`);

    window.webChatStore.dispatch({
      type: 'WEB_CHAT/SEND_MESSAGE',
      payload: {
        text
      }
    });

    await sleep(3000);
  }
}

(async () => {
  const container = document.createElement('div');
  const content = document.createElement('div');
  const res = await fetch('README.md');
  const markdown = await res.text();
  const footerText = buildVersionTable();

  content.className = 'markdown';
  content.innerHTML = window.markdownit({ html: true }).render(markdown + '\n\n' + footerText);

  container.appendChild(content);
  container.id = 'cheat-sheet';
  container.setAttribute('aria-hidden', 'true');

  content.querySelector('button.send-all').addEventListener('click', () => {
    sendAllCommands();
  });

  document.body.appendChild(container);
})().catch(err => console.error(err));

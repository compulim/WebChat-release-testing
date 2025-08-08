const VERSION_TABLE_TEMPLATE = `
## Versions

This table is generated from \`<meta>\` tags.

| Name | Version |
| - | - |
{CONTENT}
`;

function buildVersionTable(contentDocument) {
  console.log(contentDocument);
  window.abc = contentDocument;

  return VERSION_TABLE_TEMPLATE.replace(
    '{CONTENT}',
    [].map
      .call(contentDocument.querySelectorAll('head meta[name^="bot"]'), meta => {
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

    console.log(`Running command "${text}"`);

    window.webChatStore.dispatch({
      type: 'WEB_CHAT/SEND_MESSAGE',
      payload: {
        text
      }
    });

    await sleep(3000);
  }
}

async function fetchMarkdown(url) {
  const res = await fetch(`${url}?_=${Date.now()}`);

  if (!res.ok) {
    throw new Error(`Server returned ${res.status} while fetching Markdown.`);
  }

  return await res.text();
}

window.WebChatReleaseTesting.renderCheatSheet = async ({ contentDocument = document } = {}) => {
  const container = document.createElement('div');
  const content = document.createElement('div');
  const readmeMarkdown = await fetchMarkdown('README.md');
  const customizationsMarkdown = await fetchMarkdown('../common/customizations/INDEX.md');
  const { customizationName } = window.WebChatReleaseTesting;
  const stepsMarkdown = await fetchMarkdown(
    customizationName ? `../common/customizations/${customizationName}.md` : 'STEPS.md'
  );
  const footerText = buildVersionTable(contentDocument);

  content.className = 'cheat-sheet__markdown';
  content.innerHTML = window
    .markdownit({ html: true })
    .render([readmeMarkdown, stepsMarkdown, customizationsMarkdown, footerText].join('\n\n'));

  container.appendChild(content);
  container.id = 'cheat-sheet';
  container.setAttribute('aria-hidden', 'true');

  content.querySelector('button.send-all').addEventListener('click', () => {
    sendAllCommands();
  });

  for (const button of content.querySelectorAll('button.customization')) {
    button.addEventListener('click', ({ target }) => {
      const customizationName = target.getAttribute('data-name');

      console.log(customizationName);

      if (customizationName) {
        window.location.href = `index.html?customization=${encodeURIComponent(customizationName)}`;
      } else {
        window.location.href = window.location.href.substr(
          0,
          window.location.href.length - window.location.search.length
        );
      }
    });
  }

  document.body.appendChild(container);
};

window.WebChatReleaseTesting || (window.WebChatReleaseTesting = {});

(() => {
  const parts = document.location.search.replace(/^\?/, '').split('&');
  const search = parts.reduce((search, part) => {
    const [key, value] = part.split('=');

    search[key] = value;

    return search;
  }, {});

  window.WebChatReleaseTesting.customizationName = search.customization;
})();

async function loadCustomization() {
  const { customizationName } = window.WebChatReleaseTesting;

  if (!customizationName) {
    return;
  }

  await loadScript(`../common/customizations/${customizationName}.js`);
}

async function loadScript(src) {
  const res = await fetch(`${src}?_=${Date.now()}`);

  if (!res.ok) {
    throw new Error(`Server returned ${res.status} while fetching JavaScript file.`);
  }

  const code = await res.text();

  eval(Babel.transform(code, { presets: ['es2015', 'stage-3'] }).code);
}

window.WebChatReleaseTesting.customizations = { createDirectLineMiddleware: () => next => options => next(options), patchProps: props => props };
window.WebChatReleaseTesting.loadCustomization = loadCustomization;

function createFetchDirectLineSpeechCredentials() {
  let expireAfter = 0;
  let resultPromise;

  return () => {
    if (!resultPromise || Date.now() > expireAfter) {
      expireAfter = Date.now() + 5000;
      resultPromise = fetch('https://hawo-mockbot4-token-app.blueriver-ce85e8f0.westus.azurecontainerapps.io/api/token/speech/msi', { method: 'POST' })
        .then(res => res.json())
        .then(({ region, token }) => ({ authorizationToken: token, region }))
        .catch(err => {
          expireAfter = 0;
          resultPromise = null;

          return Promise.reject(err);
        });
    }

    return resultPromise;
  };
}

function createFetchSpeechServicesCredentials() {
  let expireAfter = 0;
  let resultPromise;

  return () => {
    if (!resultPromise || Date.now() > expireAfter) {
      expireAfter = Date.now() + 5000;
      resultPromise = fetch('https://hawo-mockbot4-token-app.blueriver-ce85e8f0.westus.azurecontainerapps.io/api/token/speech/msi', { method: 'POST' })
        .then(res => res.json())
        .then(({ region, token }) => ({ authorizationToken: `Bearer ${token}`, region }))
        .catch(err => {
          expireAfter = 0;
          resultPromise = null;

          return Promise.reject(err);
        });
    }

    return resultPromise;
  };
}

window.createFetchTokens = () => {
  const fetchDirectLineSpeechCredentials = createFetchDirectLineSpeechCredentials();
  const fetchSpeechServicesCredentials = createFetchSpeechServicesCredentials();

  return {
    fetchDirectLineToken: async () => {
      const res = await fetch('https://hawo-mockbot4-token-app.blueriver-ce85e8f0.westus.azurecontainerapps.io/api/token/directline', { method: 'POST' });
      const { token } = await res.json();

      return token;
    },
    fetchDirectLineAppServiceExtensionToken: async () => {
      const res = await fetch('https://hawo-mockbot4-token-app.blueriver-ce85e8f0.westus.azurecontainerapps.io/api/token/directlinease', { method: 'POST' });
      const { token } = await res.json();

      return token;
    },
    fetchDirectLineSpeechCredentials,
    fetchSpeechServicesCredentials,
    fetchSpeechServicesRegion: async () => {
      return (await fetchSpeechServicesCredentials()).region;
    },
    fetchSpeechServicesToken: async () => {
      return (await fetchSpeechServicesCredentials()).token;
    }
  };
};

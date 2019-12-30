function createFetchDirectLineSpeechCredentials() {
  let expireAfter = 0;
  let resultPromise;

  return () => {
    if (!resultPromise || Date.now() > expireAfter) {
      expireAfter = Date.now() + 5000;
      resultPromise = fetch('https://webchat-mockbot-streaming.azurewebsites.net/speechservices/token', { method: 'POST' })
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
      resultPromise = fetch('https://webchat-mockbot.azurewebsites.net/speechservices/token', { method: 'POST' })
        .then(res => res.json())
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
      const res = await fetch('https://webchat-mockbot.azurewebsites.net/directline/token', { method: 'POST' });
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

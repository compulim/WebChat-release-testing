#!/bin/bash

rm botframework-*.tgz 2>/dev/null
rm webchat*.js 2>/dev/null

curl -LO $(npm view --json botframework-webchat-core@latest | jq -r .dist.tarball)
curl -LO $(npm view --json botframework-webchat-api@latest | jq -r .dist.tarball)
curl -LO $(npm view --json botframework-webchat-component@latest | jq -r .dist.tarball)
curl -LO $(npm view --json botframework-directlinespeech-sdk@latest | jq -r .dist.tarball)
curl -LO $(npm view --json botframework-webchat@latest | jq -r .dist.tarball)
curl -LO $(npm view --json botframework-webchat-fluent-theme@latest | jq -r .dist.tarball)

curl -L $(npm view --json botframework-webchat@latest | jq -r .dist.tarball) | tar --strip-components=2 --wildcards 'package/dist/webchat*.js' -xvz

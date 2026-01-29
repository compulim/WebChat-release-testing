#!/bin/bash

tag=$1

if [[ -z $tag ]] then
  echo Must specify tag
  exit 1
fi

echo Downloading $tag

rm botframework-*.tgz 2>/dev/null
rm webchat*.js 2>/dev/null

curl -LO $(npm view --json botframework-webchat-core@$tag | jq -r .dist.tarball)
curl -LO $(npm view --json botframework-webchat-api@$tag | jq -r .dist.tarball)
curl -LO $(npm view --json botframework-webchat-component@$tag | jq -r .dist.tarball)
curl -LO $(npm view --json botframework-directlinespeech-sdk@$tag | jq -r .dist.tarball)
curl -LO $(npm view --json botframework-webchat@$tag | jq -r .dist.tarball)
curl -LO $(npm view --json botframework-webchat-fluent-theme@$tag | jq -r .dist.tarball)

curl -L $(npm view --json botframework-webchat@$tag | jq -r .dist.tarball) | tar --strip-components=2 --wildcards 'package/dist/webchat*.js' -xvz

#!/bin/bash

set -eu

export digest=$(cat ./edge-image/digest)
export ref=$(cat ./repo/.git/short_ref)
export app_version=$(cat version/version)

pushd charts-repo

yq -i e '.image.digest = strenv(digest)' ./charts/admin-panel/values.yaml
yq -i e '.image.git_ref = strenv(ref)' ./charts/admin-panel/values.yaml
yq -i e '.appVersion = strenv(app_version)' ./charts/admin-panel/Chart.yaml

if [[ -z $(git config --global user.email) ]]; then
  git config --global user.email "bot@galoy.io"
fi
if [[ -z $(git config --global user.name) ]]; then
  git config --global user.name "CI Bot"
fi

(
  cd $(git rev-parse --show-toplevel)
  git merge --no-edit ${BRANCH}
  git add -A
  git status
  git commit -m "Bump admin-panel image to '${digest}'"
)

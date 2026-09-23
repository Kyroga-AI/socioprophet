#!/usr/bin/env bash
set -euo pipefail

# This script previously built docs, rsynced them into marketing/public/documentation/,
# and deployed the combined result via `firebase deploy --only hosting:marketing`.
# The "marketing" hosting target has been removed (marketing/ is archived, see
# marketing/ARCHIVED.md) and no longer exists in .firebaserc, so that deploy would fail.
#
# Docs still need a real deploy path — this script bundled it with marketing/, but a
# separate "docs" hosting target (public: docs/.vitepress/publish, a different build
# output than docs/.vitepress/dist used here) already exists in firebase.json and may
# already be the current docs deploy path. Which one is authoritative needs a decision
# before this script is rewritten — until then, fail loudly instead of silently doing
# partial work or deploying to a target that no longer exists.
echo "deploy-prod.sh is retired: it only deployed the now-archived marketing/ surface." >&2
echo "Decide the docs deploy path (this script's docs/.vitepress/dist + rsync approach vs. the separate 'docs' hosting target) before replacing this script." >&2
exit 1

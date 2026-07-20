#!/usr/bin/env bash
# Deploy the client-vue cockpit (the app) + the VitePress docs (socioprophet.com) to a
# Firebase env, wiring the "Launch Cockpit" link and injecting the runtime Firebase config.
#
#   ./deploy-cockpit.sh dev     # → socioprophet-web-dev-env  (validated 2026-07-11)
#   ./deploy-cockpit.sh prod    # → socioprophet-web          (production cutover)
#
# Idempotent. Requires: firebase CLI logged in (firebase login) with access to the project.
# The Firebase *web* config is public (ships in client code), fetched fresh each run — the
# repo's firebase-config.js stays empty. If a project has multiple web apps, set FIREBASE_APP_ID.
set -euo pipefail

ENV="${1:-}"
case "$ENV" in
  dev)  ALIAS=dev;  APP_SITE=socioprophet-builder-dev;  DOCS_SITE=socioprophet-web-dev-env ;;
  prod) ALIAS=prod; APP_SITE=socioprophet-builder;      DOCS_SITE=socioprophet-web ;;
  *) echo "usage: $0 <dev|prod>"; exit 1 ;;
esac
# The public URL the cockpit is served on. Override APP_URL for a custom domain
# (e.g. APP_URL=https://app.socioprophet.com ./deploy-cockpit.sh prod).
APP_URL="${APP_URL:-https://${APP_SITE}.web.app}"

HERE="$(cd "$(dirname "$0")" && pwd)"          # socioprophet-web/
ROOT="$(cd "$HERE/.." && pwd)"                  # repo root (has firebase.json + .firebaserc)
CLIENT="$HERE/client-vue"
DOCS="$ROOT/docs"
# firebase commands MUST run from the repo root so it finds firebase.json (hosting targets)
# and .firebaserc (project aliases + target→site mappings). Builds run in subshells.
cd "$ROOT"

echo "▸ env=$ENV  app-site=$APP_SITE  docs-site=$DOCS_SITE  app-url=$APP_URL"

# 1) Ensure the app hosting site exists (dev's didn't, prod's may not either). Idempotent.
firebase hosting:sites:create "$APP_SITE" --project "$ALIAS" 2>/dev/null \
  && echo "  created hosting site $APP_SITE" \
  || echo "  (site create skipped — already exists, or needs perms)"

# 2) Fetch the project's Firebase web config and write it into the build (repo source stays empty).
echo "▸ fetching Firebase web config…"
SDK="$(firebase apps:sdkconfig WEB ${FIREBASE_APP_ID:-} --project "$ALIAS" 2>/dev/null | sed -n '/{/,/}/p')"
node -e '
  const c = JSON.parse(process.argv[1]);
  const cfg = { apiKey:c.apiKey, authDomain:c.authDomain, projectId:c.projectId, storageBucket:c.storageBucket, messagingSenderId:c.messagingSenderId, appId:c.appId };
  if (!cfg.apiKey) { console.error("no apiKey in sdkconfig — is a web app registered? set FIREBASE_APP_ID"); process.exit(1); }
  process.stdout.write("window.__FIREBASE_CONFIG__ = " + JSON.stringify(cfg, null, 2) + ";\n");
' "$SDK" > /tmp/firebase-config.$$.js

# 3) Build the cockpit, inject the config, deploy the app target.
echo "▸ building cockpit…"
( cd "$CLIENT" && npm run build >/dev/null )
cp /tmp/firebase-config.$$.js "$CLIENT/dist/firebase-config.js"; rm -f /tmp/firebase-config.$$.js
firebase deploy --only hosting:app --project "$ALIAS"

# 4) Build the docs (root base, Launch Cockpit → this env's app), publish, deploy the docs target.
echo "▸ building docs…"
( cd "$DOCS" && DOCS_BASE=/ APP_URL="$APP_URL" npm run build >/dev/null )
rm -rf "$DOCS/.vitepress/publish" && cp -r "$DOCS/.vitepress/dist" "$DOCS/.vitepress/publish"
firebase deploy --only hosting:docs --project "$ALIAS"

echo "✓ deployed."
echo "  cockpit: $APP_URL"
echo "  docs:    https://${DOCS_SITE}.web.app  (Launch Cockpit → $APP_URL)"
echo
echo "REMINDER — add the app domain to Firebase Auth so Google sign-in works there:"
echo "  Firebase console → Authentication → Settings → Authorized domains → add: ${APP_SITE}.web.app"
echo "  (and your custom domain if APP_URL uses one)."

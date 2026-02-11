# SocioProphet — Global Knowledge Commons (Monorepo)

SocioProphet is building a **global knowledge commons**: an open, human-first system for sharing knowledge, tooling, and operational practice into a substrate that is **auditable**, **local-first**, and **interoperable**.

This repo is the monorepo for the web surface and the enforcement primitives that keep the commons safe as it grows (rules-as-code, emulator-backed tests, CI gates, and secret hygiene).

## Repo layout

- socioprophet-web/ — web app + Firebase/Firestore config and policy
  - client/ — frontend (webpack)
  - server/ — backend (if present/used)
  - firestore.rules / firestore.indexes.json — rules-as-code and indexes
  - firebase.json / .firebaserc — Firebase project configuration
  - test/ — emulator-backed Firestore rules tests
  - scripts/run_rules_tests.sh — deterministic runner for rules tests

- .github/ — GitHub automation (CI workflows, dependabot)
- docs/ — architecture overview and threat model

## Security posture

We harden against two failure modes that kill projects:
1) Secrets leaking into git or builds
2) Datastore rules drifting into permissive mode

We enforce:
- No secrets in git (CI scanning + local hygiene)
- Firestore rules are deny-by-default
- Rules changes must be test-backed (emulator tests locally and in CI)

See SECURITY.md for reporting and handling.

## Getting started (local dev)

Prereqs: Git, Node 20+, Java (Temurin/OpenJDK) for emulator, Yarn (client), npm (rules tests)

Already cloned:
- cd ~/dev/socioprophet
- git checkout master
- git pull --ff-only
- git status -sb

Build client:
- cd ~/dev/socioprophet/socioprophet-web/client
- yarn install
- yarn build

Runtime Firebase public config (local dev):
- cd ~/dev/socioprophet/socioprophet-web/client
- cp -n public/firebase-config.js.example public/firebase-config.js
- edit public/firebase-config.js

Firestore rules tests:
- cd ~/dev/socioprophet/socioprophet-web
- npm ci
- npm run test:rules

License: MIT (see LICENSE)

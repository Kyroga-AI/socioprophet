---
name: GitHub empty repository export
description: How to seed an empty GitHub repository before a Git-data bulk commit through the Replit connector.
---

When exporting a standalone project through the GitHub connector, seed a newly created empty repository with a trivial Contents API commit before using Git blob/tree/commit endpoints. Then create the actual initial commit as a child of that seed and fast-forward `main`.

**Why:** GitHub’s connector can reject `/git/blobs` for an entirely empty repository, even though the Git data API otherwise supports creating blobs. The first Contents API write establishes the branch/ref the bulk commit needs.

**How to apply:** For a brand-new GitHub repository, write a temporary seed file through `/contents`, get the `main` ref, create the export tree, create a commit with that ref as its parent, and PATCH the existing ref. When iterating on a temporary importer inside the CodeExecution sandbox, change the ESM import URL (for example with a query suffix) so Node does not reuse a stale module version.
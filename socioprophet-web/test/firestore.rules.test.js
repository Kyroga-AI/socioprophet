const fs = require("fs");
const path = require("path");
const test = require("node:test");
const assert = require("node:assert/strict");

const {
  initializeTestEnvironment,
  assertSucceeds,
  assertFails,
} = require("@firebase/rules-unit-testing");

// Keep aligned with the Firebase project ID
const PROJECT_ID = "socioprophet-web-dev-env";

test("Firestore rules: users/{uid} self-access only; default deny elsewhere", async (t) => {
  const testEnv = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: {
      rules: fs.readFileSync(path.join(__dirname, "..", "firestore.rules"), "utf8"),
    },
  });

  t.after(async () => {
    await testEnv.cleanup();
  });

  const alice = testEnv.authenticatedContext("alice").firestore();
  const bob = testEnv.authenticatedContext("bob").firestore();

  await assertSucceeds(alice.doc("users/alice").set({ hello: "world" }));
  await assertSucceeds(alice.doc("users/alice").get());

  await assertFails(alice.doc("users/bob").get());
  await assertFails(bob.doc("users/alice").get());

  // default deny: any other collections should be blocked
  await assertFails(alice.doc("posts/x").set({ ownerUid: "alice" }));
  await assertFails(alice.doc("anything/x").get());

  // sanity: ensure asserts ran
  assert.ok(true);
});

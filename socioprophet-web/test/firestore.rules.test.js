const fs = require("fs");
const path = require("path");
const {
  initializeTestEnvironment,
  assertSucceeds,
  assertFails,
} = require("@firebase/rules-unit-testing");

// Keep this aligned with the Firebase project ID we deploy to.
const PROJECT_ID = "socioprophet-web-dev-env";

describe("Firestore security rules (least privilege)", () => {
  let testEnv;

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: PROJECT_ID,
      firestore: {
        rules: fs.readFileSync(path.join(__dirname, "..", "firestore.rules"), "utf8"),
      },
    });
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  test("users/{uid}: owner can read/write own doc; cannot read others", async () => {
    const alice = testEnv.authenticatedContext("alice").firestore();
    const bob = testEnv.authenticatedContext("bob").firestore();

    await assertSucceeds(alice.doc("users/alice").set({ hello: "world" }));
    await assertSucceeds(alice.doc("users/alice").get());

    await assertFails(alice.doc("users/bob").get());
    await assertFails(bob.doc("users/alice").get());
  });

  test("default deny: cannot read/write arbitrary collections", async () => {
    const alice = testEnv.authenticatedContext("alice").firestore();
    await assertFails(alice.doc("posts/x").set({ ownerUid: "alice" }));
    await assertFails(alice.doc("anything/x").get());
  });
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  addConnectionRequest,
  appendMessage,
  authenticateUser,
  formatCompactNumber,
  getAllConversations,
  getConnections,
  getSavedCreatorIds,
  registerAccount,
  toggleSavedCreatorId,
  validateLogin,
  validateSignup,
} from './storage';

test('saved creators toggle adds and removes IDs cleanly', () => {
  const initial = getSavedCreatorIds();
  assert.equal(initial.includes('liam-oconnor'), false);

  const added = toggleSavedCreatorId('liam-oconnor');
  assert.equal(added.isSaved, true);
  assert.equal(added.savedIds.includes('liam-oconnor'), true);

  const removed = toggleSavedCreatorId('liam-oconnor');
  assert.equal(removed.isSaved, false);
  assert.equal(removed.savedIds.includes('liam-oconnor'), false);
});

test('connections and messaging persist across calls', () => {
  addConnectionRequest('chloe-lindqvist', 'Nordic Jacket Launch', 'Hi Chloe!');
  const conns = getConnections();
  const chloeConn = conns.find((c) => c.creatorId === 'chloe-lindqvist');
  assert.equal(Boolean(chloeConn), true);
  assert.equal(chloeConn?.status, 'pending');

  appendMessage('chloe-lindqvist', 'user', 'Looking forward to collaborating!');
  const convos = getAllConversations();
  assert.equal(convos['chloe-lindqvist']?.length, 1);
  assert.equal(convos['chloe-lindqvist']?.[0].text, 'Looking forward to collaborating!');
});

test('auth validation catches invalid fields and supports signup + login', () => {
  const badLogin = validateLogin('invalid-email', '123');
  assert.equal(badLogin.valid, false);
  assert.ok(badLogin.errors.email);
  assert.ok(badLogin.errors.password);

  const badSignup = validateSignup({
    fullName: 'A',
    email: 'test@example.com',
    password: 'short',
    accountType: 'Brand',
  });
  assert.equal(badSignup.valid, false);
  assert.ok(badSignup.errors.fullName);
  assert.ok(badSignup.errors.password);

  const reg = registerAccount({
    fullName: 'Jordan Vance',
    email: 'jordan@studio.co',
    password: 'SecurePassword99',
    accountType: 'Creator',
  });
  assert.equal(reg.ok, true);

  const auth = authenticateUser('jordan@studio.co', 'SecurePassword99');
  assert.equal(auth.ok, true);
});

test('formatCompactNumber formats thousands and millions cleanly', () => {
  assert.equal(formatCompactNumber(245000), '245K');
  assert.equal(formatCompactNumber(1250000), '1.3M');
  assert.equal(formatCompactNumber(850), '850');
});

import { DEFAULT_MATCH_PREFERENCES, MatchPreferences } from './matching';

export interface ConnectionRequest {
  creatorId: string;
  status: 'pending' | 'connected';
  campaignTitle: string;
  note: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'creator';
  text: string;
  timestamp: string;
}

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  accountType: 'Brand' | 'Creator';
  companyOrHandle: string;
  rememberMe?: boolean;
}

export interface StoredAccountRecord extends UserAccount {
  password: string;
}

export interface ActivityItem {
  id: string;
  type: 'save' | 'connect' | 'message' | 'match';
  title: string;
  detail: string;
  timestamp: string;
}

const STORAGE_KEYS = {
  SAVED: 'collabmatch_saved_creators_v1',
  CONNECTIONS: 'collabmatch_connections_v1',
  MESSAGES: 'collabmatch_messages_v1',
  PREFERENCES: 'collabmatch_preferences_v1',
  USER: 'collabmatch_current_user_v1',
  ACCOUNTS: 'collabmatch_demo_accounts_v1',
  ACTIVITIES: 'collabmatch_activities_v1',
};

const memoryFallback = new Map<string, string>();

function readRaw(key: string): string | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch {
    // Fallback below
  }
  return memoryFallback.get(key) ?? null;
}

function writeRaw(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
      return;
    }
  } catch {
    // Fallback below
  }
  memoryFallback.set(key, value);
}

function readJSON<T>(key: string, fallback: T): T {
  const raw = readRaw(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T): void {
  writeRaw(key, JSON.stringify(value));
}

const DEFAULT_SAVED_IDS = ['maya-lin', 'elena-rostova', 'kenji-takahashi'];

const DEFAULT_CONNECTIONS: ConnectionRequest[] = [
  {
    creatorId: 'maya-lin',
    status: 'connected',
    campaignTitle: 'Q4 Developer Desk Launch',
    note: 'Excited to feature your acoustic workstation series for our launch.',
    createdAt: '2026-11-11T14:20:00.000Z',
  },
  {
    creatorId: 'marcus-cole',
    status: 'pending',
    campaignTitle: 'Recovery Tracker Field Study',
    note: 'Would love to collaborate on a 3-part Zone 2 training integration.',
    createdAt: '2026-11-12T09:45:00.000Z',
  },
  {
    creatorId: 'sofia-reyes',
    status: 'connected',
    campaignTitle: 'Barrier Serum 28-Day Journal',
    note: 'Sending press kit and usage brief for next month’s drop.',
    createdAt: '2026-11-10T18:10:00.000Z',
  },
];

const DEFAULT_MESSAGES: Record<string, ChatMessage[]> = {
  'maya-lin': [
    {
      id: 'm-1',
      sender: 'user',
      text: 'Hi Maya! Loved your recent desk acoustics breakdown. Would you be open to a Q4 hardware feature?',
      timestamp: '2026-11-12T10:15:00.000Z',
    },
    {
      id: 'm-2',
      sender: 'creator',
      text: 'Thanks for reaching out! That aligns closely with my upcoming studio upgrade episode. Do you have a target publish window?',
      timestamp: '2026-11-12T10:42:00.000Z',
    },
    {
      id: 'm-3',
      sender: 'user',
      text: 'Ideally first week of December. Happy to share our creative brief and sample unit specs.',
      timestamp: '2026-11-12T11:05:00.000Z',
    },
  ],
  'sofia-reyes': [
    {
      id: 'm-4',
      sender: 'creator',
      text: 'Received the formulation deck! My audience always asks about SPF compatibility—can we include a midday reapplication clip?',
      timestamp: '2026-11-12T15:30:00.000Z',
    },
  ],
  'marcus-cole': [
    {
      id: 'm-5',
      sender: 'user',
      text: 'Hey Marcus, we sent over a collaboration request for our Recovery Tracker campaign.',
      timestamp: '2026-11-12T09:46:00.000Z',
    },
  ],
};

const DEFAULT_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'message',
    title: 'New reply from Sofia Reyes',
    detail: 'Asked about midday SPF compatibility clip for Q4 brief.',
    timestamp: '2026-11-12T15:30:00.000Z',
  },
  {
    id: 'act-2',
    type: 'connect',
    title: 'Collaboration request sent to Marcus Cole',
    detail: 'Recovery Tracker Field Study · Pending creator confirmation',
    timestamp: '2026-11-12T09:45:00.000Z',
  },
  {
    id: 'act-3',
    type: 'save',
    title: 'Saved Kenji Takahashi to shortlist',
    detail: 'Food · 278K followers · 6.5% engagement',
    timestamp: '2026-11-11T17:20:00.000Z',
  },
];

export function getSavedCreatorIds(): string[] {
  const existing = readRaw(STORAGE_KEYS.SAVED);
  if (existing === null) {
    writeJSON(STORAGE_KEYS.SAVED, DEFAULT_SAVED_IDS);
    return [...DEFAULT_SAVED_IDS];
  }
  return readJSON<string[]>(STORAGE_KEYS.SAVED, DEFAULT_SAVED_IDS);
}

export function toggleSavedCreatorId(creatorId: string): {
  savedIds: string[];
  isSaved: boolean;
} {
  const current = getSavedCreatorIds();
  const exists = current.includes(creatorId);
  const next = exists
    ? current.filter((id) => id !== creatorId)
    : [creatorId, ...current];
  writeJSON(STORAGE_KEYS.SAVED, next);
  return { savedIds: next, isSaved: !exists };
}

export function getConnections(): ConnectionRequest[] {
  const existing = readRaw(STORAGE_KEYS.CONNECTIONS);
  if (existing === null) {
    writeJSON(STORAGE_KEYS.CONNECTIONS, DEFAULT_CONNECTIONS);
    return [...DEFAULT_CONNECTIONS];
  }
  return readJSON<ConnectionRequest[]>(STORAGE_KEYS.CONNECTIONS, DEFAULT_CONNECTIONS);
}

export function addConnectionRequest(
  creatorId: string,
  campaignTitle: string,
  note: string
): ConnectionRequest[] {
  const current = getConnections();
  const existingIndex = current.findIndex((c) => c.creatorId === creatorId);
  const entry: ConnectionRequest = {
    creatorId,
    status: 'pending',
    campaignTitle: campaignTitle.trim() || 'Brand Collaboration Inquiry',
    note: note.trim(),
    createdAt: new Date().toISOString(),
  };
  const next =
    existingIndex >= 0
      ? current.map((item, idx) => (idx === existingIndex ? entry : item))
      : [entry, ...current];
  writeJSON(STORAGE_KEYS.CONNECTIONS, next);
  return next;
}

export function getAllConversations(): Record<string, ChatMessage[]> {
  const existing = readRaw(STORAGE_KEYS.MESSAGES);
  if (existing === null) {
    writeJSON(STORAGE_KEYS.MESSAGES, DEFAULT_MESSAGES);
    return { ...DEFAULT_MESSAGES };
  }
  return readJSON<Record<string, ChatMessage[]>>(STORAGE_KEYS.MESSAGES, DEFAULT_MESSAGES);
}

export function appendMessage(
  creatorId: string,
  sender: 'user' | 'creator',
  text: string
): Record<string, ChatMessage[]> {
  const all = getAllConversations();
  const thread = all[creatorId] ?? [];
  const nextMsg: ChatMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    sender,
    text: text.trim(),
    timestamp: new Date().toISOString(),
  };
  const nextAll = {
    ...all,
    [creatorId]: [...thread, nextMsg],
  };
  writeJSON(STORAGE_KEYS.MESSAGES, nextAll);
  return nextAll;
}

export function getMatchPreferences(): MatchPreferences {
  return readJSON<MatchPreferences>(
    STORAGE_KEYS.PREFERENCES,
    DEFAULT_MATCH_PREFERENCES
  );
}

export function saveMatchPreferences(prefs: MatchPreferences): void {
  writeJSON(STORAGE_KEYS.PREFERENCES, prefs);
}

export function getActivities(): ActivityItem[] {
  const existing = readRaw(STORAGE_KEYS.ACTIVITIES);
  if (existing === null) {
    writeJSON(STORAGE_KEYS.ACTIVITIES, DEFAULT_ACTIVITIES);
    return [...DEFAULT_ACTIVITIES];
  }
  return readJSON<ActivityItem[]>(STORAGE_KEYS.ACTIVITIES, DEFAULT_ACTIVITIES);
}

export function addActivity(
  type: ActivityItem['type'],
  title: string,
  detail: string
): ActivityItem[] {
  const current = getActivities();
  const next: ActivityItem[] = [
    {
      id: `act-${Date.now()}`,
      type,
      title,
      detail,
      timestamp: new Date().toISOString(),
    },
    ...current,
  ].slice(0, 15);
  writeJSON(STORAGE_KEYS.ACTIVITIES, next);
  return next;
}

const DEMO_ACCOUNT: StoredAccountRecord = {
  id: 'demo-brand-1',
  fullName: 'Claire Bennett',
  email: 'claire@northstarlabs.io',
  password: 'Password123',
  accountType: 'Brand',
  companyOrHandle: 'Northstar Labs',
};

export function getRegisteredAccounts(): StoredAccountRecord[] {
  const existing = readRaw(STORAGE_KEYS.ACCOUNTS);
  if (existing === null) {
    writeJSON(STORAGE_KEYS.ACCOUNTS, [DEMO_ACCOUNT]);
    return [DEMO_ACCOUNT];
  }
  return readJSON<StoredAccountRecord[]>(STORAGE_KEYS.ACCOUNTS, [DEMO_ACCOUNT]);
}

export function getCurrentUser(): UserAccount | null {
  return readJSON<UserAccount | null>(STORAGE_KEYS.USER, null);
}

export function logoutUser(): void {
  writeJSON(STORAGE_KEYS.USER, null);
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validateLogin(email: string, password: string): {
  valid: boolean;
  errors: { email?: string; password?: string };
} {
  const errors: { email?: string; password?: string } = {};
  if (!email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!validateEmail(email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateSignup(input: {
  fullName: string;
  email: string;
  password: string;
  accountType: 'Brand' | 'Creator';
}): {
  valid: boolean;
  errors: { fullName?: string; email?: string; password?: string };
} {
  const errors: { fullName?: string; email?: string; password?: string } = {};
  if (!input.fullName.trim() || input.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.';
  }
  if (!input.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!validateEmail(input.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!input.password) {
    errors.password = 'Password is required.';
  } else if (input.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

export function registerAccount(input: {
  fullName: string;
  email: string;
  password: string;
  accountType: 'Brand' | 'Creator';
  companyOrHandle?: string;
}): { ok: true; user: UserAccount } | { ok: false; error: string } {
  const accounts = getRegisteredAccounts();
  const normalizedEmail = input.email.trim().toLowerCase();
  if (accounts.some((acc) => acc.email.toLowerCase() === normalizedEmail)) {
    return { ok: false, error: 'An account with this email already exists.' };
  }
  const newAccount: StoredAccountRecord = {
    id: `user-${Date.now()}`,
    fullName: input.fullName.trim(),
    email: normalizedEmail,
    password: input.password,
    accountType: input.accountType,
    companyOrHandle:
      input.companyOrHandle?.trim() ||
      (input.accountType === 'Brand' ? 'Partner Brand' : '@creator'),
  };
  writeJSON(STORAGE_KEYS.ACCOUNTS, [...accounts, newAccount]);
  const publicUser: UserAccount = {
    id: newAccount.id,
    fullName: newAccount.fullName,
    email: newAccount.email,
    accountType: newAccount.accountType,
    companyOrHandle: newAccount.companyOrHandle,
  };
  writeJSON(STORAGE_KEYS.USER, publicUser);
  return { ok: true, user: publicUser };
}

export function authenticateUser(
  email: string,
  password: string,
  rememberMe = true
): { ok: true; user: UserAccount } | { ok: false; error: string } {
  const accounts = getRegisteredAccounts();
  const normalizedEmail = email.trim().toLowerCase();
  const found = accounts.find(
    (acc) => acc.email.toLowerCase() === normalizedEmail && acc.password === password
  );
  if (!found) {
    return {
      ok: false,
      error: 'Invalid email or password. Try the demo account or create a new profile.',
    };
  }
  const publicUser: UserAccount = {
    id: found.id,
    fullName: found.fullName,
    email: found.email,
    accountType: found.accountType,
    companyOrHandle: found.companyOrHandle,
    rememberMe,
  };
  writeJSON(STORAGE_KEYS.USER, publicUser);
  return { ok: true, user: publicUser };
}

export function formatCompactNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return num.toString();
}

export function formatTimestamp(isoString: string): string {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function formatShortDate(isoString: string): string {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

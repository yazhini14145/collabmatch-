import React, { createContext, useCallback, useContext, useState } from 'react';
import { CREATORS, Creator } from '../data/creators';
import { MatchPreferences } from '../utils/matching';
import {
  ActivityItem,
  ChatMessage,
  ConnectionRequest,
  UserAccount,
  addActivity,
  addConnectionRequest,
  appendMessage,
  authenticateUser,
  getActivities,
  getAllConversations,
  getConnections,
  getCurrentUser,
  getMatchPreferences,
  getSavedCreatorIds,
  logoutUser,
  registerAccount,
  saveMatchPreferences,
  toggleSavedCreatorId,
} from '../utils/storage';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  description?: string;
}

interface AppContextValue {
  creators: Creator[];
  savedIds: string[];
  connections: ConnectionRequest[];
  conversations: Record<string, ChatMessage[]>;
  preferences: MatchPreferences;
  currentUser: UserAccount | null;
  activities: ActivityItem[];
  toasts: ToastMessage[];
  showToast: (title: string, description?: string, type?: ToastMessage['type']) => void;
  dismissToast: (id: string) => void;
  toggleSave: (creator: Creator) => void;
  sendConnectionRequest: (creator: Creator, campaignTitle: string, note: string) => void;
  sendMessage: (creatorId: string, text: string) => void;
  updatePreferences: (next: MatchPreferences) => void;
  login: (
    email: string,
    password: string,
    rememberMe?: boolean
  ) => { ok: true; user: UserAccount } | { ok: false; error: string };
  signup: (input: {
    fullName: string;
    email: string;
    password: string;
    accountType: 'Brand' | 'Creator';
    companyOrHandle?: string;
  }) => { ok: true; user: UserAccount } | { ok: false; error: string };
  logout: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

const CREATOR_AUTO_REPLIES: Record<string, string> = {
  'maya-lin':
    'Thanks for the message! I reviewed your product notes and can send over my Q4 availability and rate sheet today.',
  'marcus-cole':
    'Appreciate you reaching out! That training angle fits my upcoming mobility series really well.',
  'elena-rostova':
    'Bonjour! Thank you for sharing the brief—let me review the styling timeline and get back to you with lookbook concepts.',
  'arjun-mehta':
    'Great to connect. Happy to walk through audience conversion benchmarks from recent fintech partnerships.',
  'sofia-reyes':
    'So excited about this! I always do a 2-week product test before filming—happy to share dates.',
  'kenji-takahashi':
    'Thank you! Let me know your preferred deliverable format so I can suggest a seasonal recipe concept.',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedIds, setSavedIds] = useState<string[]>(() => getSavedCreatorIds());
  const [connections, setConnections] = useState<ConnectionRequest[]>(() => getConnections());
  const [conversations, setConversations] = useState<Record<string, ChatMessage[]>>(() =>
    getAllConversations()
  );
  const [preferences, setPreferences] = useState<MatchPreferences>(() => getMatchPreferences());
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => getCurrentUser());
  const [activities, setActivities] = useState<ActivityItem[]>(() => getActivities());
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const showToast = useCallback(
    (title: string, description?: string, type: ToastMessage['type'] = 'success') => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setToasts((prev) => [...prev, { id, type, title, description }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((item) => item.id !== id));
      }, 3800);
    },
    []
  );

  const toggleSave = useCallback(
    (creator: Creator) => {
      const res = toggleSavedCreatorId(creator.id);
      setSavedIds(res.savedIds);
      if (res.isSaved) {
        const nextActs = addActivity(
          'save',
          `Saved ${creator.name} to shortlist`,
          `${creator.category} · ${creator.engagementRate}% engagement`
        );
        setActivities(nextActs);
        showToast('Creator saved', `${creator.name} was added to your shortlist.`);
      } else {
        showToast('Removed from saved', `${creator.name} was removed from your shortlist.`, 'info');
      }
    },
    [showToast]
  );

  const sendConnectionRequest = useCallback(
    (creator: Creator, campaignTitle: string, note: string) => {
      const nextConnections = addConnectionRequest(creator.id, campaignTitle, note);
      setConnections(nextConnections);

      if (note.trim()) {
        const nextConvos = appendMessage(
          creator.id,
          'user',
          `[${campaignTitle || 'Collaboration Request'}] ${note}`
        );
        setConversations(nextConvos);
      }

      const nextActs = addActivity(
        'connect',
        `Collaboration request sent to ${creator.name}`,
        `${campaignTitle || 'Brand Partnership'} · Pending response`
      );
      setActivities(nextActs);
      showToast(
        'Collaboration request sent',
        `${creator.name} typically responds ${creator.responseTime.toLowerCase()}.`
      );
    },
    [showToast]
  );

  const sendMessage = useCallback(
    (creatorId: string, text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const creator = CREATORS.find((c) => c.id === creatorId);
      const nextConvos = appendMessage(creatorId, 'user', trimmed);
      setConversations(nextConvos);

      if (creator) {
        const nextActs = addActivity(
          'message',
          `Sent message to ${creator.name}`,
          trimmed.length > 64 ? `${trimmed.slice(0, 61)}...` : trimmed
        );
        setActivities(nextActs);
      }

      // Simulated prototype response for realistic interactive flow
      window.setTimeout(() => {
        const replyText =
          CREATOR_AUTO_REPLIES[creatorId] ??
          `Thanks for reaching out! I received your note and would love to discuss collaboration deliverables and timeline.`;
        const afterReply = appendMessage(creatorId, 'creator', replyText);
        setConversations(afterReply);
      }, 900);
    },
    []
  );

  const updatePreferences = useCallback((next: MatchPreferences) => {
    setPreferences(next);
    saveMatchPreferences(next);
  }, []);

  const login = useCallback(
    (email: string, password: string, rememberMe = true) => {
      const res = authenticateUser(email, password, rememberMe);
      if (res.ok) {
        setCurrentUser(res.user);
        showToast('Signed in', `Welcome back, ${res.user.fullName}.`);
      }
      return res;
    },
    [showToast]
  );

  const signup = useCallback(
    (input: {
      fullName: string;
      email: string;
      password: string;
      accountType: 'Brand' | 'Creator';
      companyOrHandle?: string;
    }) => {
      const res = registerAccount(input);
      if (res.ok) {
        setCurrentUser(res.user);
        showToast('Account created', `Your ${res.user.accountType} workspace is ready.`);
      }
      return res;
    },
    [showToast]
  );

  const logout = useCallback(() => {
    logoutUser();
    setCurrentUser(null);
    showToast('Signed out', 'You have been signed out of CollabMatch.', 'info');
  }, [showToast]);

  return (
    <AppContext.Provider
      value={{
        creators: CREATORS,
        savedIds,
        connections,
        conversations,
        preferences,
        currentUser,
        activities,
        toasts,
        showToast,
        dismissToast,
        toggleSave,
        sendConnectionRequest,
        sendMessage,
        updatePreferences,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used inside AppProvider');
  }
  return ctx;
}

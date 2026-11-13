import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MessageSquare, Send } from 'lucide-react';
import { resolveCreatorAvatar } from '../data/creatorMedia';
import { formatTimestamp } from '../utils/storage';
import { useApp } from '../context/AppContext';
import { WorkspaceShell } from '../components/Sidebar';
import { SafeImage } from '../components/SafeImage';

export const Messages: React.FC = () => {
  const { creators, conversations, connections, sendMessage } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedCreatorId = searchParams.get('creator');

  const orderedCreators = useMemo(() => {
    return [...creators].sort((a, b) => {
      const aCount = conversations[a.id]?.length ?? 0;
      const bCount = conversations[b.id]?.length ?? 0;
      if (aCount > 0 && bCount === 0) return -1;
      if (bCount > 0 && aCount === 0) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [creators, conversations]);

  const [selectedId, setSelectedId] = useState<string>(() => {
    if (requestedCreatorId && creators.some((c) => c.id === requestedCreatorId)) {
      return requestedCreatorId;
    }
    const firstActive = orderedCreators.find((c) => (conversations[c.id]?.length ?? 0) > 0);
    return firstActive?.id ?? orderedCreators[0]?.id ?? '';
  });

  const [draft, setDraft] = useState('');

  useEffect(() => {
    if (requestedCreatorId && creators.some((c) => c.id === requestedCreatorId)) {
      setSelectedId(requestedCreatorId);
    }
  }, [requestedCreatorId, creators]);

  const activeCreator = creators.find((c) => c.id === selectedId);
  const activeMessages = conversations[selectedId] ?? [];
  const activeConnection = connections.find((c) => c.creatorId === selectedId);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setSearchParams({ creator: id });
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim() || !selectedId) return;
    sendMessage(selectedId, draft);
    setDraft('');
  };

  return (
    <WorkspaceShell title="Messages & Connections">
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Collaboration Inbox</h1>
          <p className="page-subtitle">
            Coordinate briefs, deliverables, and campaign timelines with matched creators.
          </p>
        </div>
      </div>

      <section className="messages-shell" aria-label="Messaging workspace">
        <aside className="messages-sidebar">
          <div className="messages-sidebar-head">
            <div style={{ fontWeight: 700, fontSize: 15 }}>Creators</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
              {Object.keys(conversations).length} active conversations
            </div>
          </div>

          <div className="conversation-list">
            {orderedCreators.map((creator) => {
              const thread = conversations[creator.id] ?? [];
              const lastMsg = thread[thread.length - 1];
              const isSelected = creator.id === selectedId;
              return (
                <button
                  key={creator.id}
                  type="button"
                  className={`conversation-item ${isSelected ? 'active' : ''}`}
                  onClick={() => handleSelect(creator.id)}
                >
                  <SafeImage
                    src={resolveCreatorAvatar(creator.id, creator.avatar)}
                    alt={`${creator.name} avatar`}
                    className="conversation-avatar"
                    fallbackText={creator.name}
                  />
                  <div className="conversation-meta">
                    <div className="conversation-top">
                      <span className="conversation-name">{creator.name}</span>
                      {lastMsg && (
                        <span className="conversation-time tabular-nums">
                          {formatTimestamp(lastMsg.timestamp)}
                        </span>
                      )}
                    </div>
                    <div className="conversation-snippet">
                      {lastMsg
                        ? lastMsg.text
                        : `${creator.category} · ${creator.platform}`}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        <div className="chat-pane">
          {activeCreator ? (
            <>
              <div className="chat-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <SafeImage
                    src={resolveCreatorAvatar(activeCreator.id, activeCreator.avatar)}
                    alt={`${activeCreator.name} portrait`}
                    className="conversation-avatar"
                    fallbackText={activeCreator.name}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{activeCreator.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                      {activeCreator.username} · {activeCreator.category} · Est.{' '}
                      {activeCreator.budgetRange}
                      {activeConnection ? ` · ${activeConnection.status}` : ''}
                    </div>
                  </div>
                </div>

                <Link
                  to={`/creator/${activeCreator.id}`}
                  className="btn btn-secondary btn-sm"
                >
                  View Profile
                </Link>
              </div>

              <div className="chat-prototype-note">
                Simulated collaboration messaging prototype — messages are saved locally in your
                browser.
              </div>

              <div className="chat-thread" data-testid="chat-thread">
                {activeMessages.length === 0 ? (
                  <div
                    style={{
                      margin: 'auto',
                      textAlign: 'center',
                      maxWidth: 340,
                      padding: '28px 16px',
                    }}
                  >
                    <div
                      className="empty-state-icon"
                      style={{ margin: '0 auto 12px' }}
                      aria-hidden="true"
                    >
                      <MessageSquare size={22} />
                    </div>
                    <div style={{ fontWeight: 700, marginBottom: 6 }}>
                      Start a conversation with {activeCreator.name}
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
                      Introduce your brand campaign, share target deliverables, and align on
                      timelines.
                    </p>
                  </div>
                ) : (
                  activeMessages.map((msg) => (
                    <div key={msg.id} className={`chat-bubble-row ${msg.sender}`}>
                      <div className="chat-bubble">{msg.text}</div>
                      <span className="chat-timestamp tabular-nums">
                        {msg.sender === 'user' ? 'You' : activeCreator.name} ·{' '}
                        {formatTimestamp(msg.timestamp)}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <form className="chat-composer" onSubmit={handleSend}>
                <label htmlFor="chat-message-input" className="sr-only">
                  Message {activeCreator.name}
                </label>
                <input
                  id="chat-message-input"
                  type="text"
                  className="form-input"
                  placeholder={`Write a message to ${activeCreator.name}...`}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                />
                <button type="submit" className="btn btn-primary" aria-label="Send message">
                  <Send size={15} />
                  <span>Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="empty-state-card" style={{ border: 'none', margin: 'auto' }}>
              <h2>Select a creator to view messages</h2>
            </div>
          )}
        </div>
      </section>
    </WorkspaceShell>
  );
};

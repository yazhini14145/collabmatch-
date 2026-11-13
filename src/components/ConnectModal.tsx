import React, { useState } from 'react';
import { Creator } from '../data/creators';
import { useApp } from '../context/AppContext';
import { Modal } from './Modal';

interface ConnectModalProps {
  creator: Creator | null;
  onClose: () => void;
}

export const ConnectModal: React.FC<ConnectModalProps> = ({ creator, onClose }) => {
  const { sendConnectionRequest } = useApp();
  const [campaignTitle, setCampaignTitle] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  if (!creator) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignTitle.trim()) {
      setError('Please enter a campaign or project title.');
      return;
    }
    if (!note.trim() || note.trim().length < 10) {
      setError('Please include a brief collaboration message (at least 10 characters).');
      return;
    }
    sendConnectionRequest(creator, campaignTitle, note);
    setCampaignTitle('');
    setNote('');
    setError('');
    onClose();
  };

  return (
    <Modal
      isOpen={Boolean(creator)}
      onClose={onClose}
      title={`Collaborate with ${creator.name}`}
      subtitle={`${creator.category} · ${creator.platform} · Est. ${creator.budgetRange}`}
    >
      <form onSubmit={handleSubmit} noValidate>
        {error && <div className="auth-alert error">{error}</div>}

        <div className="form-group">
          <label htmlFor="campaign-title" className="form-label">
            Campaign or Launch Title
          </label>
          <input
            id="campaign-title"
            type="text"
            className="form-input"
            placeholder="e.g. Q4 Product Launch Feature"
            value={campaignTitle}
            onChange={(e) => {
              setCampaignTitle(e.target.value);
              setError('');
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="collab-note" className="form-label">
            Introduction & Deliverables
          </label>
          <textarea
            id="collab-note"
            className="form-textarea"
            placeholder={`Share your goals, timeline, and why ${creator.name} fits your brand...`}
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
              setError('');
            }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Send Request
          </button>
        </div>
      </form>
    </Modal>
  );
};

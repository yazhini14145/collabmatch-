import React from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-stack" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-item">
          <span className={`toast-icon ${toast.type}`} aria-hidden="true">
            {toast.type === 'success' && <CheckCircle2 size={18} />}
            {toast.type === 'info' && <Info size={18} />}
            {toast.type === 'error' && <AlertCircle size={18} />}
          </span>
          <div style={{ flex: 1 }}>
            <div className="toast-title">{toast.title}</div>
            {toast.description && <div className="toast-desc">{toast.description}</div>}
          </div>
          <button
            type="button"
            className="btn-ghost"
            style={{ padding: 4, border: 'none', borderRadius: 6 }}
            onClick={() => dismissToast(toast.id)}
            aria-label={`Dismiss ${toast.title}`}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

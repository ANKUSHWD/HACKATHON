import { X, Bell, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const typeConfig = {
  success: { icon: CheckCircle, color: '#22c55e', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.2)' },
  warning: { icon: AlertTriangle, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)' },
  info: { icon: Info, color: '#4f7dff', bg: 'rgba(79,125,255,0.1)', border: 'rgba(79,125,255,0.2)' },
  error: { icon: X, color: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.2)' },
};

export default function NotificationToast({ notifications, onDismiss }) {
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 360,
    }}>
      {notifications.map((n) => {
        const conf = typeConfig[n.type] || typeConfig.info;
        const Icon = conf.icon;
        return (
          <div
            key={n.id}
            style={{
              padding: '14px 16px',
              background: 'rgba(13,13,43,0.95)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${conf.border}`,
              borderRadius: 12,
              boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
              display: 'flex', gap: 12, alignItems: 'flex-start',
              animation: 'slideInToast 0.3s ease',
              minWidth: 300,
            }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: conf.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon size={16} color={conf.color} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, color: '#d0d0e8', lineHeight: 1.5 }}>{n.message}</p>
              <p style={{ fontSize: 11, color: '#444466', marginTop: 4 }}>
                {new Date(n.timestamp).toLocaleTimeString()}
              </p>
            </div>
            <button
              onClick={() => onDismiss(n.id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#444466', padding: 2, lineHeight: 0, flexShrink: 0,
              }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
      <style>{`
        @keyframes slideInToast {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

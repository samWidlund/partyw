interface ApiStatusProps {
  isConnected: boolean
}

export function ApiStatus({ isConnected }: ApiStatusProps) {
  return (
    <div className="ai-badge">
      <svg className="sparkle-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"/>
      </svg>
      <span>AI-baserat</span>
      <span className={`api-status ${isConnected ? 'connected' : 'disconnected'}`}>
        <span className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`}></span>
        {isConnected ? 'Ansluten' : 'Offline'}
      </span>
    </div>
  )
}

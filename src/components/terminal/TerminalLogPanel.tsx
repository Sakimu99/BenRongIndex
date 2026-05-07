import type { DashboardLog } from '../../types/dashboard';

type TerminalLogPanelProps = {
  logs: DashboardLog[];
};

export const TerminalLogPanel = ({ logs }: TerminalLogPanelProps) => {
  return (
    <div className="terminal-shell">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <span className="terminal-title">runtime-console / lending-homepage</span>
      </div>
      <div className="terminal-body">
        {logs.map((log) => (
          <div key={`${log.time}-${log.message}`} className={`terminal-line ${log.level.toLowerCase()}`}>
            <span className="terminal-time">[{log.time}]</span>
            <span className="terminal-level">{log.level}</span>
            <span className="terminal-message">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

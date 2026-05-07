import type { DashboardLog, DashboardLogLevel } from '../../types/dashboard';

type TerminalLogPanelProps = {
  logs: DashboardLog[];
};

const levelLabels: Record<DashboardLogLevel, string> = {
  INFO: '同步中',
  WARN: '待关注',
  SUCCESS: '已完成',
};

export const TerminalLogPanel = ({ logs }: TerminalLogPanelProps) => {
  const summary = logs.reduce(
    (acc, log) => {
      acc[log.level] += 1;
      return acc;
    },
    { INFO: 0, WARN: 0, SUCCESS: 0 },
  );

  return (
    <div className="terminal-shell">
      <div className="terminal-header">
        <div>
          <span className="terminal-badge">运行摘要</span>
          <strong className="terminal-heading">首页状态概览</strong>
        </div>
        <span className="terminal-title">最近同步</span>
      </div>
      <div className="terminal-summary">
        <div>
          <small>状态条目</small>
          <strong>{logs.length}</strong>
        </div>
        <div>
          <small>同步完成</small>
          <strong>{summary.SUCCESS}</strong>
        </div>
        <div>
          <small>待关注</small>
          <strong>{summary.WARN}</strong>
        </div>
      </div>
      <div className="terminal-body">
        {logs.map((log) => (
          <div key={`${log.time}-${log.message}`} className={`terminal-line ${log.level.toLowerCase()}`}>
            <span className="terminal-time">{log.time}</span>
            <span className="terminal-level">{levelLabels[log.level]}</span>
            <span className="terminal-message">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

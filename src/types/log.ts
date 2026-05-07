export type TerminalLine = {
  time: string;
  level: 'INFO' | 'WARN' | 'SUCCESS';
  message: string;
};

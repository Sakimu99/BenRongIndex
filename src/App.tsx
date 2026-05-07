import { ConfigProvider, theme } from 'antd';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#D6B36A',
          colorInfo: '#6DA8FF',
          borderRadius: 18,
          fontFamily: '"Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',
        },
      }}
    >
      <HomePage />
    </ConfigProvider>
  );
}

export default App;

import { ConfigProvider, theme } from 'antd';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#B58A36',
          colorInfo: '#4F7DDC',
          borderRadius: 16,
          fontFamily: '"Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',
        },
      }}
    >
      <HomePage />
    </ConfigProvider>
  );
}

export default App;

import { ConfigProvider, App as AntdApp } from 'antd';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './pages';
import { themeConfig } from './utils/theme';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <ConfigProvider
      theme={themeConfig}
      drawer={{ mask: { blur: false } }}
      modal={{ mask: { blur: false } }}
    >
      <AntdApp>
        <div className="app-container">
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </div>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;

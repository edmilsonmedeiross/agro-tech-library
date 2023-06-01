'use client';
import { Spin } from 'antd';

const LoadingScreen = () => {
  
  return (
    <div className="flex items-center justify-center h-screen">
      <Spin size="large" />
    </div>
  );
};

export default LoadingScreen;

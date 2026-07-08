import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import { useState, useEffect } from "react";
import { AuthContext } from '@/contexts/authContext';
import { motion } from 'framer-motion';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRightClickToast, setShowRightClickToast] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  // 处理右键点击事件
  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault(); // 阻止默认的右键菜单
    setShowRightClickToast(true);
    
    // 3秒后自动隐藏提示
    setTimeout(() => {
      setShowRightClickToast(false);
    }, 3000);
  };

  // 添加和移除事件监听器
  useEffect(() => {
    document.addEventListener('contextmenu', handleContextMenu);
    
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      {/* 右键提示组件 */}
      {showRightClickToast && (
        <motion.div
          className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-black/70 text-white py-2 px-4 rounded-b-lg text-sm z-50 shadow-lg backdrop-blur-sm"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut"
          }}
          style={{ width: 'fit-content' }}
        >
          为了优化使用体验，本站禁用右键
        </motion.div>
      )}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
      </Routes>
    </AuthContext.Provider>
  );
}

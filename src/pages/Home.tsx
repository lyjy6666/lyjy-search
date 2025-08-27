import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

// 定义搜索引擎类型
type SearchEngine = 'baidu' | 'bing' | 'google' | 'yandex' | 'doubao' | 'tongyi';

// 搜索引擎配置
  const searchEngines = {
  bing: {
    name: '必应',
    url: 'https://www.bing.com/search',
    param: 'q',
    color: 'from-blue-500 to-blue-600'
  },
  yandex: {
    name: 'Yandex',
    url: 'https://yandex.com/search',
    param: 'text',
    color: 'from-red-500 to-pink-500'
  },
  doubao: {
    name: '豆包',
    url: 'https://www.doubao.com/chat/',
    param: 'q',
    color: 'from-green-500 to-teal-500'
  },
  tongyi: {
    name: '通义千问',
    url: 'https://www.tongyi.com/',
    param: 'q',
    color: 'from-purple-500 to-indigo-500'
  },
  google: {
    name: '谷歌',
    url: 'https://www.google.com/search',
    param: 'q',
    color: 'from-red-500 to-orange-500'
  },
  baidu: {
    name: '百度',
    url: 'https://www.baidu.com/s',
    param: 'wd',
  color: 'from-blue-500 to-blue-600'
  }
}

export default function Home() {
  // 状态管理
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEngine, setSelectedEngine] = useState<SearchEngine>('bing');
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const [showUpdateLog, setShowUpdateLog] = useState(false);

  // 根据时间设置问候语
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setTimeOfDay('morning');
    } else if (hour < 18) {
      setTimeOfDay('afternoon');
    } else {
      setTimeOfDay('evening');
    }
  }, []);

  // 处理搜索提交
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    const engine = searchEngines[selectedEngine];
    const searchUrl = new URL(engine.url);
    searchUrl.searchParams.set(engine.param, searchQuery);
  window.open(searchUrl.toString(), '_blank');
  };

  // 获取当前问候语
  const getGreeting = () => {
    switch (timeOfDay) {
      case 'morning': return '早上好';
      case 'afternoon': return '下午好';
      case 'evening': return '晚上好';
      default: return '你好';
    }
  };

  // 点击页面其他区域关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = () => {
      setShowDropdown(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* 背景 */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${searchEngines[selectedEngine].color} opacity-10`}></div>
        <div 
           className="absolute inset-0 bg-[url('https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Snow-capped+mountain+peak+at+sunrise%2C+clear+blue+sky%2C+majestic+landscape&sign=6e818082c15abe2b5f071192f49da26f')] bg-cover bg-center opacity-20"
          aria-hidden="true"
        ></div>
      </div>

      {/* 主内容 */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 py-8">
         {/* 问候语 */}
         <style jsx>{`
           @keyframes colorChange {
             0% { color: #ff6b6b; }
             20% { color: #4ecdc4; }
             40% { color: #45b7d1; }
             60% { color: #967adc; }
             80% { color: #ffd166; }
             100% { color: #ff6b6b; }
           }
           .color-animate span {
             display: inline-block;
             animation: colorChange 5s infinite;
           }
         `}</style>
           <h2 className="text-[clamp(1.5rem,5vw,2.5rem)] font-medium mb-2 color-animate">
            {[...'lyjy的搜索起始页~'].map((char, index) => (
              <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                {char}
              </span>
            ))}
          </h2>
         <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white mb-2 tracking-tight">
           {getGreeting()}
         </h1>
         <p className="text-[clamp(1rem,2vw,1.25rem)] text-white mb-8">
           今天是 {new Date().toLocaleDateString('zh-CN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
         </p>

        {/* 搜索框 */}
         <div className="w-full max-w-3xl">


          {/* 搜索表单 */}
          <form onSubmit={handleSearch} className="relative">
            <div 
              className={`relative w-full transition-all duration-300 ${
                isFocused ? 'scale-[1.02]' : 'scale-100'
              }`}
            >
               {/* 搜索引擎下拉选择器 */}
                 <div className="absolute left-0 top-0 bottom-0 w-24 flex items-center border-r border-gray-200 dark:border-gray-700">
                 <button 
                   onClick={(e) => {
                     e.stopPropagation();
                     setShowDropdown(!showDropdown);
                   }}
                    className="flex items-center justify-center w-full h-full focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 rounded-l-full"
                 >
                    <div className="flex items-center space-x-2">
                       <i className={`fa-solid fa-chevron-down text-xs text-gray-500 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`}></i>
                       <span className="text-xs font-medium">{searchEngines[selectedEngine].name}</span>
                    </div>
                 </button>
                 
                 {/* 下拉菜单 */}
                 {showDropdown && (
                     <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200 w-40 border-t-2 border-blue-500">
                       {Object.entries(searchEngines).map(([key, engine]) => (
                         <button
                           key={key}
                            onClick={() => {
                               if (key === 'doubao' || key === 'tongyi') {
                                // 直接跳转到豆包搜索页面
                                window.open(engine.url, '_blank');
                              } else {
                                setSelectedEngine(key as SearchEngine);
                                setShowDropdown(false);
                              }
                            }}
                            className={`flex items-center space-x-3 px-3 py-2 w-full text-left transition-all text-sm ${
                              selectedEngine === key 
                                ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium' 
                                : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'
                             } ${key === 'baidu' ? 'opacity-50' : key === 'google' ? 'opacity-70' : ''}`}
                          >
                         <span className="whitespace-nowrap">{engine.name}{key === 'baidu' && <span className="text-gray-400 text-xs ml-1">(垃圾过多，极不推荐)</span>}{key === 'google' && <span className="text-gray-400 text-xs ml-1">(可能打不开)</span>}{key === 'doubao' && <span className="text-gray-400 text-xs ml-1">(直接跳转)</span>}{key === 'tongyi' && <span className="text-gray-400 text-xs ml-1">(直接跳转)</span>}</span>
                          </button>
                       ))}
                    </div>
                 )}
               </div>

              {/* 搜索输入框 */}
               <input
                 type="text"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 onFocus={() => setIsFocused(true)}
                 onBlur={() => setIsFocused(false)}
placeholder="请输入搜索内容，按回车或点击搜索按钮..."
                   className="w-full pl-24 pr-20 py-4 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 text-gray-800 dark:text-white"
                 style={{
                   ringColor: selectedEngine === 'bing' ? '#2563eb' : '#ff3333'
                 }}
               />
              
               <button
                 type="submit"
                 className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
                 style={{
                   backgroundColor: selectedEngine === 'bing' ? '#2563eb' : '#ff3333'
                 }}
               >
                 <i className="fa-solid fa-search text-white text-sm"></i>
               </button>
            </div>
          </form>
        </div>
      </main>

 {/* 纸飞机跳转按钮 */}
  <div className="fixed bottom-24 right-6 z-40">
  <a 
    href="https://lyjy.netlify.app" 
    target="_blank" 
    rel="noopener noreferrer"
     className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    aria-label="访问lyjy网站"
  >
    <i className="fa-solid fa-paper-plane"></i>
  </a>
</div>

{/* 更新日志按钮 */}
<div className="fixed bottom-6 right-6 z-40">
  <button 
    onClick={() => setShowUpdateLog(true)}
    className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    aria-label="查看更新日志"
  >
    <i className="fa-solid fa-history"></i>
  </button>
</div>

      {/* 更新日志弹窗 */}
      {showUpdateLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-y-auto animate-in zoom-in-95 duration-300">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">更新日志</h3>
              <button 
                onClick={() => setShowUpdateLog(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                aria-label="关闭"
              >
                <i className="fa-solid fa-times text-lg"></i>
              </button>
            </div>
            <div className="p-5 space-y-6">
              <div className="border-l-4 border-blue-500 pl-4 py-1">
                <h4 className="font-semibold text-lg text-gray-800 dark:text-white">2025.8.27 更新 v1.2</h4>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600 dark:text-gray-300">
                  <li>修复了一些已知问题</li>
                </ul>
              </div>
              
               <div className="border-l-4 border-gray-300 pl-4 py-1">
                <h4 className="font-semibold text-lg text-gray-800 dark:text-white">2025.8.10 更新 v1.1</h4>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600 dark:text-gray-300">
                  <li>新增豆包、千问搜索</li>
                  <li>修复已知问题</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-gray-300 pl-4 py-1">
                <h4 className="font-semibold text-lg text-gray-800 dark:text-white">2025.8.6 发布 v1.0</h4>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600 dark:text-gray-300">
                  <li>网站上线啦，支持搜索哦</li>
                </ul>
              </div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 flex justify-end">
              <button 
                onClick={() => setShowUpdateLog(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                我知道了
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 页脚 */}
      <footer className="py-4 text-center text-gray-500 dark:text-gray-400 text-sm relative z-10">
        <p>© {new Date().getFullYear()} 快速搜索起始页</p>
      </footer>
    </div>
  );
}
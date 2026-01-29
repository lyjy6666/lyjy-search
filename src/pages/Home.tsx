import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';
type SearchEngine = "baidu" | "bing" | "google" | "yandex" | "doubao" | "tongyi";
type Category = 'news' | 'shopping' | 'entertainment' | 'tools' | 'design' | 'dev' | 'games';

// 网站应用类型定义
interface App {
  id: string;
  name: string;
  url: string;
  icon: string; // FontAwesome 图标名称
  color: string; // 图标背景颜色
}

// 文件夹类型定义
interface Folder {
  id: Category;
  name: string;
  icon: string;
  apps: App[];
}

const searchEngines = {
    bing: {
        name: "必应",
        url: "https://www.bing.com/search",
        param: "q",
        color: "from-blue-500 to-blue-600"
    },

    yandex: {
        name: "Yandex",
        url: "https://yandex.com/search",
        param: "text",
        color: "from-red-500 to-pink-500"
    },

    doubao: {
        name: "豆包",
        url: "https://www.doubao.com/chat/",
        param: "q",
        color: "from-green-500 to-teal-500"
    },

    tongyi: {
        name: "通义千问",
        url: "https://www.tongyi.com/",
        param: "q",
        color: "from-purple-500 to-indigo-500"
    },

    google: {
        name: "谷歌",
        url: "https://www.google.com/search",
        param: "q",
        color: "from-red-500 to-orange-500"
    },

    baidu: {
        name: "百度",
        url: "https://www.baidu.com/s",
        param: "wd",
        color: "from-blue-500 to-blue-600"
    }
};

// 定义各类文件夹和应用数据
const folders: Folder[] = [
  {
    id: 'news',
    name: '资讯',
    icon: 'fa-newspaper',
    apps: [
      { id: 'weibo', name: '微博', url: 'https://weibo.com', icon: 'fa-comment-dots', color: '#E6162D' },
      { id: 'zhihu', name: '知乎', url: 'https://zhihu.com', icon: 'fa-question-circle', color: '#0066FF' },
      { id: 'toutiao', name: '头条', url: 'https://www.toutiao.com', icon: 'fa-fire', color: '#FF6700' },
      { id: 'tieba', name: '贴吧', url: 'https://tieba.baidu.com', icon: 'fa-comments', color: '#00A0E9' },
    ]
  },
  {
    id: 'shopping',
    name: '购物',
    icon: 'fa-shopping-cart',
    apps: [
      { id: 'taobao', name: '淘宝', url: 'https://www.taobao.com', icon: 'fa-shopping-bag', color: '#FF5000' },
      { id: 'jd', name: '京东', url: 'https://www.jd.com', icon: 'fa-shopping-basket', color: '#E1251B' },
      { id: 'pdd', name: '拼多多', url: 'https://www.pinduoduo.com', icon: 'fa-tag', color: '#E02E24' },
      { id: 'suning', name: '苏宁', url: 'https://www.suning.com', icon: 'fa-thumbs-up', color: '#E40000' },
    ]
  },
  {
    id: 'entertainment',
    name: '影音',
    icon: 'fa-film',
    apps: [
      { id: 'iqiyi', name: '爱奇艺', url: 'https://www.iqiyi.com', icon: 'fa-play-circle', color: '#12B7F5' },
      { id: 'youku', name: '优酷', url: 'https://www.youku.com', icon: 'fa-video', color: '#FF6700' },
      { id: 'qqmusic', name: 'QQ音乐', url: 'https://y.qq.com', icon: 'fa-music', color: '#12B7F5' },
      { id: 'netease', name: '网易云', url: 'https://music.163.com', icon: 'fa-cloud', color: '#C20C0C' },
    ]
  },
  {
    id: 'tools',
    name: '工具',
    icon: 'fa-tools',
    apps: [
      { id: 'fanyi', name: '翻译', url: 'https://fanyi.baidu.com', icon: 'fa-language', color: '#4385F5' },
      { id: 'calculator', name: '计算器', url: 'https://www.calculator.net', icon: 'fa-calculator', color: '#34A853' },
      { id: 'calendar', name: '日历', url: 'https://calendar.google.com', icon: 'fa-calendar-alt', color: '#FBBC04' },
      { id: 'notion', name: '笔记', url: 'https://www.notion.so', icon: 'fa-sticky-note', color: '#2E2E2E' },
    ]
  },
  {
    id: 'design',
    name: '设计',
    icon: 'fa-paint-brush',
    apps: [
      { id: 'figma', name: 'Figma', url: 'https://www.figma.com', icon: 'fa-square', color: '#0ACF83' },
      { id: 'behance', name: 'Behance', url: 'https://www.behance.net', icon: 'fa-behance', color: '#053EFF' },
      { id: 'dribbble', name: 'Dribbble', url: 'https://dribbble.com', icon: 'fa-dribbble', color: '#EA4C89' },
      { id: 'canva', name: 'Canva', url: 'https://www.canva.com', icon: 'fa-heart', color: '#00C4CC' },
    ]
  },
  {
    id: 'dev',
    name: '开发',
    icon: 'fa-code',
    apps: [
      { id: 'github', name: 'GitHub', url: 'https://github.com', icon: 'fa-github', color: '#24292E' },
      { id: 'stackoverflow', name: 'StackOverflow', url: 'https://stackoverflow.com', icon: 'fa-stack-overflow', color: '#F58025' },
      { id: 'mdn', name: 'MDN', url: 'https://developer.mozilla.org', icon: 'fa-book', color: '#3C4146' },
      { id: 'npm', name: 'NPM', url: 'https://www.npmjs.com', icon: 'fa-box', color: '#CB3837' },
    ]
  },
  {
    id: 'games',
    name: '游戏',
    icon: 'fa-gamepad',
    apps: [
      { id: 'steam', name: 'Steam', url: 'https://store.steampowered.com', icon: 'fa-steam', color: '#1B2838' },
      { id: 'epic', name: 'Epic', url: 'https://www.epicgames.com', icon: 'fa-gamepad', color: '#2A2A2A' },
      { id: 'battlenet', name: '暴雪', url: 'https://www.blizzard.com', icon: 'fa-snowflake', color: '#00AEFF' },
      { id: 'riot', name: 'Riot', url: 'https://www.riotgames.com', icon: 'fa-trophy', color: '#E94B3C' },
    ]
  }
];

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedEngine, setSelectedEngine] = useState<SearchEngine>("bing");
    const [isFocused, setIsFocused] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [timeOfDay, setTimeOfDay] = useState("morning");
  const [showUpdateLog, setShowUpdateLog] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAppGrid, setShowAppGrid] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Category[]>([]);

  // 处理时间点击
  const handleTimeClick = () => {
    setShowAppGrid(!showAppGrid);
    // 点击时间时重置展开的文件夹
    if (!showAppGrid) {
      setExpandedFolders([]);
    }
  };

  // 切换文件夹展开状态
  const toggleFolder = (folderId: Category) => {
    setExpandedFolders(prev => 
      prev.includes(folderId)
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  // 处理网站点击
  const handleAppClick = (url: string) => {
    window.open(url, "_blank");
  };


    useEffect(() => {
        const hour = new Date().getHours();

        if (hour < 12) {
            setTimeOfDay("morning");
        } else if (hour < 18) {
            setTimeOfDay("afternoon");
        } else {
            setTimeOfDay("evening");
        }
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        if (!searchQuery.trim())
            return;

        const engine = searchEngines[selectedEngine];
        const searchUrl = new URL(engine.url);
        searchUrl.searchParams.set(engine.param, searchQuery);
        window.open(searchUrl.toString(), "_blank");
    };

    const getGreeting = () => {
        switch (timeOfDay) {
        case "morning":
            return "早上好";
        case "afternoon":
            return "下午好";
        case "evening":
            return "晚上好";
        default:
            return "你好";
        }
    };

    useEffect(() => {
        const handleClickOutside = () => {
            setShowDropdown(false);
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            {}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div
                    className={`absolute inset-0 bg-gradient-to-br ${searchEngines[selectedEngine].color} opacity-10`}></div>
                <div
                    className="absolute inset-0 bg-[url('https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Snow-capped+mountain+peak+at+sunrise%2C+clear+blue+sky%2C+majestic+landscape&sign=6e818082c15abe2b5f071192f49da26f')] bg-cover bg-center opacity-20"
                    aria-hidden="true"></div>
            </div>
            {}
            <main
                className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 py-8">
                {}
                <style>{`
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
                <h2
                    className="text-[clamp(1.5rem,5vw,2.5rem)] font-medium mb-2 color-animate">
                    {[..."lyjy的搜索起始页~"].map((char, index) => <span
                        key={index}
                        style={{
                            animationDelay: `${index * 0.1}s`
                        }}>
                        {char}
                    </span>)}
                </h2>
                 <motion.p
                    className="text-[clamp(1rem,2vw,1.25rem)] text-white mb-4 cursor-pointer"
                    style={{
                        fontSize: "72px"
                    }}
                    onClick={handleTimeClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {currentTime.toLocaleTimeString("zh-CN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit"
                    })}
                </motion.p>
                <h1
                    className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white mb-2 tracking-tight">
                    {getGreeting()}
                </h1>
                <p className="text-[clamp(1rem,2vw,1.25rem)] text-white mb-8">今天是 {new Date().toLocaleDateString("zh-CN", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    })}
                </p>
                {}
                <div className="w-full max-w-3xl">
                    {}
                    <form onSubmit={handleSearch} className="relative">
                        <div
                            className={`relative w-full transition-all duration-300 ${isFocused ? "scale-[1.02]" : "scale-100"}`}>
                            {}
                            <div
                                className="absolute left-0 top-0 bottom-0 w-24 flex items-center border-r border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={e => {
                                        e.stopPropagation();
                                        setShowDropdown(!showDropdown);
                                    }}
                                    className="flex items-center justify-center w-full h-full focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 rounded-l-full">
                                    <div className="flex items-center space-x-2">
                                        <i
                                            className={`fa-solid fa-chevron-down text-xs text-gray-500 transition-transform duration-300 ${showDropdown ? "rotate-180" : ""}`}></i>
                                        <span className="text-xs font-medium">{searchEngines[selectedEngine].name}</span>
                                    </div>
                                </button>
                                {}
                                {showDropdown && <div
                                    className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200 w-40 border-t-2 border-blue-500">
                                    {Object.entries(searchEngines).map(([key, engine]) => <button
                                        key={key}
                                        onClick={() => {
                                            if (key === "doubao" || key === "tongyi") {
                                                window.open(engine.url, "_blank");
                                            } else {
                                                setSelectedEngine(key as SearchEngine);
                                                setShowDropdown(false);
                                            }
                                        }}
                                        className={`flex items-center space-x-3 px-3 py-2 w-full text-left transition-all text-sm ${selectedEngine === key ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium" : "hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300"} ${key === "baidu" ? "opacity-50" : key === "google" ? "opacity-70" : ""}`}>
                                        <span className="whitespace-nowrap">{engine.name}{key === "baidu" && <span className="text-gray-400 text-xs ml-1">(垃圾过多，极不推荐)</span>}{key === "google" && <span className="text-gray-400 text-xs ml-1">(可能打不开)</span>}{key === "doubao" && <span className="text-gray-400 text-xs ml-1">(直接跳转)</span>}{key === "tongyi" && <span className="text-gray-400 text-xs ml-1">(直接跳转)</span>}</span>
                                    </button>)}
                                </div>}
                            </div>
                            {}
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                placeholder="请输入搜索内容，按回车或点击搜索按钮..."
                                className="w-full pl-24 pr-20 py-4 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 text-gray-800 dark:text-white"
                                style={{
                                    ringColor: selectedEngine === "bing" ? "#2563eb" : "#ff3333"
                                }} />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
                                style={{
                                    backgroundColor: selectedEngine === "bing" ? "#2563eb" : "#ff3333"
                                }}>
                                <i className="fa-solid fa-search text-white text-sm"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            {}
            <div className="fixed bottom-24 right-6 z-40">
                <a
                    href="https://lyjy.netlify.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    aria-label="访问lyjy网站">
                    <i className="fa-solid fa-paper-plane"></i>
                </a>
            </div>
            {}
            <div className="fixed bottom-6 right-6 z-40">
                <button
                    onClick={() => setShowUpdateLog(true)}
                    className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    aria-label="查看更新日志">
                    <i className="fa-solid fa-history"></i>
                </button>
            </div>
            {}
            {showUpdateLog && <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
                <div
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-y-auto animate-in zoom-in-95 duration-300">
                    <div
                        className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">更新日志</h3>
                        <button
                            onClick={() => setShowUpdateLog(false)}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                            aria-label="关闭">
                            <i className="fa-solid fa-times text-lg"></i>
                        </button>
                    </div>
                    <div className="p-5 space-y-6">
                        <div className="border-l-4 border-blue-500 pl-4 py-1">
                            <h4 className="font-semibold text-lg text-gray-800 dark:text-white">2026.1.29 更新 V2.0</h4>
                            <ul
                                className="list-disc pl-5 mt-2 space-y-1 text-gray-600 dark:text-gray-300">
                                <li>增加大量功能</li>
                                <li>修复了一些已知问题</li>
                            </ul>
                        </div>
                        <div className="border-l-4 border-gray-300 pl-4 py-1">
                            <h4 className="font-semibold text-lg text-gray-800 dark:text-white">2025.8.27 更新 v1.2</h4>
                            <ul
                                className="list-disc pl-5 mt-2 space-y-1 text-gray-600 dark:text-gray-300">
                                <li>修复了一些已知问题</li>
                            </ul>
                        </div>
                        <div className="border-l-4 border-gray-300 pl-4 py-1">
                            <h4 className="font-semibold text-lg text-gray-800 dark:text-white">2025.8.10 更新 v1.1</h4>
                            <ul
                                className="list-disc pl-5 mt-2 space-y-1 text-gray-600 dark:text-gray-300">
                                <li>新增豆包、千问搜索</li>
                                <li>修复已知问题</li>
                            </ul>
                        </div>
                        <div className="border-l-4 border-gray-300 pl-4 py-1">
                            <h4 className="font-semibold text-lg text-gray-800 dark:text-white">2025.8.6 发布 v1.0</h4>
                            <ul
                                className="list-disc pl-5 mt-2 space-y-1 text-gray-600 dark:text-gray-300">
                                <li>网站上线啦，支持搜索哦</li>
                            </ul>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 flex justify-end">
                        <button
                            onClick={() => setShowUpdateLog(false)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">我知道了
                                                                      </button>
                    </div>
                </div>
            </div>}
            {}
            <footer
                className="py-4 text-center text-gray-500 dark:text-gray-400 text-sm relative z-10">
                 <p>© {new Date().getFullYear()}快速搜索起始页</p>
            </footer>

            {/* 应用网格菜单 */}
            {showAppGrid && (
                <motion.div 
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div 
                        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 w-full max-w-6xl max-h-[80vh] overflow-y-auto shadow-2xl"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        {/* 关闭按钮 */}
                        <div className="flex justify-end mb-6">
                            <motion.button
                                onClick={() => setShowAppGrid(false)}
                                className="text-white hover:text-gray-300 p-2 rounded-full hover:bg-white/10 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <i className="fa-solid fa-times text-xl"></i>
                            </motion.button>
                        </div>

                        {/* 文件夹网格 */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                            {folders.map((folder) => (
                                <div key={folder.id} className="space-y-2">
                                    <motion.button
                                        onClick={() => toggleFolder(folder.id)}
                                        className="w-full flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mb-2">
                                            <i className={`fa-solid ${folder.icon} text-white text-xl`}></i>
                                        </div>
                                        <span className="text-white text-sm font-medium">{folder.name}</span>
                                    </motion.button>

                                    {/* 展开的应用图标 */}
                                    {expandedFolders.includes(folder.id) && (
                                        <motion.div 
                                            className="grid grid-cols-2 gap-2"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {folder.apps.map((app) => (
                                                <motion.button
                                                    key={app.id}
                                                    onClick={() => handleAppClick(app.url)}
                                                    className="flex flex-col items-center p-2 rounded-lg hover:bg-white/10 transition-colors"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                     <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-1" style={{ backgroundColor: app.color }}>
                                                         <i className={`fa-solid ${app.icon} text-white`}></i>
                                                    </div>
                                                    <span className="text-white text-xs text-center">{app.name}</span>
                                                </motion.button>
                                            ))}
                                        </motion.div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* 底部快速访问 */}
                        <div className="mt-8">
                            <h3 className="text-white text-sm font-medium mb-4">快速访问</h3>
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                                <motion.button
                                    onClick={() => handleAppClick('https://www.douyin.com')}
                                    className="flex flex-col items-center p-3 rounded-xl bg-black/20 hover:bg-black/30 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <i className="fa-brands fa-tiktok text-white text-xl mb-1"></i>
                                    <span className="text-white text-xs">抖音</span>
                                </motion.button>
                                <motion.button
                                    onClick={() => handleAppClick('https://www.bilibili.com')}
                                    className="flex flex-col items-center p-3 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <i className="fa-brands fa-bilibili text-white text-xl mb-1"></i>
                                    <span className="text-white text-xs">哔哩哔哩</span>
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
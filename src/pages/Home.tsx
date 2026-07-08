import { motion } from 'framer-motion';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            {/* 背景图 */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div
                    className="absolute inset-0 bg-[url('https://coze-coding-project.tos.coze.site/coze_storage_7603202760753872959/image/generate_image_e1c63e9a-52b1-4720-a583-0dcee9b6728f.jpeg?sign=1804772530-8e5692a888-0-d85c70ce4b7715d716a4a54d83d85a18270642ea1b58aad935817558a6a46fdf')] bg-cover bg-center opacity-70"
                    aria-hidden="true"
                ></div>
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%)'
                    }}
                ></div>
            </div>

            {/* 主内容 */}
            <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 py-12">
                {/* 顶部装饰线 */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "80px", opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                    className="h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent mb-12"
                ></motion.div>

                {/* 图标 */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
                    className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-2xl mb-8"
                >
                    <i className="fa-solid fa-triangle-exclamation text-4xl text-white"></i>
                </motion.div>

                {/* 主标题 */}
                <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                    className="text-[clamp(1.8rem,5vw,3.5rem)] font-bold text-white mb-4 text-center"
                    style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.6)" }}
                >
                    网站即将下线
                </motion.h1>

                {/* 副标题 */}
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                    className="text-[clamp(1rem,2.5vw,1.25rem)] text-white/80 mb-10 text-center max-w-xl"
                    style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}
                >
                    感谢大家一直以来的支持与陪伴 ❤️
                </motion.p>

                {/* 通知卡片 */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-lg bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-2xl mb-10"
                >
                    <div className="space-y-5">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                <i className="fa-solid fa-info text-blue-400"></i>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-lg mb-1">域名变更通知</h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    本站将进行域名迁移，原有域名即将停止服务。
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                <i className="fa-solid fa-link text-emerald-400"></i>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-lg mb-1">新地址</h3>
                                <a
                                    href="https://lyjy.netlify.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-400 hover:text-emerald-300 text-sm font-mono transition-colors"
                                >
                                    https://lyjy.netlify.app
                                </a>
                                <p className="text-white/60 text-xs mt-1">
                                    请收藏或记住新地址，方便后续访问
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                <i className="fa-solid fa-clock text-amber-400"></i>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-lg mb-1">时间安排</h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    域名变更通知已发布，原域名将在过渡期后正式下线，
                                    请尽快迁移至新地址继续使用。
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 跳转按钮 */}
                    <motion.a
                        href="https://lyjy.netlify.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-8 w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300"
                    >
                        <i className="fa-solid fa-paper-plane"></i>
                        <span>立即前往新地址</span>
                        <i className="fa-solid fa-arrow-right text-sm"></i>
                    </motion.a>
                </motion.div>

                {/* 底部提示 */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center gap-2"
                >
                    <p className="text-white/50 text-sm" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}>
                        给您带来的不便，敬请谅解
                    </p>
                    <p className="text-white/30 text-xs">
                        lyjy 搜索页 · 感谢陪伴
                    </p>
                </motion.div>

                {/* 底部装饰线 */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "80px", opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.8, ease: "easeOut" }}
                    className="h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent mt-12"
                ></motion.div>
            </main>

            {/* 右下角链接按钮 */}
            <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
                <motion.a
                    href="https://lyjy.netlify.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30"
                    title="前往新地址"
                >
                    <i className="fa-solid fa-paper-plane"></i>
                </motion.a>
            </div>
        </div>
    );
}

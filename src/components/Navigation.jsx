import { useState, useEffect } from 'react';
import { Rocket, TrendingUp, Clock, Trophy, MapPin, Menu, X } from 'lucide-react';

/**
 * Navigation 导航栏组件
 * 提供页面顶部的固定导航栏，包含主要功能模块的链接入口
 * 支持平滑滚动、响应式设计和暗色系透明毛玻璃效果
 */
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 监听页面滚动，动态调整导航栏样式
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 导航菜单项配置
  const navigationItems = [
    {
      id: 'overview',
      label: '概览统计',
      icon: TrendingUp,
      description: '总体数据统计'
    },
    {
      id: 'timeline',
      label: '交互时间线',
      icon: Clock,
      description: '历史发展时间线'
    },
    {
      id: 'race',
      label: '太空竞赛',
      icon: Trophy,
      description: '国家间竞争对比'
    },
    {
      id: 'locations',
      label: '发射地点',
      icon: MapPin,
      description: '全球发射基地分布'
    },
    {
      id: 'china-space',
      label: '中国太空',
      icon: Rocket,
      description: '中国太空探索发展'
    }
  ];

  /**
   * 平滑滚动到指定锚点
   * @param {string} targetId - 目标元素ID
   */
  const scrollToSection = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // 考虑导航栏高度
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false); // 关闭移动端菜单
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 shadow-lg' 
        : 'bg-gray-900/60 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo 和标题 */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => scrollToSection('overview')}
          >
            <div className="float-animation">
              <Rocket className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                机器的崛起
              </h1>
              <p className="text-xs text-gray-400 hidden sm:block">太空探索历史可视化</p>
            </div>
          </div>

          {/* 桌面端导航菜单 */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 transition-all duration-200 group"
                  title={item.description}
                >
                  <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* 移动端菜单按钮 */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="切换菜单"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* 移动端下拉菜单 */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-700/50 bg-gray-900/95 backdrop-blur-md">
            <div className="py-2 space-y-1">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center space-x-3 w-full px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-gray-800/60 transition-colors"
                  >
                    <IconComponent className="w-5 h-5" />
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-gray-400">{item.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
import { useState, useEffect, useRef } from 'react';

/**
 * 数字跳动动画组件
 * @param {Object} props - 组件属性
 * @param {number|string} props.value - 要显示的数值
 * @param {string} props.className - 额外的CSS类名
 * @param {number} props.duration - 动画持续时间（毫秒），默认600ms
 * @param {number} props.delay - 动画延迟时间（毫秒），默认0ms
 * @param {boolean} props.enableCountUp - 是否启用数字递增动画，默认true
 * @param {string} props.suffix - 数字后缀，如'%'
 * @param {function} props.formatter - 数字格式化函数
 */
const AnimatedNumber = ({ 
  value, 
  className = '', 
  duration = 600, 
  delay = 0,
  enableCountUp = true,
  suffix = '',
  formatter = null
}) => {
  const [displayValue, setDisplayValue] = useState(enableCountUp ? (suffix ? '0' + suffix : 0) : value);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const animationRef = useRef(null);

  // 调试日志
  console.log('🔢 AnimatedNumber 初始化:', { value, suffix, enableCountUp, duration, displayValue });

  // 数字递增动画函数
  const animateCountUp = (start, end, duration) => {
    const startTime = performance.now();
    const numericEnd = parseFloat(String(end).replace(/[^0-9.-]/g, '')) || 0;
    const numericStart = parseFloat(String(start).replace(/[^0-9.-]/g, '')) || 0;
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // 使用easeOutCubic缓动函数
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = numericStart + (numericEnd - numericStart) * easeProgress;
      
      // 格式化显示值
      let formattedValue;
      if (formatter) {
        formattedValue = formatter(currentValue);
      } else if (String(end).includes('.')) {
        formattedValue = currentValue.toFixed(1);
      } else if (numericEnd >= 1000) {
        formattedValue = Math.round(currentValue).toLocaleString();
      } else {
        formattedValue = Math.round(currentValue);
      }
      
      setDisplayValue(formattedValue + suffix);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };

  // Intersection Observer 用于检测元素是否进入视口
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 增强调试日志
          console.log('📊📊📊 AnimatedNumber Intersection Observer 📊📊📊');
          console.log('entry.isIntersecting:', entry.isIntersecting);
          console.log('isVisible:', isVisible);
          console.log('value:', value);
          console.log('target element:', entry.target);
          console.log('boundingClientRect:', entry.boundingClientRect);
          
          if (entry.isIntersecting && !isVisible) {
            console.log('🎯 开始动画，目标值:', value);
            setIsVisible(true);
            
            // 延迟启动动画
            setTimeout(() => {
              if (enableCountUp) {
                console.log('启动数字递增动画:', { from: 0, to: value, duration });
                animateCountUp(0, value, duration);
              } else {
                const finalValue = formatter ? formatter(value) : value + suffix;
                console.log('直接设置显示值:', finalValue);
                setDisplayValue(finalValue);
              }
            }, delay);
          } else if (entry.isIntersecting && isVisible) {
            console.log('🎯 直接设置显示值:', value);
            const finalValue = formatter ? formatter(value) : value + suffix;
            setDisplayValue(finalValue);
          }
          console.log('📊📊📊 AnimatedNumber 调试结束 📊📊📊');
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration, delay, enableCountUp, suffix, formatter, isVisible]);

  // 当value改变时重新触发动画
  useEffect(() => {
    console.log('🔄 AnimatedNumber value变化:', { value, isVisible, enableCountUp });
    if (isVisible && enableCountUp) {
      const currentNumeric = parseFloat(String(displayValue).replace(/[^0-9.-]/g, '')) || 0;
      console.log('🔄 重新启动动画:', { from: currentNumeric, to: value });
      animateCountUp(currentNumeric, value, duration * 0.5); // 更新时动画时间减半
    } else if (isVisible) {
      const finalValue = formatter ? formatter(value) : value + suffix;
      console.log('🔄 直接更新显示值:', finalValue);
      setDisplayValue(finalValue);
    }
  }, [value]);

  return (
    <span 
      ref={elementRef}
      className={`animated-number ${isVisible ? 'animate-bounce-in' : ''} ${className}`}
    >
      {displayValue}
    </span>
  );
};

export default AnimatedNumber;
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
  const [displayValue, setDisplayValue] = useState(enableCountUp ? 0 : value);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const animationRef = useRef(null);

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
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          
          // 延迟启动动画
          setTimeout(() => {
            if (enableCountUp) {
              animateCountUp(0, value, duration);
            } else {
              setDisplayValue(formatter ? formatter(value) : value + suffix);
            }
          }, delay);
        }
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
    if (isVisible && enableCountUp) {
      const currentNumeric = parseFloat(String(displayValue).replace(/[^0-9.-]/g, '')) || 0;
      animateCountUp(currentNumeric, value, duration * 0.5); // 更新时动画时间减半
    } else if (isVisible) {
      setDisplayValue(formatter ? formatter(value) : value + suffix);
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
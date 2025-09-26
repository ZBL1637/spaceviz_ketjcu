import Papa from 'papaparse';

/**
 * 异步加载位于 public 目录下的 Space_Processed.csv 数据文件。
 * 使用 import.meta.env.BASE_URL 以兼容 GitHub Pages 路径前缀（如 /spaceviz_ketjcu/）。
 * @returns {Promise<Array<Object>>} 解析后的数据数组（失败时返回空数组）。
 */
export const loadSpaceData = async () => {
  try {
    // 生产环境（GitHub Pages）下需要带上 base 前缀，开发环境由 Vite 自动处理
    const response = await fetch(`${import.meta.env.BASE_URL}Space_Processed.csv`);
    const csvText = await response.text();
    
    const result = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transform: (value, field) => {
        // 转换数值字段
        if (field === 'Year' || field === 'Unnamed: 0.1' || field === 'Unnamed: 0') {
          return parseInt(value) || 0;
        }
        // 转换日期字段
        if (field === 'Datum') {
          return new Date(value);
        }
        return value;
      }
    });
    
    return result.data;
  } catch (error) {
    console.error('Error loading space data:', error);
    return [];
  }
};

/**
 * 将原始数据按图表需要的结构进行聚合与排序。
 * @param {Array<Object>} data 原始任务数据
 * @returns {{yearlyData:Array, companyData:Array, locationData:Array}} 聚合后的图表数据
 */
export const processDataForCharts = (data) => {
  // 按年份统计发射次数
  const launchesByYear = data.reduce((acc, mission) => {
    const year = mission.Year;
    if (!acc[year]) {
      acc[year] = { year, total: 0, success: 0, failure: 0 };
    }
    acc[year].total++;
    if (mission['Status Mission Simplified'] === 'Success') {
      acc[year].success++;
    } else if (mission['Status Mission Simplified'] === 'Failure') {
      acc[year].failure++;
    }
    return acc;
  }, {});

  // 按公司统计发射次数
  const launchesByCompany = data.reduce((acc, mission) => {
    const company = mission['Company Name'];
    if (!acc[company]) {
      acc[company] = { company, total: 0, success: 0, failure: 0 };
    }
    acc[company].total++;
    if (mission['Status Mission Simplified'] === 'Success') {
      acc[company].success++;
    } else if (mission['Status Mission Simplified'] === 'Failure') {
      acc[company].failure++;
    }
    return acc;
  }, {});

  // 按地点统计发射次数
  const launchesByLocation = data.reduce((acc, mission) => {
    const location = mission.Location;
    if (!acc[location]) {
      acc[location] = { location, total: 0, success: 0, failure: 0 };
    }
    acc[location].total++;
    if (mission['Status Mission Simplified'] === 'Success') {
      acc[location].success++;
    } else if (mission['Status Mission Simplified'] === 'Failure') {
      acc[location].failure++;
    }
    return acc;
  }, {});

  return {
    yearlyData: Object.values(launchesByYear).sort((a, b) => a.year - b.year),
    companyData: Object.values(launchesByCompany).sort((a, b) => b.total - a.total),
    locationData: Object.values(launchesByLocation).sort((a, b) => b.total - a.total)
  };
};

/**
 * 过滤获取指定年份区间内的时间线数据。
 * @param {Array<Object>} data 原始任务数据
 * @param {number} startYear 起始年份（含）
 * @param {number} endYear 结束年份（含）
 * @returns {Array<Object>} 过滤后的时间线数据
 */
export const getTimelineData = (data, startYear, endYear) => {
  return data.filter(mission => {
    const year = mission.Year;
    return year >= startYear && year <= endYear;
  });
};

/**
 * 生成太空竞赛对比数据，计算关键机构各年的任务次数。
 * @param {Array<Object>} data 原始任务数据
 * @returns {Array<Object>} 按年份排序的对比数据
 */
export const getSpaceRaceData = (data) => {
  const spaceRaceCountries = ['RVSN USSR', 'NASA', 'SpaceX', 'CASC', 'Roscosmos'];
  
  const raceData = data.reduce((acc, mission) => {
    const year = mission.Year;
    const company = mission['Company Name'];
    
    if (!acc[year]) {
      acc[year] = { year };
      spaceRaceCountries.forEach(country => {
        acc[year][country] = 0;
      });
    }
    
    if (spaceRaceCountries.includes(company)) {
      acc[year][company]++;
    }
    
    return acc;
  }, {});
  
  return Object.values(raceData).sort((a, b) => a.year - b.year);
};

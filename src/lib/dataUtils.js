import Papa from 'papaparse';

export const loadSpaceData = async () => {
  try {
    // 使用public目录下的文件路径，考虑base路径
    const response = await fetch('/spaceviz_ketjcu/Space_Processed.csv');
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

export const getTimelineData = (data, startYear, endYear) => {
  return data.filter(mission => {
    const year = mission.Year;
    return year >= startYear && year <= endYear;
  });
};

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

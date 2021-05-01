const stateCoverAnalysis = {
  token: '',
  pageFlag: "whole",    //全国whole 省province 市city 地图'gis'
  title: '',
  userType: "",
  headData: {
    granularity: 1,//时间粒度
    timeList: [
      { type: "date", value: "天", granular: 1 },
      { type: "week", value: "周", granular: 2 },
      { type: "month", value: "月", granular: 3 },
    ],
    startTime: "",//开始时间
    endTime: "",//结束时间
    level: 1,
    levelList: [
      { key: 1, value: "小区" },
      { key: 2, value: "栅格" },
      { key: 3, value: "场景" },
    ],
    sceneType: 1,//场景类型
    sceneList: [//后期动态返回数据
      { key: 1, value: "高校" },
      // { key: 2, value: "居民区" },
    ],
    frequency: 0,
    freRangeList: [
      { key: 0, value: "全部" },
      { key: 1, value: "3.5G" },
      { key: 2, value: "2.1G" },
    ],
    company: 1,//承建商
    companyList: [
      { key: 1, value: "全部" },
      { key: 2, value: "电信" },
      { key: 3, value: "联通" },
    ],
    gisIndicator: 'sinr', //gis页面指标名称（小区 栅格）
    gisIndicatrixs: [],      //gis页面指标下拉（小区 栅格）
    setIndicatrix: "rsrp", //设置指标选择
    indicatrix: "total", //公共指标选择
    indicatrixs: [], // 色阶指标集合、指标选择下拉
    setTabActive: 0,
    setTabArr: [
      { key: 0, value: "色阶设置" },
      { key: 1, value: "门限设置" },
    ],
    thresholdActive: 1,//门限设置
    thresholdArr: [
      { key: 1, value: "扇区" },
      { key: 2, value: "栅格" },
      { key: 4, value: "达标门限" },
    ],
    gridScopeData: [],//设置色阶
    gisLegendColors: [],//gis地图图例
    division: 1,//数据源 全国：1，省：2，市：3
    region: "",//全国：空，省：省名，市：市名
    regionId: "",//全国：空，省：ID，市：ID
    provinceId: "",//省份ID
    cityId: "",//地市ID
    countryId:"",//区县ID

    scenceModel: true, //场景model，行政区，多个场景多边形
    singleSceneFlag: false,//单个场景
    scenceComparison: false,//显示场景对比入口
    multipleScenceFlag: false,//多个场景
  },
  gisData: {
    layerList: [
      { key: 1, value: "小区" },
      { key: 2, value: "栅格" },
    ],
    mapLayer: 1,
    isLayerChange: false,
  },

  sceneGis:{
    //被点击多边形数据
    polygonClickData:{
      typeId:"",   //场景类型id
      subitemId:"",//场景id
      graphicpoint:"", //边界经纬度
    },
  },
}

export default stateCoverAnalysis;

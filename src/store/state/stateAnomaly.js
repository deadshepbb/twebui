const stateAnomaly = {
  token: "",
  perPageFlag: "whole",
  perUserType: "",
  perTitle: '',
  perAnalyData: {
    startTime: "",//开始时间
    endTime: "",//结束时间

    setIndicatrix: "abnormal", //色阶设置指标
    gridScopeData: [],
    division: 1,//数据源 全国：1，省：2，市：3
    region: "",//全国：空，省：省ID，市：市ID
    provinceId: "",//省份ID
    cityId: "",//市ID
    countryId: "",//区县ID
    indicatrixTypes: [],//门限指标类型下拉集合
    indicatrixs: [],//门限指标下拉集合
    changeIndicatrixTypes: [],//门限指标类型下拉集合
    changeIndicatrixs: [],//门限指标下拉集合
  },

  gisQueryParams:{}, //详情列表，被点击行数据
}
export default stateAnomaly;

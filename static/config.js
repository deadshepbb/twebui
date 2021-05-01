window.urlConfig = {
    timeout:60000,
    // 本地地址
    // localUrl: window.location.protocol + '//' + window.location.host,
    localUrl: "http://localhost:9999",
    // 线上地址
    serviceUrl:"http://localhost:9999",

    // 本地查询地址
    LocaleUrlPerf:"http://localhost:9999",
    // 线上查询地址
    serviceUrlPerf:"http://localhost:9999",
    
    // 本地斐波那契数列查询地址
    LocaleFbUrl:"http://localhost:9999",
    // 线上斐波那契数列查询地址
    serviceFbUrl:"http://localhost:9999",
    staticUrlService:"",
}

window.gisConfig = {
    projectName:'/oss-gateway/gis-layer-web',//调ak，url前缀
    //调地图ak
    gisUrlLocal:"https://gis.ctinm.189.cn",   //本地
    gisUrlService:"http://10.143.25.253:26010",//线上

    // 初始化地图url
    mapLayerLocal:"https://gis.ctinm.189.cn/arcgis/rest/services/map/China_BaseMap/MapServer",    //本地
    mapLayerService:"http://10.143.25.253:26010/arcgis/rest/services/map/China_BaseMap/MapServer",//线上


    // 调地图接口url (小区、栅格、弹窗等前缀)
    mapLocal:"https://gis.ctinm.189.cn",
    mapService:"http://10.130.0.226:50000",
}

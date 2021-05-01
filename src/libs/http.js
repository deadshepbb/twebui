import axios from 'axios'
import { Message, Loading } from 'element-ui'

let http = {}
const urlConfig = window.urlConfig;
const gisConfig = window.gisConfig;

// 后台jtwy接口
const apiUrl = process.env.NODE_ENV === 'development' ? urlConfig.localUrl : urlConfig.serviceUrl;
// 后台性能查询接口
const apiPerfUrl = process.env.NODE_ENV === 'development' ? urlConfig.LocaleUrlPerf : urlConfig.serviceUrlPerf;
// 后台查询斐波那契数列接口
const apiFbUrl = process.env.NODE_ENV === 'development' ? urlConfig.LocaleFbUrl : urlConfig.serviceFbUrl;
//静态资源
const staticResourceUrl = process.env.NODE_ENV === 'development' ? urlConfig.localUrl : urlConfig.staticUrlService;
//gis-ak
const gisUrl = process.env.NODE_ENV === 'development' ? gisConfig.gisUrlLocal : gisConfig.gisUrlService;
//gis-小区栅格等
const gisMapUrl = process.env.NODE_ENV === 'development' ? gisConfig.mapLocal : gisConfig.mapService;

const config = {
  timeout: 60000,
};
http.ajax = axios.create(config);

let loading = null
let requestCount = 0
let messageInstance = null;

http.ajax.interceptors.request.use(
  function (config) {
    // 每请求一个接口，请求数量加一，打开遮罩
    if (config.config && config.config.showLoading) {
      requestCount++
      loading = Loading.service({
        fullscreen: true,
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.3)'
      })
    }
    return config
  },
  function (error) {
    // 请求失败的处理
    return Promise.reject(error)
  }
)

http.ajax.interceptors.response.use(
  function (res) {
    // 每请求成功一个接口，请求数量减一，数量为零关闭遮罩
    if (res.config.config && res.config.config.showLoading) {
      setTimeout(function () {
        requestCount--
        if (requestCount <= 0) {
          loading.close()
        }
      }, 10)
    }
    if (res.config.responseType == "blob") {
      // 返回文件流内容
      return Promise.resolve({
        data: res
      })
    }
    if (res.data.code === 400) {
      if (messageInstance) {
        messageInstance.close();
      }
      messageInstance = Message({ type: 'warning', message: '查询无数据！' })
    }
    if (res.data.code === 500) {
      messageInstance = Message({ type: 'warning', message: res.data.msg })
    }
    return res
  },
  function (error) {
    // 每请求失败一个接口，请求数量减一，数量为零关闭遮罩
    if((error && error.message && error.message=="Network Error") || (error && error.message && error.message.indexOf("timeout")>=0) || (error && error.response && error.response.config.config && error.response.config.config.showLoading)) {
      setTimeout(function () {
        requestCount--
        if (requestCount <= 0) {
          loading.close()
        }
      }, 10)
    }
    if (error && error.response && error.response.data.status === 403) {
      Message({ type: 'warning', message: error.response.data.message })
    }
    return Promise.reject(error)
  }
)

http.ajaxMethodWidthParams = function (url, method, params) {

  let instance = axios.create()
  return new Promise((resolver, reject) => {
    var res = resolver
    http.ajax({
      method: method,
      url: staticResourceUrl + url,
      data: JSON.stringify(params),
      config: {
        showLoading: true
      }
    })
      .then((response) => {
        res(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

http.ajaxGetData = function (url, params) {

  let instance = axios.create()
  instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

  return new Promise((resolve, reject) => {
    var p = new URLSearchParams()
    for (var key in params) {
      p.append(key, params[key])
    }
    http.ajax
      .post(url, p)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// 针对后台规范，强制使用@RequestBody编写的方法
http.ajaxPostData = function (url, params, isMask = true, isExport = false) {
  debugger;
  let instance = axios.create()
  instance.defaults.headers.post['Content-Type'] = 'application/json'
  return new Promise((resolve, reject) => {
    http.ajax({
      method: 'post',
      url: apiUrl + url,
      data: params,
      responseType: isExport ? 'blob' : '',
      config: {
        showLoading: isMask
      }
    })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
http.ajaxPostPerfData = function (url, params, isMask = true, isExport = false) {
  let instance = axios.create()
  instance.defaults.headers.post['Content-Type'] = 'application/json'
  return new Promise((resolve, reject) => {
    http.ajax({
      method: 'post',
      url: apiPerfUrl + url,
      data: params,
      responseType: isExport ? 'blob' : '',
      config: {
        showLoading: isMask
      }
    })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

http.ajaxPostFbData = function (url, params, isMask = true, isExport = false) {
  debugger;
  let instance = axios.create()
  instance.defaults.headers.post['Content-Type'] = 'application/json'
  return new Promise((resolve, reject) => {
    http.ajax({
      method: 'post',
      url: apiFbUrl + url,
      data: params,
      responseType: isExport ? 'blob' : '',
      config: {
        showLoading: isMask
      }
    })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * gis地图
 * @param {Number} flag 线上api不同，区分线上api
 * */

http.ajaxPostDataGis = function (flag, url, params, isMask = true) {

  let urlPrefix = flag === 1? gisMapUrl : gisUrl;

  let instance = axios.create()
  instance.defaults.headers.post['Content-Type'] = 'application/json'
  return new Promise((resolve, reject) => {
    http.ajax({
      method: 'post',
      url: urlPrefix + url,
      data: params,
      config: {
        showLoading: isMask
      }
    })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

http.ajaxMethod = function (method, url, params, headers) {
  let Params = {}
  let Data = {}
  let reg1 = new RegExp('^(G|g)(E|e)(T|t)$')
  let reg2 = new RegExp('^(D|d)(E|e)(L|l)(E|e)(T|t)(E|e)')
  if (reg1.test(method) || reg2.test(method)) {
    Params = params
  } else {
    Data = params
  }
  return new Promise((resolve, reject) => {
    http.ajax({
      method: method,
      url: url,
      params: Params,
      data: Data,
      headers: headers || {},
      config: {
        showLoading: true
      }
    })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export default http

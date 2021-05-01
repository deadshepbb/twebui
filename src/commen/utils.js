import echarts from 'echarts'

const utils = {
  // 计算元素高度
  getDomHeight(domId1, domId2) {
    let ele1 = document.getElementById(domId1);
    let ele2 = document.getElementById(domId2);

    let heightEle1 = 0;
    let heightEle2 = 0;

    if(ele1 != null){
      heightEle1 = ele1.offsetHeight
    }
    if(ele1 != null){
      heightEle2 = ele2.offsetHeight
    }

    let tableHei = heightEle1 - heightEle2

    return tableHei;
  },

  /*日期过滤*/
  dateFormate(DateObject, format) {
    var date = {
      "M+": DateObject.getMonth() + 1,
      "d+": DateObject.getDate(),
      "h+": DateObject.getHours(),
      "m+": DateObject.getMinutes(),
      "s+": DateObject.getSeconds(),
      "q+": Math.floor((DateObject.getMonth() + 3) / 3),
      "S+": DateObject.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (DateObject.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1
          ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
      }
    }
    return format;
  },

  // 数组比较函数
  sortNumber(a, b) {
    return b - a;
  },
  sortNumberMin(a, b) {
    return a - b;
  },

  // 求Echarts纵轴，最大值和间隔
  getChartsMaxInterval(dataArr) {
    let minY = 0
    let maxY = 0
    let intervalNum = 0
    let tempArr = []

    for (let i = 0; i < dataArr.length; i++) {
      for (let j = 0; j < dataArr[i]['data'].length; j++) {
        tempArr.push(dataArr[i]['data'][j])
      }
    }

    let maxNum = tempArr.slice(0).sort(this.sortNumber)[0];
    let minNum = tempArr.slice(0).sort(this.sortNumberMin)[0];

    minY = Math.floor(minNum)
    // minY = 50;
    maxY = Math.ceil(maxNum / 4) * 4;
    intervalNum = Math.ceil((maxNum - minY) / 4);
    return { minY, maxY, intervalNum }
  },

  /**
   * Echarts折线图
   * @param {String} chartInstance 折线图实例
   * @param {Object} data     渲染图表数据
   * @param {Function} callBack 点击事件回调，可不传
   * @param {Function} cb resize 事件回调，可不传
   */
  lineChart(chartInstance, data, callBack, cb) {
    var _self = this;
    let myChart = chartInstance;
    echarts.init(document.getElementById(data.id)).dispose();
    myChart = echarts.init(document.getElementById(data.id));
    myChart.clear();
    var option = {
      title: {
        text: "",
      },
      tooltip: {
        trigger: "axis",
        extraCssText: "background: #fff; border-radius: 0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);color: #333;",
        axisPointer: {
          type: "shadow",
          shadowStyle: {
            color: "#ffffff",
            shadowColor: "rgba(225,225,225,1)",
            shadowBlur: 5,
          },
        },
      },
      legend: {
        show: true,
        data: data["legend"],
        right: 20,
        top: 0,
        type: "scroll",
        orient: "horizontal",
      },
      grid: {
        left: "5%",
        right: "8%",
        top: "14%",
        containLabel: true,
      },
      toolbox: {},
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: data["xAxis"],
      },
      yAxis: {
        type: "value",
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: "#E9E9E9",
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        min: _self.getChartsMaxInterval(data["series"]).minY,
        max: _self.getChartsMaxInterval(data["series"]).maxY,
        interval: _self.getChartsMaxInterval(data["series"]).intervalNum,
      },
      series: data["series"],
      color: ["#0090ff", "#3bcfa1", "#69abc9"],
    };
    myChart.setOption(option);

    window.addEventListener("resize", function () {
      myChart.resize();
    });
    cb && cb(myChart);

    myChart.off("click");
    myChart.on("click", function (params) {
      if (data.isClick) {
        callBack && callBack(params)
      }
    });
  },

  /**
   * Echarts环形图
   * @param {String} dontchartInstance 环形图实例
   * @param {Object} data     渲染图表数据
   */
  donutChart(dontchartInstance, data) {
    let _self = this;
    let myChart = dontchartInstance;
    echarts.init(document.getElementById(data.id)).dispose();
    myChart = echarts.init(document.getElementById(data.id));
    myChart.clear();
    let option = {
      title: {
        text: data.value,
        left: "center",
        top: "20%",
        textStyle: {
          textAlign: "center",
          fontSize: 14,
          color: "#808fa5",
        },
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "48%"],//内外圆的大小
          center: ['50%', '28%'],//距离左右，上下距离的百分比
          silent: true,
          data: [
            {
              value: data.value,
              labelLine: {
                normal: {
                  lineStyle: {
                    width: 0
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: "#5a9af4",
                },
              },
            },
            {
              value: data.Maxvalue - data.value,
              labelLine: {
                normal: {
                  lineStyle: {
                    width: 0
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: "#e7e7e7",
                },
              },
            },
          ],
        },
      ],
    };
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  },

  //颜色转换，十六进制转为rgb
  hexToRgba(hex, opacity) {
    let rgbaColor = "";
    let reg = /^#[\da-f]{6}$/i;
    if (reg.test(hex)) {
      rgbaColor = `rgba(${parseInt("0x" + hex.slice(1, 3))},${parseInt(
        "0x" + hex.slice(3, 5)
      )},${parseInt("0x" + hex.slice(5, 7))},${opacity})`;
    }
    return rgbaColor;
  },

  /**
   * vue路由，在新页面打开
   * @param {String} routerIns 路由实例
   * @param {Object} pathObj 路由
   */
  openInBlank(routerIns, pathObj) {
    let routeData = routerIns.resolve(pathObj);
    window.open(routeData.href, '_blank')
  },

  // 存数据
  setLocal(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  },
  // 取数据
  getLocal(key) {
    return JSON.parse(window.localStorage.getItem(key))
  },
  // 删数据
  delLocal(key) {
    window.localStorage.removeItem(key)
  },
  // 全部清空
  clearLocal() {
    window.localStorage.clear()
  }

}

export default utils

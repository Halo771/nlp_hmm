// 立即执行函数，防止变量污染 (function() {})();

// 柱状图模块1
(function () {
  // 1.实例化对象
  var myChart = echarts.init(document.querySelector(".bar .chart"));
  // 2.指定配置项和数据
  var option = {
    color: ['#2f89cf'],
    // 提示框组件
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    // 修改图表位置大小
    grid: {
      left: '0%',
      top: '10px',
      right: '0%',
      bottom: '4%',
      containLabel: true
    },
    // x轴相关配置
    xAxis: [{
      type: 'category',
      data: ["深水智能网箱", "多功能平台", "大型养殖工船", "海洋牧场观测站", "海洋牧场装备", "海钓船", "海洋牧场养殖生物"],
      axisTick: {
        alignWithLabel: true
      },
      // 修改刻度标签，相关样式
      axisLabel: {
        color: "rgba(255,255,255,0.8)",
        fontSize: 10
      },
      // x轴样式不显示
      axisLine: {
        show: false
      }
    }],
    // y轴相关配置
    yAxis: [{
      type: 'value',
      // 修改刻度标签，相关样式
      axisLabel: {
        color: "rgba(255,255,255,0.6)",
        fontSize: 12
      },
      // y轴样式修改
      axisLine: {
        lineStyle: {
          color: "rgba(255,255,255,0.6)",
          width: 2
        }
      },
      // y轴分割线的颜色
      splitLine: {
        lineStyle: {
          color: "rgba(255,255,255,0.1)"
        }
      }
    }],
    // 系列列表配置
    series: [{
      name: '直接访问',
      type: 'bar',
      barWidth: '35%',
      // ajax传动态数据
      data: [337, 255, 460, 433, 657, 301, 259],
      itemStyle: {
        // 修改柱子圆角
        borderRadius: 5
      }
    }]
  };
  // 3.把配置项给实例对象
  myChart.setOption(option);

  // 4.让图表随屏幕自适应
  window.addEventListener('resize', function () {
    myChart.resize();
  })
})();

// 柱状图模块2
(function () {
  // 1.实例化对象
  var myChart = echarts.init(document.querySelector(".bar2 .chart"));

  // 声明颜色数组
  var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
  // 2.指定配置项和数据
  var option = {
    grid: {
      top: "10%",
      left: '32%',
      bottom: '10%',
      // containLabel: true
    },
    xAxis: {
      // 不显示x轴相关信息
      show: false
    },
    yAxis: [{
      type: 'category',
      // y轴数据反转，与数组的顺序一致
      inverse: true,
      // 不显示y轴线和刻度
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      // 将刻度标签文字设置为白色
      axisLabel: {
        color: "#fff"
      },
      data: ["Ancillary Facility", "Aquaculture", "Behalf Land", "Equipment Water", "Communication"]
    }, {
      // y轴数据反转，与数组的顺序一致
      inverse: true,
      show: true,
      // 不显示y轴线和刻度
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      // 将刻度标签文字设置为白色
      axisLabel: {
        color: "#fff"
      },
      data: [702, 350, 610, 793, 664]
    }],
    series: [{
        // 第一组柱子（条状）
        name: '条',
        type: 'bar',
        // 柱子之间的距离
        barCategoryGap: 50,
        // 柱子的宽度
        barWidth: 10,
        // 层级 相当于z-index
        yAxisIndex: 0,
        // 柱子更改样式
        itemStyle: {
          borderRadius: 20,
          // 此时的color可以修改柱子的颜色
          color: function (params) {
            // params 传进来的是柱子的对象
            // dataIndex 是当前柱子的索引号
            // console.log(params);
            return myColor[params.dataIndex];
          }
        },
        data: [70, 43, 60, 78, 69],
        // 显示柱子内的百分比文字
        label: {
          show: false,
          position: "inside",
          // {c} 会自动解析为数据（data内的数据）
          formatter: "{c}%"
        }
      },
      {
        // 第二组柱子（框状 border）
        name: '框',
        type: 'bar',
        // 柱子之间的距离
        barCategoryGap: 50,
        // 柱子的宽度
        barWidth: 14,
        // 层级 相当于z-index
        yAxisIndex: 1,
        // 柱子修改样式
        itemStyle: {
          color: "none",
          borderColor: "#00c1de",
          borderWidth: 2,
          borderRadius: 15,
        },
        data: [70, 43, 60, 78, 69]
      }
    ]
  };
  // 3.把配置项给实例对象
  myChart.setOption(option);

  // 4.让图表随屏幕自适应
  window.addEventListener('resize', function () {
    myChart.resize();
  })
})();


// 折线图模块1
(function () {
  // 年份对应数据
  var yearData = [{
      year: "2021", // 年份
      data: [
        // 两个数组是因为有两条线
        [24, 40, 101, 134, 90, 230, 210, 130, 120, 230, 170, 79],
        [40, 64, 191, 324, 290, 330, 310, 213, 180, 260, 180, 120]
      ]
    },
    {
      year: "2022", // 年份
      data: [
        // 两个数组是因为有两条线
        [123, 131, 112, 133, 121, 21, 82, 21, 43, 64, 19, 34],
        [143, 175, 165, 197, 178, 67, 98, 64, 43, 68, 76, 38]
      ]
    }
  ];

  var myChart = echarts.init(document.querySelector(".line .chart"));

  var option = {
    // 修改两条线的颜色
    color: ['#00f2f1', '#ed3f35'],
    tooltip: {
      trigger: 'axis'
    },
    // 图例组件
    legend: {
      // 当serise 有name值时， legend 不需要写data
      // 修改图例组件文字颜色
      textStyle: {
        color: '#4c9bfd'
      },
      right: '10%',
    },
    grid: {
      top: "20%",
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
      show: true, // 显示边框
      borderColor: '#012f4a' // 边框颜色
    },
    xAxis: {
      type: 'category',
      boundaryGap: false, // 去除轴间距
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      // 去除刻度线
      axisTick: {
        show: false
      },
      axisLabel: {
        color: "#4c9bfb" // x轴文本颜色
      },
      axisLine: {
        show: false // 去除轴线
      }
    },
    yAxis: {
      type: 'value',
      // 去除刻度线
      axisTick: {
        show: false
      },
      axisLabel: {
        color: "#4c9bfb" // x轴文本颜色
      },
      axisLine: {
        show: false // 去除轴线
      },
      splitLine: {
        lineStyle: {
          color: "#012f4a"
        }
      }
    },
    series: [{
        type: 'line',
        smooth: true, // 圆滑的线
        name: '新增节点',
        data: yearData[0].data[0]
      },
      {
        type: 'line',
        smooth: true, // 圆滑的线
        name: '新增关系',
        data: yearData[0].data[1]
      }
    ]
  };

  myChart.setOption(option);

  // 4.让图表随屏幕自适应
  window.addEventListener('resize', function () {
    myChart.resize();
  })

  // 5.点击切换2020 和 2021 的数据
  $('.line h2 a').on('click', function () {
    // console.log($(this).index());
    // 点击a 之后 根据当前a的索引号 找到对应的 yearData 相关对象
    // console.log(yearData[$(this).index()]);
    var obj = yearData[$(this).index()];
    option.series[0].data = obj.data[0];
    option.series[1].data = obj.data[1];
    // 选中年份高亮
    $('.line h2 a').removeClass('a-active');
    $(this).addClass('a-active');

    // 需要重新渲染
    myChart.setOption(option);
  })
})();


// 折线图模块2
(function () {
  var myChart = echarts.init(document.querySelector('.line2 .chart'));

  var option = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      top: "0%",
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    grid: {
      top: '30',
      left: '10',
      right: '30',
      bottom: '10',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      boundaryGap: false,
      // 文本颜色为rgba(255,255,255,.6)  文字大小为 12
      axisLabel: {
        
          color: "rgba(255,255,255,.6)",
          fontSize: 12
        
      },
      // x轴线的颜色为   rgba(255,255,255,.2)
      axisLine: {
        lineStyle: {
          color: "rgba(255,255,255,.2)"
        }
      },
      data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "26", "28", "29", "30"]
    }],
    yAxis: [{
      type: 'value',
      axisTick: {
        // 不显示刻度线
        show: false
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255,255,255,.1)"
        }
      },
      axisLabel: {
        
          color: "rgba(255,255,255,.6)",
          fontSize: 12
        
      },
      // 修改分割线的颜色
      splitLine: {
        lineStyle: {
          color: "rgba(255,255,255,.1)"
        }
      }
    }],
    series: [{
        name: '网站注册人数',
        type: 'line',
        smooth: true, // 圆滑的线
        // 单独修改当前线条的样式
        lineStyle: {
          color: "#0184d5",
          width: 2
        },
        // 填充区域渐变透明颜色
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [{
                offset: 0,
                color: "rgba(1, 132, 213, 0.4)" // 渐变色的起始颜色
              },
              {
                offset: 0.8,
                color: "rgba(1, 132, 213, 0.1)" // 渐变线的结束颜色
              }
            ],
            false
          ),
          shadowColor: "rgba(0, 0, 0, 0.1)"
        },
        // 拐点设置为小圆点
        symbol: 'circle',
        // 设置拐点大小
        symbolSize: 5,
        // 开始不显示拐点， 鼠标经过显示
        showSymbol: false,
        // 设置拐点颜色以及边框
        itemStyle: {
          color: "#0184d5",
          borderColor: "rgba(221, 220, 107, .1)",
          borderWidth: 12
        },
        data: [30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 30, 40, 30, 40, 30, 40, 20, 60, 50, 40]
      },
      {
        name: "智能问答人数",
        type: "line",
        smooth: true,
        lineStyle: {
          
            color: "#00d887",
            width: 2
          
        },
        areaStyle: {
          
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [{
                  offset: 0,
                  color: "rgba(0, 216, 135, 0.4)"
                },
                {
                  offset: 0.8,
                  color: "rgba(0, 216, 135, 0.1)"
                }
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)"
          
        },
        // 设置拐点 小圆点
        symbol: "circle",
        // 拐点大小
        symbolSize: 5,
        // 设置拐点颜色以及边框
        itemStyle: {
          color: "#00d887",
          borderColor: "rgba(221, 220, 107, .1)",
          borderWidth: 12
        },
        // 开始不显示拐点， 鼠标经过显示
        showSymbol: false,
        data: [130, 10, 20, 40, 30, 40, 80, 60, 20, 40, 90, 40, 20, 40, 30, 40, 130, 20, 20, 40, 80, 70, 30, 40, 30, 120, 20, 99, 50, 20]
      }
    ]
  };

  myChart.setOption(option);

  window.addEventListener('resize', function () {
    myChart.resize();
  })
})();



// 饼形图1
(function () {
  var myChart = echarts.init(document.querySelector(".pie .chart"));
  var option = {
    color: ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      // 垂直居中,默认水平居中
      // orient: 'vertical',

      bottom: 0,
      left: 10,
      // 小图标的宽度和高度
      itemWidth: 10,
      itemHeight: 10,
      // 修改图例组件的文字为 12px
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "10"
      }
    },
    series: [{
      name: '问题类型',
      type: 'pie',
      // 设置饼形图在容器中的位置
      center: ["50%", "42%"],
      // 修改饼形图大小，第一个为内圆半径，第二个为外圆半径
      radius: ['40%', '60%'],
      avoidLabelOverlap: false,
      // 图形上的文字
      label: {
        show: false,
        position: 'center'
      },
      // 链接文字和图形的线
      labelLine: {
        show: false
      },
      data: [{
          value: 1117,
          name: "多功能平台类"
        },
        {
          value: 4277,
          name: "海洋牧场装备类"
        },
        {
          value: 2484,
          name: "海洋牧场养殖类"
        },
        {
          value: 2702,
          name: "牧场海钓船类"
        },
        {
          value: 1201,
          name: "养殖工船类"
        }
      ]
    }]
  };

  myChart.setOption(option);
  window.addEventListener('resize', function () {
    myChart.resize();
  })
})();


// 饼形图2
(function () {
  var myChart = echarts.init(document.querySelector('.pie2 .chart'));
  var option = {
    color: ['#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      bottom: 0,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: 10
      }
    },
    series: [
      {
        name: '访问地区分布',
        type: 'pie',
        radius: [10, 60],
        center: ['50%', '40%'],
        roseType: 'area',
        label: {
          fontsize: 10,
          color: ['#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
        },
        itemStyle: {
          borderRadius: 8
        },
      data: [{
          value: 2637,
          name: '北京'
        },
        {
          value: 3489,
          name: '山东'
        },
        {
          value: 1522,
          name: '河北'
        },
        {
          value: 2061,
          name: '江苏'
        },
        {
          value: 2125,
          name: '浙江'
        },
        {
          value: 2730,
          name: '福建'
        },
        {
          value: 1942,
          name: '广东'
        }
      ]
    }]
  };

  myChart.setOption(option);
  window.addEventListener('resize', function () {
    myChart.resize();
  })
})();

var myChart;
function initChart() {
 
  myChart = echarts.init(document.querySelector('.map .chart'));
  var categories1 = [{name: "设备模块"}, {name: "使用条件"}, {name: "模块内容"}, {name: "主要框架"}, {name: "海洋牧场装备"}, {name: "设备名称"}, {name: "海洋牧场大型装备"}];
  var option = {
    // 图的标题
    title: {
      text: '',
      textStyle: {
        fontSize: 24,
        color: 'aliceblue',
        textAlign: 'center' // 添加居中配置
        
      },
      
    },
    // 提示框的配置
    tooltip: {
        formatter: function (x) {
            return x.data.des;
        }
    },
    // 工具箱
    toolbox: {
        // 显示工具箱
        show: true,
        feature: {
            mark: {
                show: true
            },
            // 还原
            restore: {
                show: true
            },
            // 保存为图片
            saveAsImage: {
                show: true
            }
        }
    },
    legend: [{
        // selectedMode: 'single',
        //orient: 'vertical', // 改为垂直布局
       // left: 'left', // 设置图例位置为左侧
        data: categories1.map(function (a) {
            return a.name;
        }),
        textStyle: {
          fontSize: 16, // 字体大小
          color: 'aliceblue',
      }
    }],
    series: [{
        type: 'graph', // 类型:关系图
        layout: 'force', //图的布局，类型为力导图
        symbolSize: 40, // 调整节点的大小
        roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [2, 10],
        edgeLabel: {
            normal: {
                textStyle: {
                    fontSize: 20
                }
            }
        },
        force: {
            repulsion: 2500,
            edgeLength: [10, 50]
        },
        draggable: true,
        lineStyle: {
            normal: {
                width: 2,
                color: '#4b565b',
            }
        },
        edgeLabel: {
            normal: {
                show: true,
                formatter: function (x) {
                    return x.data.name;
                }
            }
        },
        label: {
          
            normal: {
                show: true,
                textStyle: {}
            }
        },

        // 数据
        data: data1,
        links: links1,
        categories: categories1,
    }]
};
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.addEventListener('resize', function () {
    myChart.resize();
  });
}
 // 页面加载完成后初始化图表
 document.addEventListener('DOMContentLoaded', function () {
  initChart();
});

// 刷新按钮点击事件
document.getElementById('refreshButton').addEventListener('click', function () {
  // 发起AJAX请求以获取新数据
  fetch('/your_data_endpoint')
    .then(function (response) {
      if (!response.ok) {
        throw new Error('数据获取失败');
      }
      return response.json();
    })
    .then(function (newData) {
      // 更新ECharts图表
      myChart.setOption({
        series: [{
          data: newData.data, // 更新为新数据
        }],
      });
    })
    .catch(function (error) {
      console.error('数据获取失败：', error);
    });
});

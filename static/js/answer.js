


(function initChart() {
 
    var myChart = echarts.init(document.querySelector('.map .chart'));
    var categories1 = [{name: "搜索车型"}, {name: "同类车型"}, {name: "投诉类型"}, {name: "投诉内容"}];
    var option = {
      // 图的标题
      title: {
          text: '汽车故障知识图谱可视化'
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
          data: categories1.map(function (a) {
              return a.name;
          })
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
          data: data,
          links: links,
          categories: categories1,
      }]
  };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener('resize', function () {
      myChart.resize();
    })
  // 页面加载完成后初始化图表
document.addEventListener('DOMContentLoaded', function () {
    initChart();
  });
  
  // 刷新数据的函数
  function refreshData() {
    // 发起AJAX请求以获取新数据
    fetch('/your_data_endpoint1/')
      .then(function (response) {
        if (!response.ok) {
          throw new Error('数据获取失败');
        }
        return response.json();
      })
      .then(function (newData) {
        // 更新ECharts图表
        console.log('新数据:', newData);
        myChart.setOption({
          series: [{
            data: newData.data, // 更新为新数据
            links: newData.links,
          }],
        });
      })
      .catch(function (error) {
        console.error('数据获取失败：', error);
      });
  }
  
 
  
  // 在主界面中监听消息
  window.addEventListener('message', function (event) {
    if (event.data && event.data.type === 'buttonClicked') {
      // 收到来自插入界面的消息
      console.log('Received message from iframe: ' + event.data.text);
  
      // 在这里执行主界面的操作，例如更新数据或执行其他逻辑
      // 调用刷新数据函数
      refreshData();
    }
  });
  
  })();

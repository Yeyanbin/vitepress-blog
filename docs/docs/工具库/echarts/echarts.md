## echarts的使用

模仿了vuex的action使用，编写了`mapChart`方法

- mapChart可挂载于methods中，类似于mapAction
  - 类型如下
- 在每次更新的时候会销毁上次使用的chart，否则某些情况下再次加载会留下上次线条的痕迹。
- 支持使用事件 echart文档 <https://echarts.apache.org/zh/api.html#echartsInstance.on>

```ts

type TMapChart = (IChartMap: IChartMap) => {
  [updateFuncName: string]: (data: any) => void
};

interface IChartMap {
  [updateFuncName: string]: IChartItem;
}

interface IChartItem {
  id: string;
  getOption: (data: any) => void;
  event?: IEvent;
}

interface IEvent {
  name: String;
  handler: (event: any) => void;
}

const mapChart: TMapChart;
```

使用例子

```js
// 使用 overviewMonitor/index.vue
export default {
  //...
  mounted() {
    // 只需要类似这样去更新数据即可
    getXXX().then(res => overviewUpdate(res.list)); 
    // overviewUpdate(res.list) 实际上差不多等于
    // echarts.init(document.getElementById('overviewChart')).setOption(getOverviewOption(res.list));
  }
  methods: {
    ...mapChart({
      overviewUpdate: {
        id: 'overviewChart',
        getOption: getOverviewOption,
        event: overviewEvent,
      },
    }),
  }
}

/*
  getOverviewOption和overviewEvent在./config.js中配置
*/
// ./createEcharts.js
export const mapChart = function (chartMap) {
  Object.keys(chartMap).forEach((funcName) => {
    const { id, getOption, event } = chartMap[funcName];

    chartMap[funcName] = (data) => {
      // 创建之前销毁，否则某些情况下再次加载会留下上次线条的痕迹。
      echarts.init(document.getElementById(id)).dispose();
      const chart = echarts.init(document.getElementById(id));
      event && chart.on(event.name, event.handler, { chart });
      chart.setOption(getOption(data));
    };
  });
  return chartMap;
};
```

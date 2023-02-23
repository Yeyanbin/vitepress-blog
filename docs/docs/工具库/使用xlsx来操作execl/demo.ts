import * as XLSX from 'xlsx';

interface IExportExcelParameters {
  headers: any; // excel的头
  data: any; // 数据
  fileName?: string; // 导出文件名
  cols?: any[]; // 行间距
  merges?: any[]; // 合并行
}

/*
以下是使用示范

headers: any; // excel的头
const headers = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '年级',
  dataIndex: 'grade',
  key: 'grade',
}, {
  title: '部门',
  dataIndex: 'department',
  key: 'department',
  className: 'text-monospace',
}];

data: any; // 数据
let attendanceInfoList = [
  {
    name: '张三',
    grade: '2017级',
    department: '前端部门',
  },
  {
    name: '李四',
    grade: '2017级',
    department: '程序部门',
  },
];

fileName?: string; // 导出文件名
'工资单.xlsx'

cols?: any[]; // 行间距
[{wpx: 100},{wpx: 100}]

merges?: any[]; // 合并行
[
  {
    s: {
      c: 11,
      r: length,
    },
    e: {
      c: 15,
      r: length,
    },
  }
]
*/

// 导出excel
export const exportExcel = ({ headers, data, fileName = '表格.xlsx', cols = [], merges = [] }: IExportExcelParameters) => {
  const _headers = headers.map((item, i) =>
    Object.assign({}, {
      key: item.dataIndex || item.key,
      title: item.title,
      position: String.fromCharCode(65 + i) + 1,
    },
    ),
  ).reduce(
    (prev, next) =>
      Object.assign({}, prev, { [next.position]: { key: next.key, v: next.title } }),
    {},
  );

  const _data = data.map((item, i) => headers.map(
    (key, j) => {
      let obj = {
        content: item[key.dataIndex || key.key],
      }
      if (key.dataIndex === "orderId") {
        obj.content = item['key'] + '/' +item['orderTime']
      } else if (key.dataIndex === "serviceFee") {
        obj.content = getServiceFee(item)
      }
      return Object.assign(obj, {
        position: String.fromCharCode(65 + j) + (i + 2),
      },
      )
    }),
  ).reduce(
    // 对刚才的结果进行降维处理（二维数组变成一维数组）
    (prev, next) => prev.concat(next)
  ).reduce(
    // 转换成 worksheet 需要的结构
    (prev, next) => Object.assign({}, prev, { [next.position]: { v: next.content } }), {},
  );
  
  // 合并 headers 和 data
  const output = Object.assign({}, _headers, _data);
  // 获取所有单元格的位置
  const outputPos = Object.keys(output);
  // 计算出范围 ,["A1",..., "H2"]
  const ref = `${outputPos[0]}:${outputPos[outputPos.length - 1]}`;

  // 构建 workbook 对象
  const wb = {
    SheetNames: ['mySheet'],
    Sheets: {
      mySheet: Object.assign({}, output, {
        '!ref': ref,
        '!cols': cols,
        '!merges': merges,
      }),
    },
  };

  // 导出 Excel
  XLSX.writeFile(wb, fileName);
};


const getServiceFee = (item) => {
  let serviceFeeDetail = ''
  if(Number(item.insurancePrice)) {
    serviceFeeDetail += `运费险¥${item.insurancePrice}`
  } 
  if (Number(item.alliancePlatformFee)) {
    serviceFeeDetail += `联盟佣金¥${item.alliancePlatformFee}`
  }
  if (Number(item.allianceFee) || Number(item.guideFee)) {
    serviceFeeDetail += `导购佣金¥${Number(item.allianceFee) + Number(item.guideFee)}`
  }
  if(Number(item.recommenderFee)) {
    serviceFeeDetail += `推荐官佣金¥${item.recommenderFee}`
  }
  if(!Number(item.insurancePrice) && !Number(item.insurancePrice) && !Number(item.allianceFee) && !Number(item.alliancePlatformFee) && !Number(item.guideFee) && !Number(item.recommenderFee)) {
    serviceFeeDetail = '无'
  }
  return serviceFeeDetail
}

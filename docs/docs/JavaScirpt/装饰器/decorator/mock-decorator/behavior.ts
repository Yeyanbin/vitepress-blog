import { fakerBehaviorKey } from './decorator/fake.decorator';
import { typeKeys } from './decorator/type.decorator';
import { MockDataStore } from './MockDataStore';

// faker
const handleFakeBehavior = (data) => {
  let fakerBehavior
  if (fakerBehavior = data[fakerBehaviorKey]) {
    return fakerBehavior.mockFn(...fakerBehavior.params);
  }
  return;
}

// array
const handleArrayBehavior = (data) => {
  let arrayBehavior
  if (arrayBehavior = data[typeKeys.isArrayKey]) {
    const { length, max = 100, min = 0 } = arrayBehavior;
    if (!!length) {
      return length;
    } else {
      return Math.ceil(Math.random() * (max - min) + min);
    }
  }
  return undefined;
}

// obj
const handleObjectBehavior = (data) => {
  let objectBehavior
  if (objectBehavior = data[typeKeys.isObjectKey]) {
    const { target } = objectBehavior;

    return handleMockBehavior(target);
  }
  return;
};

// enum
const handleEnumBehavior = (data) => {
  let enumBehavior
  if (enumBehavior = data[typeKeys.isEnumKey]) {
    const { values } = enumBehavior;

    const length = values.length;

    return values[Math.floor(Math.random() * length)];
  }
  return;
};

// number
const handleNumberBehavior = (data) => {
  let numberBehavior
  if (numberBehavior = data[typeKeys.isNumberKey]) {
    const { max, min, isInt } = numberBehavior;
    const result = Math.random() * (max - min) + min;

    return isInt ? Math.floor(result) : result;
  }
  return
}

// 优先级，Object > Number > faker > Enum
const handleValueBehaviors = (data) => {
  let result;
  result = handleObjectBehavior(data);
  result = result ?? handleNumberBehavior(data); 
  result = result ?? handleFakeBehavior(data);
  result = result ?? handleEnumBehavior(data);

  return result;
}

export const handleMockBehavior = (target: Function) => {
  
  // 获取类构造函数为key的Mock数据 
  const targetData = MockDataStore.instance.getMockData(target);

  // 类的实例
  const targetInstance = {};

  // 该类没有Mock数据
  if (!targetData) return

  // 分别处理各个参数
  Object.keys(targetData).forEach((key) => {
    
    // 如果这个参数有Mock行为数据 
    if (targetData[key]) {
      
      // 判断是不是数组
      const length = handleArrayBehavior(targetData[key]);
      if (!!length) {
        // 是数组
        const result = [];
        for(let i = 0; i<length ;++i) {
          // 处理值数据
          result.push(handleValueBehaviors(targetData[key]));
        }
        targetInstance[key] = result;
      } else {
        targetInstance[key] = handleValueBehaviors(targetData[key]);
      }
    }
  });

  return targetInstance;
}


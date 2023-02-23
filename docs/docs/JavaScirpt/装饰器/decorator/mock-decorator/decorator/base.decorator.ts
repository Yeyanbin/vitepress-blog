
import { MockDataStore } from '../MockDataStore';
export type MetadataTarget = Function 

/**
 * 是参数装饰器
 */
export const useMockBehavior = (params) => {

  return (target: any, propertyKey: string) => {

    Object.keys(params).forEach((paramKey) => {
      MockDataStore.instance.addMockData(target.constructor, propertyKey, paramKey, params[paramKey]);
    })
  };
};


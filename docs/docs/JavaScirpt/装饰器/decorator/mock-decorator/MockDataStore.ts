
interface ITargetData {
  [key: string]: any;
}


export class MockDataStore {
  targetMap: Map<Function, ITargetData>

  private static _instance: MockDataStore
  static get instance (): MockDataStore{
    if (!this._instance) {
      this._instance = new MockDataStore();
    }
    return this._instance
  };
  private constructor() {
    this.targetMap = new Map();
  }

  getMockData(target: Function): ITargetData {
    return this.targetMap.get(target);
  }

  addMockData(target: Function, key: string, paramKey: string, paramValue) {
    console.log(target);
    if (!this.targetMap.has(target)) {
      this.targetMap.set(target, {});
    }
    const targetData = this.targetMap.get(target);
    if (!targetData[key]) {
      targetData[key] = {};
    }
    targetData[key][paramKey] = paramValue;
  }
}
import { useMockBehavior } from "./base.decorator";

const isArrayKey = 'array';
const isObjectKey = 'object';
const isNumberKey = 'number';
const isEnumKey = 'enum';


export const ArrayMock = (options: { max?: number, min?: number, length?: number } = { length: 10 }) => {
  let min = options.min;
  if (!!options.max) {
    min = options.min ?? 0;
  }
  
  let max = options.max;
  if (!!options.min) {
    max = options.max ?? 100;
  }

  if (options.length) {
    return useMockBehavior({
      [isArrayKey]: { 
        length: options.length
      }
    });
  } else {
    return useMockBehavior({
      [isArrayKey]: { 
        max,
        min,
      }
    });
  }
};

export const ObjectMock = (target) => {
  return useMockBehavior({
    [isObjectKey]: {
      target
    },
  });
};


export const NumberMock = (options: { max?: number, min?: number, isInt?: boolean }) => {
  const max = options.max ?? 100;
  const min = options.min ?? 0;
  const isInt = options.isInt ?? false;

  return useMockBehavior({
    [isNumberKey]: {
      max,
      min,
      isInt,
    }
  })
}

export const EnumMock = (values: any[]) => {
  return useMockBehavior({
    [isEnumKey]: {
      values
    }
  })
}

export const typeKeys = {
  isArrayKey,
  isObjectKey,
  isNumberKey,
  isEnumKey,
};
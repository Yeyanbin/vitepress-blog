import { MockDataStore } from "./MockDataStore";
import get from "lodash/get";

const dto = (undefinedCb: (path: string) => void = () => void 0) => (
    target: new (data) => Object
) => {
    return (function(data: any) {
        const dtoObject = new target(data);
        const targetData = MockDataStore.instance.getMockData(target);

        if (targetData) {
            Object.keys(targetData).forEach(key => {
                if (targetData[key]) {
                    const { path } = getValueGlue(targetData[key]);
                    if (path) {
                        const value = get(data, path);
                        if (value === undefined) {
                            undefinedCb(path);
                        } else {
                            dtoObject[key] = value;
                        }
                    }
                }
            });
        }

        return dtoObject;
    } as unknown) as new (data: any) => any;
};

// const defaultValueKey = "defaultValue";
const ValueGlueKey = "glue";

// const DefaultValue = (value: any) => {
//     return useBehavior({
//         [defaultValueKey]: {
//             value
//         }
//     });
// };

// const getDefaultValue = (data: any) => {
//     return data[defaultValueKey];
// };

const ValueGlue = (path: string) => {
    return useBehavior({
        [ValueGlueKey]: {
            path
        }
    });
};

const getValueGlue = (data: any) => {
    let valueGlueBehavior;
    if ((valueGlueBehavior = data[ValueGlueKey])) {
        return valueGlueBehavior;
    }
    return;
};

const useBehavior = params => {
    return (target: any, propertyKey: string) => {
        Object.keys(params).forEach(paramKey => {
            MockDataStore.instance.addMockData(
                target.constructor,
                propertyKey,
                paramKey,
                params[paramKey]
            );
        });
    };
};

export { dto, ValueGlue };

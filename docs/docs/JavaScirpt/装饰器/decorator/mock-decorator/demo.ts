import { handleMockBehavior } from "./behavior";
import { Name } from "./decorator/fake.decorator";
import { NumberMock, ObjectMock, ArrayMock, EnumMock } from "./decorator/type.decorator";
import { MockDataStore } from "./MockDataStore";


class Date {
  @NumberMock({ max: 2020, min: 2010, isInt: true })
  year: number;

  @NumberMock({ max: 13, min: 1, isInt: true })
  month: number;
}

class Skill {
  @EnumMock(['卖萌', '捕猎', '跑酷', '抓老鼠'])
  name: string;

  @NumberMock({
    max: 100
  })
  level: number;
}

class Cat {
  @Name.lastName('male')
  name: string;

  @ObjectMock(Date)
  brithday: Date;

  @ArrayMock({ max: 4 })
  @Name.findName()
  firendsName: string[]

  @ArrayMock({ min: 1, max: 3 })
  @ObjectMock(Skill)
  skills: Skill[]
}

console.log(MockDataStore.instance.targetMap);

const cat_1 = handleMockBehavior(Cat);
const cat_2 = handleMockBehavior(Cat);
const cat_3 = handleMockBehavior(Cat);

console.log('cat_1', cat_1);
console.log('cat_2', cat_2);
console.log('cat_3', cat_3);
/*
生成随机数据的输出：
cat_1 { name: 'Roberts',
  brithday: { year: 2017, month: 12 },
  firendsName: [ 'Sean Price' ],
  skills:
   [ { name: '卖萌', level: 6.7813479251336295 },
     { name: '捕猎', level: 95.58251369601594 } ] }
cat_2 { name: 'Olson',
  brithday: { year: 2013, month: 3 },
  firendsName: [ 'Ms. Pam Hodkiewicz', 'Leslie Bednar' ],
  skills:
   [ { name: '捕猎', level: 74.36836676938398 },
     { name: '捕猎', level: 22.77025925417544 },
     { name: '跑酷', level: 35.21808489069889 } ] }
cat_3 { name: 'Conn',
  brithday: { year: 2012, month: 6 },
  firendsName: [ 'Beatrice Koss' ],
  skills:
   [ { name: '卖萌', level: 44.026811694055844 },
     { name: '抓老鼠', level: 11.329242733894706 },
     { name: '跑酷', level: 99.4451728462999 } ] }
*/
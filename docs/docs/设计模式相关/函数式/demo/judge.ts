
const ASK_STATUS = {
  AC: 1,
  WA: 2,
  TLE: 3,
};

const OBSERVE_BEHAVIOR_STATUS = {
  SUCCESS: 2000,
  WARNNING: 3000,
  ERROR: 4000,
};

const COLOR_CONFIG = {
  GREEN: 'green',
  RED: 'red',
  YELLOW: 'yellow',
  WHITE: 'white'
}

const MESSAGE_CONFIG = {
  NORMAL: {
    COLOR: COLOR_CONFIG.WHITE,
  },
  SUCCESS: {
    COLOR: COLOR_CONFIG.GREEN,
  },
  WARNNING: {
    COLOR: COLOR_CONFIG.YELLOW,
  },
  ERROR: {
    COLOR: COLOR_CONFIG.RED,
  }
};

const log = (message, color): IMessage => {

  return message;
};

const journal = {
  print: (message: IMessage) => {

  }
} 

interface IJudge {
  ask: (key, callback) => IJudge;
  // ask: (key, value) => IJudge;
}
interface IMessage {
  time: number;
  content: string;
  color: string;
};

type messageType = 'NORMAL' | 'SUCCESS' | 'WARNNING' | 'ERROR';

type observeBehavior = [number, IMessage, any?]


/**
 * 
 * @param observed 
 * @returns a judge
 */
export const createJudge = (observed: any): IJudge => {
  // proxy
  const observer: { [key: string]: observeBehavior } = new Proxy(null, {
    get: (_, key: string): observeBehavior => {
      // handle the list of key
      if (key.includes('.')) {
        const keyList = key.split('.');
        let resultValue = observed;

        // Catch Error.
        try {
          keyList.forEach(key => resultValue = resultValue[key]);
          
          // The value isn't exist.
          if (resultValue === undefined) {
            return [OBSERVE_BEHAVIOR_STATUS.WARNNING, log(`The value is undefined in the key of ${key}.`, MESSAGE_CONFIG.WARNNING.COLOR)]
          }
          return [OBSERVE_BEHAVIOR_STATUS.SUCCESS, log(`${key} is done.`, MESSAGE_CONFIG.SUCCESS.COLOR), observed[key]];
          
        } catch(err) {
          // handle the Error "Uncaught TypeError: Cannot read properties of undefined".
          return [OBSERVE_BEHAVIOR_STATUS.ERROR, log(`The key list: ${key} isn't exist.`, MESSAGE_CONFIG.ERROR.COLOR)];
        };
      
      } else {
        // success
        return [OBSERVE_BEHAVIOR_STATUS.SUCCESS, log(`${key} is done.`, MESSAGE_CONFIG.SUCCESS.COLOR), observed[key]];
      }
    },
  });

  const judge = {
    ask: async (key, value) => {
      const time = Date.now();

      const [status, message, result]: observeBehavior = observer[key];
      
      journal.print(message);

      return new Promise((resolve, reject) => {
        const eventMap = {
          [OBSERVE_BEHAVIOR_STATUS.SUCCESS]: (result) => {
            // success
            if (typeof result === 'function') {

            } else if (typeof result === 'object') {
              try {
                if (JSON.stringify(result) ===  JSON.stringify(value)) {
                  journal.print(log('U right!', COLOR_CONFIG.GREEN));
                  resolve('');
                }
              } catch (error) {
                // Not a json obj.
                // It would a object who include function like `{ run: () => {} }`?
                journal.print(log('Something Error!', COLOR_CONFIG.RED));

                reject('test')
              }
            }

          },
          [OBSERVE_BEHAVIOR_STATUS.WARNNING]: (result) => {
  
          },
          [OBSERVE_BEHAVIOR_STATUS.ERROR]: () => {
  
          }
        }
  
        eventMap[status](result);
      })
    },
  };

  return judge;
};


class TypeMap{
  private map;
  private constructor() {
    this.map = {};
  }
  private static _instance: TypeMap;
  static get instance() {
    !this._instance && (this._instance = new TypeMap());
    return this._instance;
  }

  clear(){}
  register(type, callback) {
    this.map[type] = callback;
  }
  run(type) {
    return this.map[type]();
  }
}

TypeMap.instance.register(0, () => {
  
});




{
  interface IPeople {
    name: string;
    height: number;
    weight: number;
    hobby: string;
  }

  interface IPeopleWayMethods {
    playGame: (people: IPeople, gameName: string) => void;
    work: (people: IPeople, companyName: string) => void;
    study: (people: IPeople, courseName: string) => void;
    selfIntroduction: (people: IPeople) => void;
  }

  const people: IPeople = {
    name: '小明',
    height: 170,
    weight: 60,
    hobby: '游戏'
  }

  const peopleWayMethods: IPeopleWayMethods = {
    playGame: (people: IPeople, gameName: string) => {
      console.log(`${people.name}去打${gameName}游戏！${people.hobby === '游戏'? '心情变好了。': '心情变差了。'}`);
    },
    work: (people: IPeople, companyName: string) => {
      console.log(`${people.name}去打${companyName}上班。`);
    },
    study: (people: IPeople, courseName: string) => {
      console.log(`${people.name}去学习了${courseName}课程。`);
    },
    selfIntroduction: (people: IPeople) => {
      console.log(`我叫${people.name}，我爱${people.hobby}，身高${people.height}cm，体重${people.weight}kg.`);
    }
  };

  peopleWayMethods.playGame(people, '王者荣耀'); // 小明去打王者荣耀游戏！心情变好了。
  peopleWayMethods.study(people, 'vue'); // 小明去学习了vue课程。
  peopleWayMethods.work(people, '麻豆'); // 小明去麻豆上班。
  peopleWayMethods.selfIntroduction(people); // 我叫小明，我爱游戏，身高170cm，体重60kg.
}

{
  
  interface IPeople {
    states: {
      name: string,
      height: number;
      weight: number;
      hobby: string;
    },
    ways: {
      playGame: (gameName: string) => void;
      work: (companyName: string) => void;
      study: (courseName: string) => void;
      selfIntroduction: () => void;
    }
  }

  const usePeople = (name: string, { height, weight, hobby }): IPeople => {

    const playGame = (gameName: string) => {
      console.log(`${name}去打${gameName}游戏${hobby === '游戏'? '心情变好了。': '心情变差了。'}`);
    };
    const work = (companyName: string) => {
      console.log(`${name}去打${companyName}上班。`);
    };
    const study = (courseName: string) => {
      console.log(`${name}去学习了${courseName}课程。`);
    };
    const selfIntroduction = () => {
      console.log(`我叫${name}，我爱${hobby}，身高${height}cm，体重${weight}kg.`);
    }

    return {
      states: {
        name,
        height,
        weight,
        hobby
      },
      ways: {
        playGame,
        work,
        study,
        selfIntroduction
      }
    }
  }

  const people = usePeople('小明', { height: 170, weight: 60, hobby: '游戏' });

  people.ways.playGame('王者荣耀'); // 小明去打王者荣耀游戏！心情变好了。
  people.ways.study('vue'); // 小明去学习了vue课程。
  people.ways.work('麻豆'); // 小明去麻豆上班。
  people.ways.selfIntroduction(); // 我叫小明，我爱游戏，身高170cm，体重60kg.
}
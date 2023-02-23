
const getCurryingAdd = (defaultNumber = 0) => {
  let number = defaultNumber;

  const curryAdd = (num) => {
    number += num;
  }
  curryAdd.toString = curryAdd.valueOf = () => number;
  return curryAdd;
}


export const kebabCase = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();

export const randomNumberText = (finalNum: string, setNumber: (value: string) => void) => {
  let count = 0;
  const interval = setInterval(() => {
    count++;
    let newNum = "";
    for (let i = 0; i < finalNum.length; i++) {
      newNum += Math.floor(Math.random() * 10);
    }
    setNumber(newNum);
    if (count === 20) {
      clearInterval(interval);

      setNumber(finalNum);
    }
  }, 80);
  return () => clearInterval(interval);
};

export const GenerateInlineExpression = (target: number) => {
  const stepsCount = Math.floor(Math.random() * 6) + 10;
  const operations = ["+", "-", "*", "/"];
  const values: number[] = [];
  const ops: string[] = [];

  let current = Math.floor(Math.random() * 10) + 1;
  let expression = `${current}`;

  for (let i = 1; i < stepsCount - 1; i++) {
    let op = operations[Math.floor(Math.random() * operations.length)];
    let value = 1;

    if (op === "+") {
      value = Math.floor(Math.random() * 50) + 1;
      current += value;
    } else if (op === "-") {
      value = Math.floor(Math.random() * Math.min(current, 50)) + 1;
      current -= value;
    } else if (op === "*") {
      value = Math.floor(Math.random() * 5) + 2;
      current *= value;
    } else if (op === "/") {
      const divisors = getDivisors(current).filter(
        (d) => d !== 1 && d !== current
      );
      if (divisors.length === 0) {
        op = "+";
        value = Math.floor(Math.random() * 20) + 1;
        current += value;
      } else {
        value = divisors[Math.floor(Math.random() * divisors.length)];
        current = current / value;
      }
    }

    values.push(value);
    ops.push(op);
    expression += ` ${op} ${value}`;
  }

  let finalOp = "+";
  let finalValue = target - current;

  if (finalValue < 0) {
    finalOp = "-";
    finalValue = Math.abs(finalValue);
  }

  expression += ` ${finalOp} ${finalValue}`;
  expression += ` = ${target}`;

  return expression;
};

const getDivisors = (n: number): number[] => {
  const divisors: number[] = [];
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      divisors.push(i);
      const pair = n / i;
      if (i !== pair) divisors.push(pair);
    }
  }
  return divisors.sort((a, b) => a - b);
};

export default GenerateInlineExpression;

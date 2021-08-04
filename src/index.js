function eval() {
  // Do not use eval!!!
  return;
}
const checkBrackets = (initialArray) => {
  let open = 0;
  let close = 0;

  initialArray.forEach(element => {
    if (element === '(') {
      open++;
    }
    if (element === ')') {
      close++;
    }
  });
  if (open !== close) {
    throw new Error("ExpressionError: Brackets must be paired");
  }
};
const simpleCalculate = (x, y, operator) => {
  if (operator === '/' && y === 0) {
    throw new Error("TypeError: Division by zero.");
  }
  switch (operator) {
    case '+': return x + y;
    case '-': return x - y;
    case '*': return x * y;
    case '/': return x / y;
  }
}
const createArray = (initialArray) => {
  let string = '';
  const newArray = [];
  initialArray.forEach(element => {
    if (/[0-9]/.test(element)) {
      string += element;
    }
    if (/[\/\*\+\-()]/.test(element)) {
      if (string.length !== 0) {
        newArray.push(Number(string));
        string = '';
      }
      newArray.push(element);
    }
  });
  if (string.length !== 0) {
    newArray.push(Number(string));
  }
  return newArray;
}
const noBracketsCalculate = (newArray) => {
  let x = newArray[0];
  let y;
  let operator = '';

  newArray.forEach((element, index) => {
    if (/[\+\-]/.test(element) && element.length === 1) {
      if (operator === '') {
        operator = element;
        y = newArray[index + 1];
      } else {
        x = simpleCalculate(x, y, operator);
        operator = element;
        y = newArray[index + 1];
      }
    }
    if (/[\*\/]/.test(element)) {
      if (operator === '') {
        x = simpleCalculate(x, newArray[index + 1], element);

      } else {
        y = simpleCalculate(y, newArray[index + 1], element);
      }
    }
  });
  if (operator !== '') {
    x = simpleCalculate(x, y, operator);
  }
  return x;
}
const bracketsCalculate = (newArray) => {
  newArray.push(')');
  newArray.unshift('(');
  let arr = [];
  let num = 0;

  for (let i = 0; newArray.length > 1; i++) {
    if (newArray[i] === ')') {
      let k = i - 1;
      while (newArray[k] !== '(') {
        k--;
      }
      arr = newArray.splice(k + 1, i - k - 1);
      num = noBracketsCalculate(arr);
      newArray.splice(k, 2, num);
      i = 1;
    }
  }


  return (newArray[0]);

}

function expressionCalculator(expr) {
  initialArray = expr.split('');
  checkBrackets(initialArray);
  const newArray = createArray(initialArray);
  const result = bracketsCalculate(newArray);
  return result;
}
module.exports = {
  expressionCalculator
}



module.exports = function check(str, bracketsConfig) {
  let array = str.split('');
  let openingBrackets = bracketsConfig.map(x => x[0]);
  let closingBrackets = bracketsConfig.map(x => x[1]);

  let stack = [];
  let missedItems = [];
  array.forEach(element => {

    let isOpeningBracketEqualToClosed = openingBrackets.includes(element) && closingBrackets.includes(element);
    if(isOpeningBracketEqualToClosed){
      processSameBracketType(stack, element);
    }
    else{
      processDifferentBracketType(openingBrackets, element, stack, closingBrackets, bracketsConfig, missedItems);
    }


  });

  return stack.length === 0 && missedItems.length === 0;
}

function processDifferentBracketType(openingBrackets, element, stack, closingBrackets, bracketsConfig, missedItems) {
  if (openingBrackets.includes(element)) {
    stack.push(element);
  } else if (closingBrackets.includes(element)
    && stack[stack.length - 1] === bracketsConfig.find((el) => el[1] === element)[0]) {
    stack.pop();
  }
  else {
    missedItems.push(element);
  }
}

function processSameBracketType(stack, element) {
  if (stack.includes(element)) {
    stack.pop(element);
  } else {
    stack.push(element);
  }
}

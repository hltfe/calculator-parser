const { LeftBracket, RightBracket, Operator } = require('./numberlexer')


class Expression {
  constructor(){
     this.leftExpressionIsText = false;
     this.rightExpressionIsText = false;
     this.leftExpression = null;
     this.rightExpression = null;
     this.operator = null;
  }
}
class NumberText  {
    constructor (value) {
        this.value = value || ''
    }
}

function NumberSyntaticalParser () {


    const stack = [];
    const expressionStack = [new Expression()];
    this.receiveInput = function (token) {
        if (typeof token === 'string') {
            if (getTop(stack) instanceof NumberText) {
                getTop(stack).value += token
            } else {
                let t = new NumberText(token)
                if(!getExpressionStack(expressionStack).leftExpression){
                    getExpressionStack(expressionStack).leftExpression = t;
                    getExpressionStack(expressionStack).leftExpressionIsText = true;
                } else {
                    getExpressionStack(expressionStack).rightExpression = t;
                    getExpressionStack(expressionStack).rightExpressionIsText = true;
                }
                stack.push(t)
            }
        } else if (getTop(stack) instanceof NumberText) {
            stack.pop()
        }
        if (token instanceof LeftBracket) {
            let exp = new Expression();
            if(!getExpressionStack(expressionStack).leftExpression){
                getExpressionStack(expressionStack).leftExpression = exp;
            } else{
                getExpressionStack(expressionStack).rightExpression = exp;
            }
            expressionStack.push(exp);
        }
        if (token instanceof RightBracket) {
            expressionStack.pop()
        }
        if (token instanceof Operator) {
            if(getExpressionStack(expressionStack).rightExpression){
                if((token.name === '*' || token.name === '/') && (getExpressionStack(expressionStack).operator.name ==='+' || getExpressionStack(expressionStack).operator.name ==='-')){
                    let exp = new Expression();
                    exp.leftExpressionIsText = getExpressionStack(expressionStack).rightExpressionIsText
                    exp.leftExpression = getExpressionStack(expressionStack).rightExpression
                    exp.operator = token
                    getExpressionStack(expressionStack).rightExpression = exp;
                    getExpressionStack(expressionStack).rightExpressionIsText = false;
                    exp.isSpecial = true;
                    expressionStack.push(exp);
                    return
                }
                 else {
                    let exp = new Expression();
                    exp.leftExpressionIsText = getExpressionStack(expressionStack).leftExpressionIsText
                    exp.rightExpressionIsText = getExpressionStack(expressionStack).rightExpressionIsText
                    exp.leftExpression = getExpressionStack(expressionStack).leftExpression
                    exp.rightExpression = getExpressionStack(expressionStack).rightExpression
                    exp.operator = getExpressionStack(expressionStack).operator
                    getExpressionStack(expressionStack).leftExpression = exp;
                    getExpressionStack(expressionStack).leftExpressionIsText = false;
                    getExpressionStack(expressionStack).rightExpression = null;
                    getExpressionStack(expressionStack).rightExpressionIsText = false;
                }
            }
            getExpressionStack(expressionStack).operator = token;
        }
        for(let i = expressionStack.length-1; i>=0;i--){
            if(expressionStack[i].isSpecial && expressionStack[i].rightExpression){
                expressionStack.splice(i,1);
            }
        }
    }

  this.getOutput = () => {
      return expressionStack[0];
  }
}

function getTop (stack) {
  if(stack.length > 0){
    return stack[stack.length - 1]
  } else{
    return null
  }
}

function getExpressionStack(stack){
    return stack[stack.length - 1]
}

module.exports = {
    NumberSyntaticalParser
}

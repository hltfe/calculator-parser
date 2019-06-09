const EOF = void 0

function NumberLexicalParser (syntaxer) {
  let state = data
  let token = null

  this.receiveInput = function (char) {
    if (state == null) {
      throw new Error('there is an error')
    } else {
      state = state(char)
    }
  }

  this.reset = function () {
    state = data
  }

  function data (c) {
    if(c === '('){
        token = new LeftBracket()
        token.name = c.toLowerCase()
        emitToken(token)
        return data
    } else if(/[0-9]/.test(c)){
        emitToken(c)
        return numberState
    } else if (/[+*\/-]/.test(c)){
        return error(c)
    } else if(c === ')'){
        return error(c)
    } else {
        return error(c)
    }
  }

  function numberState(c) {
      if(/[0-9]/.test(c)){
          emitToken(c)
          return numberState
      } else if (/[+*\/-]/.test(c)){
          token = new Operator()
          token.name = c.toLowerCase()
          emitToken(token)
          return data
      } else if(c === ')'){
          token = new RightBracket()
          token.name = c.toLowerCase()
          emitToken(token)
          return rightBracketState
      } else {
          return error(c)
      }
  }


  function rightBracketState(c) {
      if(/[+*\/-]/.test(c)){
          token = new Operator()
          token.name = c.toLowerCase()
          emitToken(token)
          return data
      } else if (c === ')') {
          token = new RightBracket()
          token.name = c.toLowerCase()
          emitToken(token)
          return rightBracketState
      } else {
          return error(c)
      }

  }


  function emitToken (token) {
    syntaxer.receiveInput(token)
  }

  function error (c) {
    console.log(`warn: unexpected char '${c}'`)
  }
}

class LeftBracket {}

class RightBracket {}

class Operator {}
module.exports = {
    LeftBracket,
    RightBracket,
    Operator,
    NumberLexicalParser
}

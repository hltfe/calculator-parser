const { NumberLexicalParser } = require('./numberlexer')

const testNumber = `(3+5+(3-2))+6`;

const dummySyntaxer = {
  receiveInput: (token) => {
    if (typeof token === 'string') {
      console.log(`String【${token.replace(/\n/, '\\n').replace(/ /, '<whitespace>')}】`)
    } else {
      console.log(token)
    }
  }
}

const lexer = new NumberLexicalParser(dummySyntaxer)

for (let c of testNumber) {
  lexer.receiveInput(c)
}

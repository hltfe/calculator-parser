const { NumberSyntaticalParser } = require('./numbersyntaxer')
const { NumberLexicalParser } = require('./numberlexer')

const syntaxer = new NumberSyntaticalParser()
const lexer = new NumberLexicalParser(syntaxer)

const testNumber = `3+2*5`

for (let c of testNumber) {
  lexer.receiveInput(c)
}

console.log(JSON.stringify(syntaxer.getOutput(), null, 2))

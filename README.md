# (Deterministic) Finite Automaton in Javascript.

[Formal Definition](https://en.wikipedia.org/wiki/Deterministic_finite_automaton#Formal_definition)

States and symbols are represented by strings.  
Transitions are objects of interface { state, symbol, resultState }.  
Each state needs a transition for each input symbol. (completeness)

# Requirements

Tested with Node.js v16.13.1

# Example

Automaton that accepts binary strings that contain an even number of 0s.

![alt DFA example](https://github.com/janbican/finite-automaton/blob/master/dfa-even-0s.png?raw=true)

```javascript
const transitions = [
    { state: 'even', symbol: '0', resultState: 'odd' },
    { state: 'even', symbol: '1', resultState: 'even' },
    { state: 'odd', symbol: '0', resultState: 'even' },
    { state: 'odd', symbol: '1', resultState: 'odd' },
  ]

const automaton = new FiniteAutomaton({
  transitions,
  startState: 'even',
  acceptStates: ['even']
})

console.log(automaton.isAccepting('00')) // true
console.log(automaton.isAccepting('10')) // false

console.log(automaton.states()) // ['even', 'odd']
console.log(automaton.alphabet()) // ['0', '1']
```

# API

Consider automaton from example above.

```javascript
automaton.isAccepting('010')
// true

automaton.process('010')
// { isAccepting: true, stateSequence: [ 'even', 'odd', 'odd', 'even' ] }

automaton.states()
// [ 'even', 'odd' ]

automaton.alphabet()
// [ '0', '1' ]

automaton.transitions()
// [
//  { state: 'even', symbol: '0', resultState: 'odd' },
//  { state: 'even', symbol: '1', resultState: 'even' },
//  { state: 'odd', symbol: '0', resultState: 'even' },
//  { state: 'odd', symbol: '1', resultState: 'odd' }
// ]

automaton.startState()
// 'even'

automaton.acceptStates()
// [ 'even' ]
```
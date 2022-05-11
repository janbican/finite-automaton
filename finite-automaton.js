class FiniteAutomaton {
  #transitionFunction
  #startState
  #acceptStates

  constructor({ transitions, startState, acceptStates }) {
    this.#transitionFunction = new TransitionFunction(transitions)
    this.#startState = startState
    this.#acceptStates = [...acceptStates]
  }

  isAccepting(string) {
    const { isAccepting } = this.process(string)
    return isAccepting
  }

  process(string) {
    const stateSequence = [this.#startState]
    let state = this.#startState
    for (const symbol of string) {
      state = this.#transitionFunction.get(state, symbol)
      stateSequence.push(state)
    }
    const isAccepting = this.#isAcceptingState(state)
    return { isAccepting, stateSequence }
  }

  #isAcceptingState(state) {
    return this.#acceptStates.includes(state)
  }

  states() {
    return this.#transitionFunction.states()
  }

  alphabet() {
    return this.#transitionFunction.alphabet()
  }

  transitions() {
    return this.#transitionFunction.transitions()
  }

  startState() {
    return this.#startState
  }

  acceptStates() {
    return [...this.#acceptStates]
  }
}

class TransitionFunction {
  #map

  constructor(transitions) {
    this.#map = this.#createTransitionMap(transitions)
  }

  #createTransitionMap(transitions) {
    const map = new Map()
    for (const { state, symbol, resultState } of transitions) {
      let singleStateMap = map.get(state)
      if (!singleStateMap) {
        map.set(state, (singleStateMap = new Map()))
      }
      singleStateMap.set(symbol, resultState)
    }
    return map
  }

  get(state, symbol) {
    const singleStateMap = this.#map.get(state)
    return singleStateMap.get(symbol)
  }

  states() {
    return Array.from(this.#map.keys())
  }

  alphabet() {
    const arbitraryState = this.states()[0]
    const singleStateMap = this.#map.get(arbitraryState)
    return Array.from(singleStateMap.keys())
  }

  transitions() {
    const transitions = []
    for (const [state, singleStateMap] of this.#map) {
      for (const [symbol, resultState] of singleStateMap) {
        transitions.push({ state, symbol, resultState })
      }
    }
    return transitions
  }
}


// accepts binary strings that contains an even number of 0s
const automaton = new FiniteAutomaton({
  transitions: [
    { state: 'q0', symbol: '0', resultState: 'q1' },
    { state: 'q0', symbol: '1', resultState: 'q0' },
    { state: 'q1', symbol: '0', resultState: 'q0' },
    { state: 'q1', symbol: '1', resultState: 'q1' },
  ],
  startState: 'q0',
  acceptStates: ['q0']
})

console.log('states:', automaton.states())
console.log('alphabet:', automaton.alphabet())
console.log('transitions:', automaton.transitions())
console.log('startState: ', automaton.startState())
console.log('acceptStates: ', automaton.acceptStates())

console.log('accepts: \'\'', automaton.isAccepting(''))
console.log('accepts: 0', automaton.isAccepting('0'))
console.log('accepts: 00', automaton.isAccepting('00'))
console.log('accepts: 10', automaton.isAccepting('10'))
console.log('accepts: 101', automaton.isAccepting('101'))
console.log('accepts: 001', automaton.isAccepting('001'))
console.log('accepts: 000', automaton.isAccepting('000'))
console.log('accepts: 110001011', automaton.isAccepting('110001011'))


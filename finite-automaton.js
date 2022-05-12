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

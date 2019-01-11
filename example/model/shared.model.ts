const initialState = {
  counter: 0,
  light: false,
  response: {}
}

const waitFor = (ms: number) => new Promise(r => setTimeout(r, ms))

type StateType = {
  counter: number
  light: boolean
  response: {
    code?: number
    message?: string
  }
}

type ActionsParamType = {
  increment: number
  openLight: undefined
  get: undefined
}

const Model: ModelType<StateType, ActionsParamType> = {
  actions: {
    increment: (state, _, params) => {
      return {
        counter: state.counter + (params || 1)
      }
    },
    openLight: (state, actions) => {
      actions.increment(100)
      actions.get()
      actions.increment(10)
      return { light: !state.light }
    },
    get: () => ({ response: { code: 200, message: 'open light success' } })
  },
  asyncState: async () => {
    await waitFor(4000)
    return { counter: 500 }
  },
  state: initialState
}

export default Model

type ConsumerActionsType = getConsumerActionsType<typeof Model.actions>
type ConsumerType = { actions: ConsumerActionsType; state: StateType }
type ActionType = ConsumerActionsType

export { ConsumerType, StateType, ActionType }

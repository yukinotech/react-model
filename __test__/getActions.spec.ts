/// <reference path="./index.d.ts" />
import { testHook } from 'react-hooks-testing-library'
import { Counter } from '.'
import { Model } from '../src'

describe('useStore', () => {
  test('return default initial values', () => {
    let state
    const { useStore } = Model({ Counter })
    testHook(() => {
      ;[state] = useStore('Counter')
    })
    expect(state).toEqual({ count: 0 })
  })
  test('consumer actions return function', async () => {
    let state: any
    let actions: any
    const { useStore, getActions } = Model({ Counter })
    testHook(() => {
      ;[state] = useStore('Counter')
      actions = getActions('Counter')
    })
    await actions.increment(3)
    expect(state).toEqual({ count: 3 })
    await actions.increment(4)
    expect(state.count).toBe(7)
  })
})

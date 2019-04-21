import { Reducer, ActionCreator, Action } from 'redux'

interface MyAction extends Action{
  payload: any;
}

const camelify = <T extends string>(str: T) => str
  .split('_')
  .map((s, i) => (i !== 0 ? s[0] + s.slice(1).toLowerCase() : s.toLowerCase()))
  .join('')

export const createTypes =
  <T extends string, U extends string>
    (arr: Array<T>, namespace: U): { [K in T]?: string } =>
    arr.reduce((o, type) => ({
      ...o,
      [type]: `${namespace}_${type}`,
    }), {});


export const createActions2 = <T>
  (types: T): {[K in keyof T]?:ActionCreator<(payload:any) => MyAction>} => {
    const t:{[K in keyof T]?: ActionCreator<(payload:any) => MyAction>} = {};
    const keys = Object.keys(types);
    keys.forEach((k) => {
        t[k] = (payload: any) => ({type: k, payload})
    })
    return t;
  //   return Object.keys(types).reduce((o, key) => ({
  //   ...o,
  //   [camelify(key)]: payload => ({
  //     type: types[key],
  //     payload,
  //   }),
  // }), {})
}

export const createActions = <T>
  (types: { [K in keyof T]?: string }): Action => {
  return Object.keys(types).reduce((o, key) => ({
    ...o,
    [camelify(key)]: payload => ({
      type: types[key],
      payload,
    }),
  }), {})
}

export const handleActions = (handlers, initialState) => (state = initialState, action): Reducer => {
  const handler = handlers[action.type]
  if (typeof handler === 'function') return handler(state, action)
  return state
}

export const action = (type, payload, meta) => {
  if (typeof payload === 'undefined') {
    return { type }
  }
  if (typeof meta === 'undefined') {
    return { type, payload }
  }
  return { type, payload, meta }
}

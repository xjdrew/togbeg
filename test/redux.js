import {
  combineReducers,
  createStore
} from 'redux'

function visibilityFilter(state = 'SHOW_ALL', action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state, {
          text: action.text,
          completed: false
        }
      ]
    case 'COMPLETE_TODO':
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: true
          })
        }
        return todo
      })
    default:
      return state
  }
}

let reducer = combineReducers({
  visibilityFilter,
  todos
})
let store = createStore(reducer)

it('simple redux', () => {
  store.dispatch({
    type: 'ADD_TODO',
    text: 'have dinner',
  })

  store.dispatch({
    type: 'SET_VISIBILITY_FILTER',
    filter: 'SHOW_COMPLETED'
  })

  expect(store.getState().todos[0].text).toBe('have dinner');
  expect(store.getState().todos[1]).toBe(undefined);
  expect(store.getState().visibilityFilter).toBe('SHOW_COMPLETED');
})

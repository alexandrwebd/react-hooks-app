import {
  CLEAR_USERS,
  GET_REPOS,
  GET_USER,
  SEARCH_USERS,
  SET_LOADING,
} from '../types'

// обьект handlers
const handlers = {
  [SEARCH_USERS]: (state, action) => ({
    ...state,
    users: action.payload,
    loading: false,
  }),
  [GET_REPOS]: (state, { payload }) => ({
    // сокращаю код, деструктуризация payload
    ...state,
    repos: payload,
    loading: false,
  }),
  [GET_USER]: (state, { payload }) => ({
    // сокращаю код, деструктуризация payload
    ...state,
    user: payload,
    loading: false,
  }),
  [SET_LOADING]: (state) => ({ ...state, loading: true }),
  [CLEAR_USERS]: (state) => ({ ...state, users: [] }),
  DEFAULT: (state) => state,
}

// обьектный вариант редюсера проверяю по ключам обьекта handlers по аналогии с switch case
export const githubReducer = (state, action) => {
  // получаю хендлер по ключу и если такого нету выполняю дефолтное действие
  const handler = handlers[action.type] || handlers.DEFAULT
  //   возвращаю функцию handler с параметрами state и action
  return handler(state, action)
}

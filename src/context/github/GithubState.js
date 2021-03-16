import React, { useReducer } from 'react'
import axios from 'axios'
import {
  CLEAR_USERS,
  GET_REPOS,
  GET_USER,
  SEARCH_USERS,
  SET_LOADING,
} from '../types'
import { GithubContext } from './githubContext'
import { githubReducer } from './githubReducer'

//принимает url и возвращает полный API c добавлением ключей
const withCreds = (url) => {
  return `${url}client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
}

//Присваиваю переменным ключи с github
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET

// создаю компонент обвертку GithubState в который оберну все приложение для доступа к стейту
export const GithubState = ({ children }) => {
  // начальный стейт
  const initialState = {
    user: {},
    users: [],
    loading: false,
    repos: [],
  }
  const [state, dispatch] = useReducer(githubReducer, initialState)

  //метод для поиска пользователей
  const search = async (value) => {
    setLoading() //показываю loader пока идет запрос на сервер

    //делаю запрос к github
    const response = await axios.get(
      withCreds(`https://api.github.com/search/users?q=${value}&`)
    )

    dispatch({ type: SEARCH_USERS, payload: response.data.items })
  }

  //поиск определенного пользователя
  const getUser = async (name) => {
    setLoading() //показываю loader пока идет запрос на сервер

    const response = await axios.get(
      withCreds(`https://api.github.com/users/${name}?`)
    )

    dispatch({ type: GET_USER, payload: response.data })
  }

  //получает список репозиториев
  const getRepos = async (name) => {
    setLoading() //показываю loader пока идет запрос на сервер

    const response = await axios.get(
      withCreds(`https://api.github.com/users/${name}/repos?per_page=5&`)
    )

    dispatch({ type: GET_REPOS, payload: response.data })
  }

  //чистит список пользователей
  const clearUsers = () => dispatch({ type: CLEAR_USERS })

  //показывает лоадер
  const setLoading = () => dispatch({ type: SET_LOADING })

  //   получаю стейт деструктуризацией
  const { user, users, repos, loading } = state

  // оборачиваю все в контекст добовляю провайдер и в нутри вывожу детей, в value передаю нужные методы и состояния стейта
  return (
    <GithubContext.Provider
      value={{
        setLoading,
        search,
        getUser,
        getRepos,
        clearUsers,
        user,
        users,
        repos,
        loading,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

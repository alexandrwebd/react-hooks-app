import React, { useReducer } from 'react'
import { HIDE_ALERT, SHOW_ALERT } from '../types'
// в стейте контекст пишем логику, в другом компоненте получаем информацию для отображения
import { AlertContext } from './alertContext'
import { alertReducer } from './alertReducer'

export const AlertState = ({ children }) => {
  // вызываю хук useReducer куда передаю наш редюсер и начальное значение null потомучто сначала мы алерт не показываем
  const [state, dispatch] = useReducer(alertReducer, null)

  //   экшен закрытия алерта
  const hide = () => dispatch({ type: HIDE_ALERT })

  //   экшен показа алерта
  const show = (text, type = 'secondary') => {
    dispatch({
      type: SHOW_ALERT,
      payload: { type, text },
    })
  }

  return (
    //   импортирую компонент Alert и добовляю к нему Provider для передачи данных чтоб дочерние элементы получали пропсы
    <AlertContext.Provider value={{ hide, show, alert: state }}>
      {children}
    </AlertContext.Provider>
  )
}

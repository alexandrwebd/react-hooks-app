import React, { Fragment, useContext } from 'react'
import { Card } from '../components/Card'
import { Search } from '../components/Search'
import { GithubContext } from '../context/github/githubContext'

export const Home = () => {
  // для эксперемента создаю пустой массив длинной 15, заполняю пустыми строчками, прохожу мепом и возв индекс
  //   const cards = new Array(15).fill('').map((_, i) => i)
  //   console.log(cards)

  //   получаю с нашего гитхаб контекста необходимые поля
  const { loading, users } = useContext(GithubContext)

  return (
    <Fragment>
      <Search />

      <div className="row">
        {loading ? (
          <p className="text-center">Загрузка...</p>
        ) : (
          users.map((user) => (
            <div className="col-sm-4 mb-4" key={user.id}>
              <Card user={user} />
            </div>
          ))
        )}
      </div>
    </Fragment>
  )
}

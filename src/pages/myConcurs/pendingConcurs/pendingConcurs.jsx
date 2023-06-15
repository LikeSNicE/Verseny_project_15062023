import React from 'react'
import CardPendingConcurs from '../../../Components/CardCustomMini/CardCustomMini'
import NotFoundContest from '../../../Components/NotFoundContest/NotFoundContest'

export default function PendingConcurs({concurs=[]}) {
  if(concurs.length === 0){
    return <NotFoundContest/>
  }
  return (
    <div>
        {concurs.map((concursItem) => concursItem.map((item,index)=>(
          <CardPendingConcurs concurs={item} key={index}/>
        )))}
    </div>
  )
}

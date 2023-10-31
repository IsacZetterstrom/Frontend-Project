import React from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'

import '../../styling/components/_confirmPopUpModal.scss'
import { formatDateOrTime, formatDateStringToSwedish, getMovieEndTime } from '../../utils/dateUtils'

function ConfirmPopUpPage({popUpData}) {
  return (
    <div className="confirm-wrapper-bg">
      <div className='confirm-wrapper d-flex flex-column align-items-center p-4'>
        
        <h1 className='mb-4'>Tack för din bokning</h1>
        
        <Row>
          <Col xs={4} >
            <Image src='https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg' fluid className="max-200 max-300"></Image>
          </Col>
          <Col xs={8} className='d-flex flex-column justify-content-between'>
            <Row>
              <h2>{popUpData.title}</h2>
              <p>{formatDateStringToSwedish(popUpData.dateAndTime)}</p>
              <p>
                {getMovieEndTime(popUpData.dateAndTime, popUpData.runtime)}
              </p>
              <p>{popUpData.saloon}, {popUpData.seats}</p>
              <p><span className='bold'>Pris: </span>{popUpData.priceSum}kr</p>
            </Row>
            <Row>
              <p>{popUpData.email}</p>
              <p><span className='bold'>Bokningsnummer: </span>{popUpData.bookingRef}</p>
            </Row>
          </Col>
        </Row>

        <h3 className='my-3'>Bokningsdetaljer har skickats till din mail</h3>
        
        <Button variant='custom'>Stäng</Button>
      </div>
    </div>
  )
}

export default ConfirmPopUpPage
import React from 'react';
import {Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button } from 'reactstrap';

const CardComponent = (props) => {
  return (
  <div className='CardBody'>
    <Card>
      <CardImg top width='100%' src={props.ImageSrc} alt='Card image' className='CardImage'/>
      <CardBody>
        <CardTitle>{props.title}</CardTitle>
        <CardSubtitle>{props.subtitle}</CardSubtitle>
        <CardText>{props.text}</CardText>
        <Button href={props.link}>Join</Button>
      </CardBody>
    </Card>
  </div>
  );
};

export default CardComponent;
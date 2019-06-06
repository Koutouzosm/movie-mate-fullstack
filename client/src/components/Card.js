import React from 'react';

const Card = props => {
  return (

    <div className='card text-center animated flipInX' value={props.movieId}>
      {props.title ? (
        <h3 className='card-header'>{props.title}</h3>
      ) : ""}

      {props.image ? (
        <img onClick={props.secondSearch ? () => props.reRun(props.title) : null} value={props.title} src={`http://image.tmdb.org/t/p/w185/${props.image}`} alt={props.title} className='card-img' />
      ) : ""}

      {props.vote ? (
        <h1 className='card-header'>Vote Average: {props.vote}</h1>
      ) : ""}

     
      <div className='card-body'>
        {props.children}
      </div>
    </div>
  )
}

export default Card;


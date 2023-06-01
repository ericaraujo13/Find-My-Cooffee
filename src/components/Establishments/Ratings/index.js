import React, { Fragment, useEffect, useState } from 'react';
import Form from './Form';
import StoreService from '../../../services/store.js';
import ReactStars from "react-rating-stars-component";

const Ratings = (props) => {
  const [store, setStore] = useState([]);

  useEffect(() => {
    loadStore();
  }, [props.place]);

  async function loadStore() {
    setStore([]);
    try {
      const response = await StoreService.show(props.place.place_id);
      setStore(response.data);
    } catch (error) {
      setStore([]);
    }
  }


  return (
    <Fragment>
      <h4 className='bg-white text-black rounded-lg p-1 my-2 font-bold'>
        { store.ratings_count || 0 } Avaliações
        <span className='flex justify-center bg-black rounded-lg p-1 mx-12 mb-2'>
          { store.ratings_average && <ReactStars edit={false} value={store.ratings_average || 0} /> }
        </span>
      </h4>
      {
        store.ratings &&
        <div className='space-y-2 my-2'>
          {
            store.ratings.map((rating, index) => {
              return (
                <div key={index} className='text-center bg-white text-black rounded-lg p-2'>
                  <strong>{rating.user_name}</strong>
                  <p>{rating.opinion}</p>
                  <div className='flex justify-center bg-black rounded-lg w-1/2 mx-12 mb-2'>
                    <ReactStars edit={false} value={rating.value} />
                  </div>
                  <p className='text-xs'>{rating.date}</p>
                </div>
              )
            })
          }
        </div>
      }
      <Form place={props.place} loadStore={loadStore}/>
    </Fragment>
  )
}

export default Ratings;

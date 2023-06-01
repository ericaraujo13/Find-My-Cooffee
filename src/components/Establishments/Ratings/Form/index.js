import React, { useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import styled from 'styled-components';
import RatingService from '../../../../services/rating';

const NewRating = styled.div`
  padding-bottom: 50px;
`
const Input = styled.input`

`
const TextArea = styled.textarea`

`
const Button = styled.button`

`

const Form = (props) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [value, setValue] = useState(1);

  async function handleSubmit(e) {
    e.preventDefault();

    const store_params = {
      latitude: props.place.geometry.location.lat,
      longitude: props.place.geometry.location.lng,
      name: props.place.name,
      address: props.place.formatted_address,
      google_place_id: props.place.place_id
    }

    const rating_params = {
      value: (value == null) ? 1 : value,
      opinion: message,
      user_name: name
    }

    await RatingService.create(store_params, rating_params);

    props.loadStore()

    setName('');
    setMessage('');
  }


  return (
    <NewRating className='text-center'>
      <h4>Deixe sua Opinião</h4>

      <form onSubmit={handleSubmit}>
        <Input name="name"
          type="text"
          className='rounded-md p-2 w-full text-black'
          placeholder="Digite seu nome"
          onChange={(e) => setName(e.target.value)}
          value={name} />

        <TextArea name="message"
          className="textarea mt-2 rounded-md w-full p-2 text-black"
          placeholder="Sua opinião"
          onChange={(e) => setMessage(e.target.value)}
          value={message}></TextArea>

        <div>
          <label>Quantas estrelas esse lugar merece?</label>
          <div className='flex justify-center'>
            <ReactStars count={5} size={24} activeColor="#ffd700"
              value={value}
              onChange={(e) => setValue(e)} />
          </div>
          <Button type="submit" className="button is-danger bg-yellow-900 p-2 rounded-lg hover:bg-yellow-800 font-semibold w-1/2">Enviar</Button>
        </div>
      </form>
    </NewRating>
  )
}

export default Form;

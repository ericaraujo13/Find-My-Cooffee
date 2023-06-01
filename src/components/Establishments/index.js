import React, {useState, useEffect} from 'react';
import EstablishmentsService from '../../services/establishments_service';
import Ratings from './Ratings';

import styled from 'styled-components';

const LeftBar = styled.div`
  height: 100%;
  overflow-y: auto;
  width: 250px;
  position: absolute;
  color: white;
  background-color: rgba(10,10,10,0.9);
  padding: 20px;
`
const Title = styled.h1`

`

const Paragraph = styled.p`
  line-height: 14px;
`

const Image = styled.img`
  height: 150px;
  width: 100%;
`



const Establishment = (props) => {
  const [establishment, setEstablishment] = useState([]);
  const { REACT_APP_GOOGLE_API_KEY } = process.env;

  useEffect(() => {
    getEstablishmentInformations();
  }, [props.place])

  async function getEstablishmentInformations() {
    try {
      console.log(props.place.place_id)
      const response = await EstablishmentsService.show(props.place.place_id);
      setEstablishment(response.data.result);
    } catch (error) {
      setEstablishment([]);
    }
  }

  return(
    <LeftBar className='text-center'>
      {
        (establishment.photos) ?
          <Image className='rounded-lg mb-2' src={`
            https://maps.googleapis.com/maps/api/place/photo?photoreference=${establishment.photos[0].photo_reference}&key=${REACT_APP_GOOGLE_API_KEY}&maxwidth=400
            `} alt="Coffee Photo"
          />
          : <Image src="/images/no_photo.jpg" alt="Coffee no Photo"/>
      }
        <Title className='text-white text-2xl font-bold'>{establishment.name}</Title>
      {
        (establishment.opening_hours) ?
          <div className='space-y-1'>
            <div className='bg-white rounded-lg w-auto text-sm text-black mx-16 mb-2 font-semibold'>
              { (establishment.opening_hours.open_now === true) ? "Aberto" : "Fechado" }
            </div>
            <hr/>
            <div className='space-y-1 font-semibold p-2 text-xs'>
            {
              establishment.opening_hours.weekday_text.map((schedule, index) => {
                return(<Paragraph key={index}>{schedule}</Paragraph>)
              })
            }
            </div>
        </div>
      : <Paragraph className='bg-white rounded-lg text-red-600 font-bold p-2 mb-2 text-xs'>"Não há cadastro de dias e horários abertos"</Paragraph>
      }
      <hr/>
      <h1 className='my-1 bg-white rounded-lg text-black mx-12 text-md font-semibold mt-2'>Endereço</h1>
      <Paragraph className='my-4'>{establishment.formatted_address}</Paragraph>
      <hr/>
      <Ratings place={props.place} />
    </LeftBar>
  )
}

export default Establishment;

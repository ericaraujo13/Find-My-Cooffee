import React, { useEffect, useState } from 'react';
import StoreService from '../../services/store';
import styled from 'styled-components';
import ReactStars from "react-rating-stars-component";

const RightBar = styled.div`
  width: 250px;
  position: absolute;
  color: white;
  right: 0;
  top: 0;
`
const Head = styled.div`
  background-color: rgba(10,10,10,0.9);
  border-radius: 6px;
  padding: 2px;
  text-align: center;
  margin: 10px;
`
const Body = styled.div`
  background-color: rgba(10,10,10,0.9);
  border-radius: 6px;
  padding: 20px;
  height: 450px;
  overflow-y: auto;
  margin: 10px;
`
const Footer = styled.div`
  background-color: rgba(10,10,10,0.9);
  border-radius: 6px;
  padding: 10px 20px 20px 20px;
  font-size: 13px;
  margin: 10px;
`
const EstablishmentItem = styled.div`
  cursor: pointer;
`
const Title = styled.h1`
  font-size: 18px;
`
const Paragraph = styled.p`
  font-size: 13px;
  line-height: 14px;
`

const NearstCoffees = (props) => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    loadNearstStores();
  }, [props.latitude]);

  async function loadNearstStores() {
    const response = await StoreService.index(props.latitude, props.longitude);
    setStores(response.data);
  }

  return (
    <RightBar>
      <Head>
        <h3 className='text-2xl p-2 font-bold'>Find My Coffee</h3>
      </Head>

      <Body className='text-center space-y-2'>
        <strong>Mais amados na região</strong>
        <hr />
        <div className='bg-white rounded-lg p-2 border-black h-auto'>
          {
            stores.map(store => {
              return (
                <EstablishmentItem className='text-lg text-center mt-2 text-black' key={store.name}>
                  <Title>{store.name}</Title>

                  <Paragraph>
                    {store.address}
                  </Paragraph>

                  { store.ratings_count || 0 } Opiniões
                  <div className='flex justify-center bg-black rounded-lg'>
                    <ReactStars edit={false} value={store.ratings_average || 0} />
                  </div>
                </EstablishmentItem>
              )
            })
          }
        </div>
      </Body>

      <Footer>
        <Paragraph className='text-xl font-semibold flex text-center'>
          Projeto Open Source desenvolvido na Semana Super Full
          Stack da escola online de programação OneBitCode
        </Paragraph>
        <h2 className='flex text-center ml-3 mt-2 font-semibold'>Desenvolvido por: Eric Araujo</h2>
      </Footer>
    </RightBar>
  )
}

export default NearstCoffees;

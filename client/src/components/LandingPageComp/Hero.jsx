import Image from 'react-bootstrap/Image';

function Hero({data}) {

  if(data){
    return (
      <>
     <Image src={data.Image} fluid />
      </>
  )
  }
   
}

export default Hero
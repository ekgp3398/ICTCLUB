import {useState, useRef} from 'react'
import Slider from 'react-slick'
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './Carousel.css'

export default function Carousel() {
  const sliderRef = useRef();
  //const [sliderRef, setSliderRef] = useState(null)
  
  const next = () => {
    sliderRef.current.slickNext();
  }
  const previous = () => {
    sliderRef.current.slickPrev();
  }

  const sliderSettings = {
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: false,
    responsive: [
      {  
        breakpoint: 1200, //화면 사이즈 960px일 때
        settings: {
          //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
          slidesToShow:3,
          slidesToScroll: 3
        } 
      },
      {  
        breakpoint: 960, //화면 사이즈 960px일 때
        settings: {
          //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
          slidesToShow:2,
          slidesToScroll: 2
        } 
      },
      { 
        breakpoint: 680, //화면 사이즈 768px일 때
        settings: {	
          //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
          slidesToShow:1,
          slidesToScroll: 1
        } 
      }
  ]
  }

  const hotelCards = [
    {
      imageSrc:
        'https://wary-engine-f63.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F1b8ebc13-41f7-45f0-8861-69020c70c9dd%2Fict-test.png?table=block&id=d5edc6cd-a843-4554-afd5-28ecd14794b9&spaceId=7233d2af-2a90-4e86-b35c-90cc43cebfba&width=2000&userId=&cache=v2',      
      title: 'CLUB TEST',
      description: 'ICT융합공학부 동아리 추천 TEST',
      clubSrc: 'https://statuesque-dragon-82f07a.netlify.app'
    },
    {
      imageSrc:
        'https://kangnamict.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F2d3835dd-4231-47d4-b005-171d8e40862e%2FUntitled.png?table=block&id=d37c72a5-3797-4ed4-981d-aeddd2fc92f9&spaceId=6db69627-aa4f-47e0-90c5-2e445496857b&width=2000&userId=&cache=v2',
      title: 'AUNAE',
      description: '소프트웨어 전공 동아리',
      clubSrc: 'https://kangnamict.notion.site/5810254dc77a47b8b490af670489fe75'
    },
    {
      imageSrc:
        'https://kangnamict.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fc0cfd558-9e37-4328-8799-a576cc5a9348%2FUntitled.png?table=block&id=c1cc4332-8d25-4341-af61-fa708961edd3&spaceId=6db69627-aa4f-47e0-90c5-2e445496857b&width=2000&userId=&cache=v2',
      title: 'CELL',
      description: '소프트웨어 전공 동아리',
      clubSrc: 'https://kangnamict.notion.site/f9780eb7a842468fa37b6457f551ed96'
    },
    {
      imageSrc:
        'https://kangnamict.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F28f35181-cd66-4e82-9546-57f211b529f2%2FUntitled.png?table=block&id=a9344a22-63e1-45f5-bcff-bc239afb62ff&spaceId=6db69627-aa4f-47e0-90c5-2e445496857b&width=2000&userId=&cache=v2',
      title: 'NETAPP',
      description: '소프트웨어 전공 동아리',
      clubSrc: 'https://kangnamict.notion.site/65416c3b2b2f46bf86e2d33d7f33eb6d'
    },
    {
      imageSrc:
        'https://kangnamict.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fe4ec081f-d696-4d2e-95ca-faae0f70974e%2FUntitled.png?table=block&id=0839c966-5fd1-434b-b959-83e385b493b1&spaceId=6db69627-aa4f-47e0-90c5-2e445496857b&width=2000&userId=&cache=v2',
      title: 'KIS',
      description: '소프트웨어 전공 동아리',
      clubSrc: 'https://kangnamict.notion.site/KIS-0943b70d9c664fd59d6e74542fcd672f'
    },
    {
      imageSrc:
        'https://kangnamict.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F08a10b11-93ad-4749-925e-de9c41517d42%2FUntitled.png?table=block&id=b9653545-866f-45fe-8110-4eccf5a49a06&spaceId=6db69627-aa4f-47e0-90c5-2e445496857b&width=2000&userId=&cache=v2',
      title: 'MAWS',
      description: '소프트웨어 전공 동아리',
      clubSrc: 'https://kangnamict.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F08a10b11-93ad-4749-925e-de9c41517d42%2FUntitled.png?table=block&id=b9653545-866f-45fe-8110-4eccf5a49a06&spaceId=6db69627-aa4f-47e0-90c5-2e445496857b&width=2000&userId=&cache=v2'
    },
    {
      imageSrc:
        'https://kangnamict.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F26bdb263-074f-430f-aea6-309d13210b1c%2FUntitled.png?table=block&id=b17681a2-7ae1-4905-b774-0532ffe0c86c&spaceId=6db69627-aa4f-47e0-90c5-2e445496857b&width=2000&userId=&cache=v2',
      title: 'CAVE',
      description: '가상현실 전공 동아리',
      clubSrc: 'https://kangnamict.notion.site/CAVE-e54bbd565d814d1d95642dcade46e8b2'
    },
    {
      imageSrc:
        'https://kangnamict.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fe222b46a-4daf-4c8a-b4ae-02b2c79fcac3%2FUntitled.png?table=block&id=4cfa0cfb-1f69-4e4e-a320-369a3b9ab902&spaceId=6db69627-aa4f-47e0-90c5-2e445496857b&width=2000&userId=&cache=v2',
      title: 'Motiv',
      description: '가상현실 전공 동아리',
      clubSrc: 'https://kangnamict.notion.site/Motiv-d2ffd14fc3364da4a14558d610449dbe'
    },
    {
      imageSrc:
        'https://kangnamict.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fe9d8f839-f1cd-4245-843c-036654967c2a%2FUntitled.png?table=block&id=5b8c3a08-a3cd-4433-89c3-a8209c788246&spaceId=6db69627-aa4f-47e0-90c5-2e445496857b&width=2000&userId=&cache=v2',
      title: 'MCL',
      description: '전자공학 전공 동아리',
      clubSrc: 'https://kangnamict.notion.site/MCL-cc3bec6dac0e449f85b65f8c09fce348'
    },
    {
      imageSrc:
        'https://kangnamict.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8bb55dd4-c749-477d-b5b5-0bbe2419c27a%2FUntitled.png?table=block&id=983f4cce-6d63-45b6-8fd5-641f6c74479b&spaceId=6db69627-aa4f-47e0-90c5-2e445496857b&width=2000&userId=&cache=v2',
      title: 'ISL',
      description: '전자공학 전공 동아리',
      clubSrc: 'https://kangnamict.notion.site/ISL-cc4b44fcbb3f42fe82d08a598c986814'
    }
    
    
  ]

  return (
    <div className='content'>
      <div className = "btn_container">
      <Navbar>
            <Container>
                <Navbar.Brand className = "HeaderTitle">동아리</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <Button variant="outline-dark" size="sm" className = "prev" onClick={previous}>
                      <FaChevronLeft />
                    </Button>
                    <Navbar.Text>
                    <Button variant="outline-dark" size="sm" className = "next"  onClick={next}>
                      <FaChevronRight />
                    </Button>
                    </Navbar.Text>
                </Navbar.Text>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        
      </div>
      <Slider ref={sliderRef} {...sliderSettings}>
        {hotelCards.map((card, index) => (
          <div key={index}>
            <h4>{card.title}</h4>
            <p>{card.description}</p>
            <a href = {card.clubSrc} target = "_blank">
              <img src={card.imageSrc} width="230" />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  )
}
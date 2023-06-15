import Slider from "react-slick";
import "./slick.scss";
import "./slick-theme.scss";
import TagButton from "../TagButton/TagButton";
import prevArrow  from '../../assets/images/icons/prevArrow.svg';
import nextArrow from "../../assets/images/icons/nextArrow.svg";

const arrayTagButton = [
  { id: 1, name: "Все", color: "red" },
  { id: 1, name: "Точные науки", color: "red" },
  { id: 2, name: "Програмирования", color: "blue" },
  { id: 3, name: "Рисования", color: "gray" },
  { id: 4, name: "Гуманитарные науки", color: "orange" },
  { id: 5, name: "3D Модели", color: "purple" },
  { id: 6, name: "Эссе", color: "black" },
  { id: 7, name: "Сценарий", color: "green" },
];


  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="custom-arrow custom-prev-arrow" onClick={onClick}>
        <img src={prevArrow} alt="prev arrow"/>
      </button>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="custom-arrow custom-next-arrow" onClick={onClick}>
        <img src={nextArrow} alt="next arrow" />
      </button>
    );
  };

let settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  initialSlide: 0,
  cssEase: "linear",
  prevArrow: <CustomPrevArrow/>,
  nextArrow: <CustomNextArrow/>
};

const SliderCustom = ({className}) => {
  return (
    <div className={className}>
      <Slider {...settings}>
        {arrayTagButton.map((item, index) => (
          <TagButton key={index} tag={item} />
        ))}
      </Slider>
    </div>
  );
};

export default SliderCustom;

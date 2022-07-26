import Caseroul from "../layouts/Caseroul";
import SliderProduct from "../layouts/SliderProduct";
import "./Home.css";
import { Data2, DATA } from "../../../data/Data";
import Slider from "react-slick";

const Home = () => {

  return (
    <div className="Home">
      <Caseroul />
      
       
      <SliderProduct data={Data2} />
    </div>
  );
};

export default Home;

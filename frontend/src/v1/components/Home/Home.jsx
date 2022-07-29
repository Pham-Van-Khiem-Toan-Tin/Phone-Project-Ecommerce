import Caseroul from "../layouts/Caseroul";
import SliderProduct from "../layouts/SliderProduct";
import "./Home.css";
import { Data2 } from "../../../data/Data";
const Home = () => {
  return (
    <div className="Home">
      <Caseroul />
      <div className="container pt-2 d-flex flex-row justify-content-between">
        <h3>Những hãng nổi bật</h3>
        <h4>Xem tiếp</h4>
      </div>
      <SliderProduct data={Data2} />
      <div className="container pt-2 d-flex flex-row justify-content-between">
        <h3>Những hãng nổi bật</h3>
        <h4>Xem tiếp</h4>
      </div>
      <SliderProduct data={Data2} />
      <div className="container pt-2 d-flex flex-row justify-content-between">
        <h3>Những hãng nổi bật</h3>
        <h4>Xem tiếp</h4>
      </div>
      <SliderProduct data={Data2} />
      <div className="container pt-2 d-flex flex-row justify-content-between">
        <h3>Những hãng nổi bật</h3>
        <h4>Xem tiếp</h4>
      </div>
    </div>
  );
};

export default Home;

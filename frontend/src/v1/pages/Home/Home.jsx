import Caseroul from "../../components/layouts/Caseroul";
import SliderProduct from "../../components/layouts/SliderProduct";
import "./Home.css";
import { Data2 } from "../../../data/Data";
import { FaShippingFast, FaHandsHelping, FaUserCog } from "react-icons/fa";
const Home = () => {
  return (
    <div className="Home" >
      <Caseroul />
      <div className="container mt-2">
        <div className="row">
          <div className="col">
            <FaShippingFast className="d-block fs-1 mx-auto" style={{color: "#712cf9"}} />
            <p className="fs-3 text-center fw-bold" style={{color: "#712cf9"}}>Giao hàng nhanh</p>
          </div>
          <div className="col" style={{borderLeft: "1px solid #712cf9",borderRight: "1px solid #712cf9"}}>
            <FaHandsHelping className="d-block fs-1 mx-auto" style={{color: "#712cf9"}} />
            <p className="fs-3 text-center fw-bold" style={{color: "#712cf9"}}>Hỗ trợ trả góp</p>
          </div>
          <div className="col">
            <FaUserCog className="d-block fs-1 mx-auto" style={{color: "#712cf9"}} />
            <p className="fs-3 text-center fw-bold" style={{color: "#712cf9"}}>Bảo hành lâu dài</p>
          </div>
        </div>
      </div>
      <div className="container pt-2 d-flex flex-row justify-content-between">
        <h3>Những hãng nổi bật</h3>
        <h4>Xem tiếp</h4>
      </div>
      <SliderProduct data={Data2} />
    </div>
  );
};

export default Home;

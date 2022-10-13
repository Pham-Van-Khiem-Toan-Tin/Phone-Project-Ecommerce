
import SliderProduct from "../../components/layouts/SliderProduct";
import "./Home.css";
import { Data2, Data3, DATA4 } from "../../../data/Data";
import { FaShippingFast, FaHandsHelping, FaUserCog , FaFireAlt } from "react-icons/fa";
import CountdownTimer from "../../components/CountDown/CountDown";
const Home = () => {
  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();
  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;
  return (
    <div className="Home" style={{width: "100vw"}} >
      <div className="container mt-2">
        <div className="row">
          <div className="col">
            <FaShippingFast className="d-block fs-1 mx-auto" style={{color: "#ffff"}} />
            <p className="fs-3 text-center fw-bold" style={{color: "#ffff"}}>Giao hàng nhanh</p>
          </div>
          <div className="col" style={{borderLeft: "1px solid #ffff",borderRight: "1px solid #ffff"}}>
            <FaHandsHelping className="d-block fs-1 mx-auto" style={{color: "#ffff"}} />
            <p className="fs-3 text-center fw-bold" style={{color: "#ffff"}}>Hỗ trợ trả góp</p>
          </div>
          <div className="col">
            <FaUserCog className="d-block fs-1 mx-auto" style={{color: "#ffff"}} />
            <p className="fs-3 text-center fw-bold" style={{color: "#ffff"}}>Bảo hành lâu dài</p>
          </div>
        </div>
      </div>
      <div className="container hot_sale">
        <div className="hot_sale_header d-flex flex-row flex-wrap">
          <div className="hot_sale-button d-flex flex-md-row flex-column align-items-center justify-content-center">
            <button className="p-0">Điện thoại</button>
            <button className="p-0">Phụ kiện</button>
          </div>
          <div className="mx-auto hot_sale-content">
            Hot sale tuần này <FaFireAlt />
          </div>
          <div className="hot_sale-timeCountDown d-flex flex-md-row flex-column align-items-center justify-content-center">
            <span className="fs-5 fw-bold">Kết thúc sau: </span>
            <CountdownTimer targetDate={dateTimeAfterThreeDays}/>
          </div>
        </div>
        <div className="hot_sale-slider">
          <SliderProduct data={Data3} />
        </div>
      </div>
      <div className="container hot pt-2 d-flex flex-row justify-content-between align-items-center">
        <h3 className="text-uppercase">Điện thoại nổi bật</h3>
        <button>Xem tiếp</button>
      </div>
      <SliderProduct data={Data2} />
      <div className="container hot pt-2 d-flex flex-row justify-content-between align-items-center">
        <h3 className="text-uppercase">Âm Thanh</h3>
        <button>Xem tiếp</button>
      </div>
      <SliderProduct data={DATA4} row={2} />
      <div className="container hot pt-2 d-flex flex-row justify-content-between align-items-center">
        <h3 className="text-uppercase">Phụ kiện nổi bật</h3>
        <button>Xem tiếp</button>
      </div>
      <SliderProduct data={Data2} />
    </div>
  );
};

export default Home;

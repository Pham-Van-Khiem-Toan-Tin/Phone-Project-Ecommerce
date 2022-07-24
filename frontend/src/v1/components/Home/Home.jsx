import { Data2, Data3 } from "../../../data/Data";
import Caseroul from "../layouts/Caseroul";
import { BsChevronDoubleRight } from "react-icons/bs";
import "./Home.css"

const Home = () => {
  return (
    <>
      <Caseroul />
      <div className="container d-flex fs-3 py-2 flex-row justify-content-between" >
        <div>Sản phẩm nổi bật</div>
        <div>Xem thêm <BsChevronDoubleRight /></div>
      </div>
      <div className="container">
        <div className="row">
          {Data2.map((data, index) => {
            return (
              <div className="col-sm-6 col-md-3 col-lg-3 p-2 trending" key={index}>
                <div className="card w-sm-50 w-lg-20">
                  <img
                    src={data.img}
                    className="card-img-top"
                    alt={data.title}
                  />
                  <div className="card-body">
                    <div className="btn w-100 btn-danger btn1">Add to cart</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="container d-flex fs-3 py-2 flex-row justify-content-between" >
        <div>SAMSUNG</div>
        <div>Xem thêm <BsChevronDoubleRight /></div>
      </div>
      <div className="container">
        <div className="row">
          {Data2.map((data, index) => {
            return (
              <div className="col-sm-6 col-md-3 col-lg-3 p-2 trending" key={index}>
                <div className="card w-sm-50 w-lg-20">
                  <img
                    src={data.img}
                    className="card-img-top"
                    alt={data.title}
                  />
                  <div className="card-body">
                    <div className="btn w-100 btn-danger btn1">Add to cart</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container d-flex fs-3 py-2 flex-row justify-content-between" >
        <div>IPHONE</div>
        <div>Xem thêm <BsChevronDoubleRight /></div>
      </div>
      <div className="container">
        <div className="row">
          {Data2.map((data, index) => {
            return (
              <div className="col-sm-6 col-md-3 col-lg-3 p-2 trending" key={index}>
                <div className="card w-sm-50 w-lg-20">
                  <img
                    src={data.img}
                    className="card-img-top"
                    alt={data.title}
                  />
                  <div className="card-body">
                    <div className="btn w-100 btn-danger btn1">Add to cart</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="container fs-3 py-2" >
        Chuyên trang thương hiệu
      </div>
      <div className="container">
        <div className="row mx-auto">
          {Data3.map((data, index) => {
            return (
              <div className="col-sm-6 col-md-3 col-lg-3 px-0" key={index}>
                <img src={data.img} alt={data.title} className="h-auto trendingbrand mb-2" style={{borderRadius: "10px"}}/>
              </div>
            );
          })}
        </div>
      </div>
    </>
    
  );
};

export default Home;

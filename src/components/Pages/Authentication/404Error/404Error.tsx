import React from "react";
import { Link } from "react-router-dom";
import * as Switcherdatacustam from "../../../../data/Switcherdata/Switcherdatacustam";
export const Error404 = () => {
  return (
    <div>
      <div className="square-box">
        {" "}
        <div></div> <div></div> <div></div> <div></div> <div></div> <div></div>{" "}
        <div></div> <div></div> <div></div> <div></div> <div></div> <div></div>{" "}
        <div></div> <div></div> <div></div>{" "}
      </div>
      <div
        className="page"
        onClick={() => Switcherdatacustam.Swichermainrightremove()}
      >

        {/* <!-- Main-error-wrapper --> */}
        <div className="main-error-wrapper page page-h">
          <div>
            <h1 className="text-white">
              404<span className="tx-20">error</span>
            </h1>
            <h2 className="text-white">
              Trang bạn đang tìm không tồn tại.
            </h2>
            <h6 className="tx-white-6">
              Bạn có thể đã điền sai đường dẫn hoặc trang này đã bị xóa.
            </h6>
            <Link
              className="btn btn-light"
              to="/"
            >
              Quay lại trang chủ
            </Link>
          </div>
        </div>
        {/* <!-- /Main-error-wrapper --> */}
      </div>
    </div>
  );
};

Error404.propTypes = {};

Error404.defaultProps = {};

export default Error404;

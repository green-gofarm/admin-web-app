import React from "react";
import PageHeader from "../../../General/PageHeader";
import { breadcrumb } from "./setting";
import { Grid } from "@mui/material";
import { overviewData, revenueData } from "./data";
import StatisticCardOverviewGroup from "../../../General/Statistic/StatisticCardOverviewGroup";
import { Button, Card } from "react-bootstrap";
import RevenueStatisticChar from "./RevenueStatisticChar";
import MuiTables from "../../../Mui-Table/MuiTable";
import { useNavigate } from "react-router-dom";

export default function Overview() {

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <PageHeader
        title="Tổng quan"
        breadcrumb={breadcrumb}
      />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <StatisticCardOverviewGroup
            data={overviewData}
            spacing={2}
            responsive={{
              xs: 12,
              sm: 6,
              xl: 3
            }}
          />
        </Grid>

        <Grid item xs={12} lg={8}>
          <Card className="custom-card overflow-hidden">
            <Card.Header className=" border-bottom-0 d-flex">
              <h3 className="card-title mb-2 ">Doanh thu</h3>
              <div className="card-options ms-auto">
                <div className="btn-group p-0">
                  <Button
                    className="btn btn-light btn-sm"
                    type="button"
                    variant=""
                  >
                    Tháng
                  </Button>
                  <Button
                    className="btn btn-outline-light btn-sm"
                    type="button"
                    variant=""
                  >
                    Năm
                  </Button>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <RevenueStatisticChar />
            </Card.Body>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <MuiTables
            title="Chi tiết doanh thu"
            data={revenueData}
            columns={[
              {
                key: "label",
                label: "",
                align: "right"
              },
              {
                key: "value",
                label: "",
                align: "left"
              },
            ]}
            noPaging
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <MuiTables
            title="Farmstay cần duyệt (10)"
            data={[]}
            columns={[]}
            noPaging
            panel={
              <Button
                className="btn btn-primary mb-3 shadow"
                variant=""
                onClick={() => navigate("/management/farmstay")}
              >
                Đến quản lý
              </Button>
            }
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <MuiTables
            title="Tài khoản mới đăng ký"
            data={[]}
            columns={[]}
            noPaging
            panel={
              <Button
                className="btn btn-primary mb-3 shadow"
                variant=""
                onClick={() => navigate("/management/account/customer")}
              >
                Đến quản lý
              </Button>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <MuiTables
            title="Đơn mới"
            data={[]}
            columns={[]}
            noPaging
            panel={
              <Button
                className="btn btn-primary mb-3 shadow"
                variant=""
                onClick={() => navigate("/management/order")}
              >
                Đến quản lý
              </Button>
            }
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

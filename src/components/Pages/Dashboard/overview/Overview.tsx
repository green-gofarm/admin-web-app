import React from "react";
import PageHeader from "../../../General/PageHeader";
import { breadcrumb } from "./setting";
import { Box, Grid } from "@mui/material";
import { overviewData, revenueData } from "./data";
import StatisticCardOverviewGroup from "../../../General/Statistic/StatisticCardOverviewGroup";
import { Button, Card } from "react-bootstrap";
import RevenueStatisticChar from "./RevenueStatisticChar";
import MuiTables from "../../../Mui-Table/MuiTable";
import OrderTable from "./OrderTable";

export default function Overview() {

  return (
    <Box marginBottom="1.3rem">
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

        <Grid item xs={12}>
          <OrderTable />
        </Grid>
      </Grid>
    </Box>
  );
}

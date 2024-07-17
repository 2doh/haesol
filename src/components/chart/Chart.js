import { ResponsiveBar } from "@nivo/bar";
import data from "../../api/json/chartTempdata.json";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import "../../scss/chart/chart.scss";

const Chart = () => {
  const subjects = [
    { name: "국어" },
    { name: "수학" },
    { name: "바른 생활" },
    { name: "사회/도덕" },
    { name: "과학" },
    { name: "영어" },
    { name: "실과" },
    { name: "체육" },
    { name: "음악" },
    { name: "미술" },
  ];

  const { studentPk } = useParams();
  const [initSubjects, setInitSubjects] = useState(subjects);

  useEffect(() => {}, []);

  return (
    <div className="chart-wrap">
      <div className="exam-table">
        <div className="property">
          <div className="frame">
            <div className="text-wrapper">중간고사</div>
          </div>
        </div>
      </div>
      <div className="info-content">
        <div className="info-content-inner">
          {initSubjects.map((item, index) => (
            <div className="info-content-subjectlist" key={index}>
              <span>{item.name}</span>
            </div>
          ))}
          <div className="chart-content">
            <div className="chart-content-statistics">
              <div style={{ width: "100%", height: 400 }}>
                <ResponsiveBar
                  data={data}
                  keys={["hhh", "burger"]}
                  indexBy="평균"
                  margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                  padding={0.3}
                  groupMode="grouped"
                  colors={{ scheme: "nivo" }}
                  maxValue={100}
                  axisLeft={{
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
                    truncateTickAt: 0,
                  }}
                  legends={[
                    {
                      dataFrom: "keys",
                      anchor: "bottom-right",
                      direction: "column",
                      translateX: 120,
                      translateY: 0,
                      itemsSpacing: 3,
                      itemWidth: 100,
                      itemHeight: 20,
                      symbolSize: 20,
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemOpacity: 1,
                          },
                        },
                      ],
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;

import { ResponsiveBar } from "@nivo/bar";
import data from "../../api/json/chartTempdata.json";
import { useParams } from "react-router";

const Chart = () => {
  const { studentPk } = useParams();
  console.log(studentPk);
  const subjects = [
    "국어",
    "수학",
    "바른 생활",
    "사회/도덕",
    "과학",
    "영어",
    "실과",
    "체육",
    "음악",
    "미술",
  ];

  return (
    <div className="chart-wrap">
      <div className="chart-navi"></div>
      <div className="chart-content">
        <div className="chart-content-subjectlist"></div>
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
  );
};

export default Chart;

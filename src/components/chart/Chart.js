import { ResponsiveBar } from "@nivo/bar";
import { useEffect, useState } from "react";
import "../../scss/chart/chart.scss";

const Chart = ({ recentExam, children }) => {
  const subjects = [
    { name: "국어", score: 0, classAvg: 0, gradeAvg: 0 },
    { name: "수학", score: 0, classAvg: 0, gradeAvg: 0 },
    { name: "바른 생활", score: 0, classAvg: 0, gradeAvg: 0 },
    { name: "사회/도덕", score: 0, classAvg: 0, gradeAvg: 0 },
    { name: "과학", score: 0, classAvg: 0, gradeAvg: 0 },
    { name: "영어", score: 0, classAvg: 0, gradeAvg: 0 },
    { name: "실과", score: 0, classAvg: 0, gradeAvg: 0 },
    { name: "체육", score: 0, classAvg: 0, gradeAvg: 0 },
    { name: "음악", score: 0, classAvg: 0, gradeAvg: 0 },
    { name: "미술", score: 0, classAvg: 0, gradeAvg: 0 },
  ];

  useEffect(() => {
    const initData = recentExam.filter(item => item.name === "국어");
    const obj = {
      name: "국어",
      score: initData[0].mark,
      classAvg: initData[0].mark,
      gradeAvg: initData[0].gradeAvg,
    };
    setSelectSubject(obj);
  }, [recentExam]);

  const [initSubjects, setInitSubjects] = useState(subjects);
  const [selectSubject, setSelectSubject] = useState({});
  const [onSelectStyle, setOnSelectStyle] = useState(false);

  const onSubjectClick = item => {
    setSelectSubject(item);
    setOnSelectStyle(true);
  };

  // 받아온 데이터 평균 성적 순서대로 배열순서 변경
  const subjectList = () => {
    const temp = subjects.map(subject => {
      const recent = recentExam.find(exam => exam.name === subject.name);
      if (recent) {
        return {
          ...subject,
          score: recent.mark,
          classAvg: recent.classAvg,
          gradeAvg: recent.gradeAvg,
        };
      }
      return;
    });
    setInitSubjects(temp);
    // console.log(temp);
  };

  useEffect(() => {
    subjectList();
  }, [recentExam]);

  const tempArr = [
    {
      평균: selectSubject.name,
      내점수: selectSubject.score,
      학급평균: selectSubject.classAvg,
      학년평균: selectSubject.gradeAvg,
    },
  ];

  return (
    <div className="chart-wrap">
      <div className="exam-table">
        <div className="property">
          <div className="frame">
            <div className="text-wrapper" style={{ fontSize: 16 }}>
              {children}
            </div>
          </div>
        </div>
      </div>
      <div className="info-content">
        <div className="info-content-inner">
          <div className="info-content-subject">
            {initSubjects.map((item, index) => (
              <div
                className="info-content-subjectlist"
                key={index}
                onClick={() => {
                  onSubjectClick(item);
                }}
              >
                <span>{item?.name}</span>
              </div>
            ))}
          </div>
          <div className="chart-content">
            <div className="chart-content-statistics">
              <div style={{ width: "100%", height: "100%" }}>
                <ResponsiveBar
                  data={tempArr}
                  keys={["내점수", "학급평균", "학년평균"]}
                  indexBy="평균"
                  margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                  padding={0.4}
                  innerPadding={50}
                  groupMode="grouped"
                  maxValue={100}
                  axisLeft={{
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
                    truncateTickAt: 0,
                  }}
                  theme={{
                    text: { fontSize: 16, fontFamily: "NexonMaplestory" },
                  }}
                  colors={{ scheme: "pastel1" }}
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

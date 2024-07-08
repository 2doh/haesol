import styled from "@emotion/styled";
import { useRef } from "react";

const ClassScheduleStyle = styled.div`
  width: 100%;
  height: 100%;
`;

const ClassSchedule = () => {
  const colorRef = useRef();

  return (
    <ClassScheduleStyle>
      <div className="class-schedule-inner">
        <div className="grid-frame">
          <div className="item class-schedule-week">
            <div className="grid-inner">
              <div className="grid-inner-item">
                <div className="grid-inner-item-text">교시</div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text">월요일</div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text">화요일</div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text">수요일</div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text">목요일</div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text">금요일</div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="grid-inner">
              <div className="grid-inner-item">
                <div className="grid-inner-item-text">1</div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="grid-inner">
              <div className="grid-inner-item">
                <div className="grid-inner-item-text" ref={colorRef}>
                  2
                </div>
              </div>
              <div className="grid-inner-item">
                <div
                  className="grid-inner-item-text"
                  style={
                    {
                      // backgroundColor: extChartHexToRGB(colorRef.current.style),
                      // backgroundColor: colorRef.current.style.background - color,
                    }
                  }
                  onClick={() => {
                    console.log();
                  }}
                ></div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="grid-inner">
              <div className="grid-inner-item">
                <div className="grid-inner-item-text">3</div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="grid-inner">
              <div className="grid-inner-item">
                <div className="grid-inner-item-text">4</div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="grid-inner">
              <div className="grid-inner-item">
                <div className="grid-inner-item-text">5</div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="grid-inner">
              <div className="grid-inner-item">
                <div className="grid-inner-item-text">6</div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="grid-inner">
              <div className="grid-inner-item">
                <div className="grid-inner-item-text">7</div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClassScheduleStyle>
  );
};

export default ClassSchedule;

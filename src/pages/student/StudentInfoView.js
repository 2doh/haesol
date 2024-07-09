import styled from "@emotion/styled";
import { getStudentInfo } from "api/student/studentapi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "../../scss/student/studentEdit.css";
import PhoneInputFields from "./PhoneInputFields";
import StudentImg from "./StudentImg";

const StudentInfoView = () => {
  // 네비게이트
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/grade/1`);
  };

  // 반 정보 > 추후 데이터 받아와서 처리
  const gradeClass = "5학년 7반";

  // 학생 한 명 데이터
  const [studentInfo, setStudentInfo] = useState();
  const [studentName, setStudentName] = useState("");
  const [studentGender, setStudentGender] = useState("");
  const [studentBirth, setStudentBirth] = useState("");
  const [studentPhone, setStudentPhone] = useState("");

  const [parentName, setParentName] = useState("");
  const [connet, setConnet] = useState("");
  const [parentPhone, setParentPhone] = useState("");

  const [studentZoneCode, setStudentZoneCode] = useState("");
  const [studentAddr, setStudentAddr] = useState("");

  const [studentEtc, setStudentEtc] = useState(null);

  const [studentCreatedAt, setStudentCreatedAt] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentClass, setStudentClass] = useState("");

  const stu_id = 2;

  const studentInfoData = async () => {
    try {
      const response = await getStudentInfo(stu_id);
      const result = response.data;
      setStudentInfo(result.data);
      setStudentName(result.data.studentName);
      setStudentGender(result.data.studentGender);
      setStudentBirth(result.data.studentBirth);
      setStudentPhone(result.data.studentPhone);
      setParentName(result.data.parentName);
      setConnet(result.data.connet);
      setParentPhone(result.data.parentPhone);
      setStudentZoneCode(result.data.studentZoneCode);
      setStudentAddr(result.data.studentAddr);
      setStudentEtc(result.data.studentEtc);
      setStudentCreatedAt(result.data.studentCreatedAt);
      setStudentId(result.data.studentId);
      setStudentClass(result.data.studentClass);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // 학생 데이터 불러오기
    console.log("studentInfoData 확인중 : ", studentInfo);
    studentInfoData();
  }, []);

  const prvInfo = [
    {
      prvClass: "1학년 1반",
      prvTeacher: "김누구",
      studentInfoContent: "기록 내용 없음",
    },
    {
      prvClass: "2학년 1반",
      prvTeacher: "김누구",
      studentInfoContent: "기록 내용 없음",
    },
    {
      prvClass: "3학년 1반",
      prvTeacher: "김누구",
      studentInfoContent: "기록 내용 없음",
    },
    {
      prvClass: "4학년 1반",
      prvTeacher: "김누구",
      studentInfoContent: "기록 내용 없음",
    },
  ];
  const [postCode, setPostCode] = useState("우편번호");
  const [address, setAddress] = useState("주소");
  const handleAddClick = e => {
    e.preventDefault();
    // 주소찾기 팝업
    new daum.Postcode({
      oncomplete: function (data) {
        var roadAddr = data.roadAddress;
        var extraRoadAddr = "";
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraRoadAddr += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraRoadAddr +=
            extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (extraRoadAddr !== "") {
          extraRoadAddr = " (" + extraRoadAddr + ")";
        }
        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        setPostCode(data.zonecode);
        setAddress(roadAddr);
      },
    }).open();
  };

  const StudentsInfoStyle = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 120px;
    width: 100%;
    height: 100%;
  `;

  return (
    <div className="main-core">
      <div className="student-list-title">
        {/* <!-- 제목 위치 --> */}
        <span>{gradeClass}</span>
        <p>학생 정보 관리</p>
      </div>
      {/* <!-- 신상정보 전체 레이아웃 --> */}
      <div className="user-info-wrap">
        {/* <!-- 탭 선택 부분 --> */}
        <div className="user-info-tap">
          <div className="property">
            <div className="frame">
              <div className="text-wrapper">신상 정보</div>
            </div>
            <div
              className="div-wrapper"
              onClick={() => {
                handleClick();
              }}
            >
              <div className="info-subtitle">성적 입력</div>
            </div>
            <div className="div-wrapper">
              <div className="info-subtitle">차트</div>
            </div>
          </div>

          <div className="info-button">
            <button>저장</button>
            <button>취소</button>
          </div>
        </div>
        {/* <!-- 입력 부분 --> */}
        <div className="info-contain-top">
          <div className="info-item-top">
            <div className="info-title">
              <span>학생명</span>
              <input
                type="text"
                name="text"
                placeholder="이름을 입력해주세요"
                value={studentName}
                onChange={e => {
                  setStudentName(e.target.value);
                }}
              />
              <div className="form-check">
                <input
                  className="form-check-gender"
                  type="radio"
                  name="chk_info"
                  value="남자"
                />
                남자
                <input
                  className="form-check-gender"
                  type="radio"
                  name="chk_info"
                  value="여자"
                />
                여자
              </div>
            </div>
            <div className="info-title">
              <span>생년월일</span>
              <input type="date" name="date" value={studentBirth} />
            </div>
            <div className="info-title">
              <span>전화번호</span>
              <PhoneInputFields
                placeholder="전화번호를 입력하세요"
                value={studentPhone}
              />
            </div>
          </div>
          <div className="info-item-right">
            <div className="info-title">
              <span>학부모명</span>
              <input
                type="text"
                name="text"
                placeholder=""
                value={parentName}
              />
            </div>
            <div className="info-title">
              <span>관계</span>
              <select name="family-info">
                <option value="none" disabled selected>
                  == 항목을 선택하세요 ==
                </option>
                <option value="부">부</option>
                <option value="모">모</option>
                <option value="조부">조부</option>
                <option value="조모">조모</option>
                <option value="기타">기타</option>
              </select>
            </div>
            <div className="info-title">
              <div className="info-title">
                <span>학부모 전화번호</span>
                <PhoneInputFields
                  placeholder="전화번호를 입력하세요"
                  value={parentPhone}
                />
              </div>
            </div>
          </div>
          <div className="info-img">
            <StudentImg />
          </div>
        </div>
        <div className="info-contain-mid">
          <div className="info-item-mid">
            <div className="info-title">
              <span>주소</span>
              <div className="add-form">
                <div>
                  <input
                    type="text"
                    name="text"
                    placeholder={postCode}
                    readOnly
                    value={studentZoneCode}
                  ></input>
                  <button
                    type="button"
                    onClick={e => {
                      handleAddClick(e);
                    }}
                  >
                    우편번호 찾기
                  </button>
                </div>
                <input
                  type="text"
                  name="text"
                  placeholder={address}
                  className="info-add"
                  readOnly
                  value={studentAddr}
                />
                <input
                  type="text"
                  name="text"
                  placeholder="상세주소를 입력해주세요."
                  className="info-add"
                />
              </div>
            </div>
            <div className="info-title"></div>
          </div>
        </div>
        <div className="info-contain-top">
          <div className="info-item-bottom">
            <div className="info-title">
              <span>기타사항</span>
              <textarea value={studentEtc} />
            </div>
            <div className="info-title"></div>
          </div>
        </div>
        <div className="info-contain-top">
          <div className="info-none-modify">
            <div className="info-title">
              <span>최초 등록일</span>
              <div>{studentCreatedAt}</div>
            </div>
          </div>
        </div>
        <div className="info-contain-top">
          <div className="info-none-modify">
            <div className="info-title">
              <span>아이디</span>
              <div>{studentId}</div>
            </div>
          </div>
        </div>
        <div className="info-contain-top">
          <div className="info-none-modify" id="info-none-modify-last">
            <div className="info-title">
              <span>현재 학급</span>
              <div>{studentClass}</div>
            </div>
          </div>
        </div>
      </div>
      <StudentsInfoStyle>
        <div className="student-info">
          <div className="main-schedule-title main-contents-title">
            <div className="main-schedule-title-text">학생 기록 정보</div>
          </div>
          <div className="grid-frame">
            {prvInfo.map((item, index) => (
              <>
                <div className="item" key={index}>
                  <div className="grid-inner">
                    <div className="grid-inner-item">
                      <div className="grid-inner-item-text">학급</div>
                    </div>
                    <div className="grid-inner-item1">
                      <div className="grid-inner-item-text">
                        {item.prvClass}
                      </div>
                    </div>
                    <div className="grid-inner-item">
                      <div className="grid-inner-item-text">담당 교직원</div>
                    </div>
                    <div className="grid-inner-item1">
                      <div className="grid-inner-item-text">
                        {item.prvTeacher}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="student-info-readonly">
                  {item.studentInfoContent}
                </div>
              </>
            ))}
          </div>
        </div>
      </StudentsInfoStyle>
    </div>
  );
  //   <div className="main-core">
  //     <div className="student-list-title">
  //       {/* <!-- 제목 위치 --> */}
  //       <span>{studentClass}</span>
  //       <p>학생 정보 관리</p>
  //     </div>
  //     {/* <!-- 신상정보 전체 레이아웃 --> */}
  //     <div className="user-info-wrap">
  //       {/* <!-- 탭 선택 부분 --> */}
  //       <div className="user-info-tap">
  //         <div className="property">
  //           <div className="frame">
  //             <div className="text-wrapper">신상 정보</div>
  //           </div>
  //           <div className="div-wrapper">
  //             <div className="info-subtitle">성적 입력</div>
  //           </div>
  //           <div className="div-wrapper">
  //             <div className="info-subtitle">차트</div>
  //           </div>
  //         </div>

  //         <div className="info-button">
  //           <button>저장</button>
  //           <button>취소</button>
  //         </div>
  //       </div>
  //       {/* <!-- 입력 부분 --> */}
  //       <div className="info-contain-top">
  //         <div className="info-item-top">
  //           <div className="info-title">
  //             <span>학생명</span>
  //             <input
  //               type="text"
  //               name="text"
  //               placeholder="이름을 입력해주세요"
  //               value={studentName}
  //             />
  //             <div className="form-check">
  //               <input
  //                 className="form-check-gender"
  //                 type="radio"
  //                 name="chk_info"
  //                 value="남자"
  //               />
  //               남자
  //               <input
  //                 className="form-check-gender"
  //                 type="radio"
  //                 name="chk_info"
  //                 value="여자"
  //               />
  //               여자
  //             </div>
  //           </div>
  //           <div className="info-title">
  //             <span>생년월일</span>
  //             <input type="date" name="date" value={studentBirth} />
  //           </div>
  //           <div className="info-title">
  //             <span>전화번호</span>
  //             <input
  //               type="number"
  //               name="tel"
  //               placeholder="전화번호를 입력해주세요"
  //               value={studentPhone}
  //             />
  //           </div>
  //         </div>
  //         <div className="info-item-right">
  //           <div className="info-title">
  //             <span>학부모명</span>
  //             <input
  //               type="text"
  //               name="text"
  //               placeholder=""
  //               value={parentName}
  //             />
  //           </div>
  //           <div className="info-title">
  //             <span>관계</span>
  //             <input type="text" name="text" placeholder="" value={connet} />
  //           </div>
  //           <div className="info-title">
  //             <span>학부모 전화번호</span>
  //             <input
  //               type="number"
  //               name="tel"
  //               placeholder="전화번호를 입력해주세요"
  //               value={parentPhone}
  //             />
  //           </div>
  //         </div>
  //         <div className="info-img">사진</div>
  //       </div>
  //       <div className="info-contain-mid">
  //         <div className="info-item-mid">
  //           <div className="info-title">
  //             <span>주소</span>
  //             <div className="add-form">
  //               <div>
  //                 <input
  //                   type="text"
  //                   name="text"
  //                   placeholder=""
  //                   value={studentZoneCode}
  //                 />
  //                 <button type="button">우편번호 찾기</button>
  //               </div>
  //               <input
  //                 type="text"
  //                 name="text"
  //                 placeholder=""
  //                 className="info-add"
  //               />
  //               <input
  //                 type="text"
  //                 name="text"
  //                 placeholder="상세주소를 입력해주세요."
  //                 className="info-add"
  //                 value={studentAddr}
  //               />
  //             </div>
  //           </div>
  //           <div className="info-title"></div>
  //         </div>
  //       </div>
  //       <div className="info-contain-top">
  //         <div className="info-item-bottom">
  //           <div className="info-title">
  //             <span>기타사항</span>
  //             <textarea value={studentEtc} />
  //           </div>
  //           <div className="info-title"></div>
  //         </div>
  //       </div>
  //       <div className="info-contain-top">
  //         <div className="info-none-modify">
  //           <div className="info-title">
  //             <span>최초 등록일</span>
  //             <div>{studentCreatedAt}</div>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="info-contain-top">
  //         <div className="info-none-modify">
  //           <div className="info-title">
  //             <span>아이디</span>
  //             <div>{studentId}</div>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="info-contain-top">
  //         <div className="info-none-modify" id="info-none-modify-last">
  //           <div className="info-title">
  //             <span>현재 학급</span>
  //             <div>{studentClass}</div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     <StudentsInfoStyle>
  //       <div className="student-info">
  //         <div className="main-schedule-title main-contents-title">
  //           <div className="main-schedule-title-text">학생 기록 정보</div>
  //         </div>
  //         <div className="grid-frame">
  //           {prvInfo.map((item, index) => (
  //             <>
  //               <div className="item" key={index}>
  //                 <div className="grid-inner">
  //                   <div className="grid-inner-item">
  //                     <div className="grid-inner-item-text">학급</div>
  //                   </div>
  //                   <div className="grid-inner-item1">
  //                     <div className="grid-inner-item-text">
  //                       {item.prvClass}
  //                     </div>
  //                   </div>
  //                   <div className="grid-inner-item">
  //                     <div className="grid-inner-item-text">담당 교직원</div>
  //                   </div>
  //                   <div className="grid-inner-item1">
  //                     <div className="grid-inner-item-text">
  //                       {item.prvTeacher}
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="student-info-readonly">
  //                 {item.studentInfoContent}
  //               </div>
  //             </>
  //           ))}
  //         </div>
  //       </div>
  //     </StudentsInfoStyle>
  //   </div>
  // );
};

export default StudentInfoView;

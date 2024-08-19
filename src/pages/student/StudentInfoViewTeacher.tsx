import styled from "@emotion/styled";
import Footer from "components/layout/Footer";
import HeaderMemu from "components/layout/header/HeaderMenu";
import HeaderTopPublic from "components/layout/header/HeaderTopPublic";
import catPicture from "../../images/box-cat.jpg";
import "../../scss/parents/childedit.css";
import StudentsPrevInfo from "./StudentsPrevInfo";
import { useNavigate, useParams } from "react-router";
import { getCookie } from "utils/cookie";
import { useEffect, useState } from "react";
import { getStudentInfo } from "api/student/studentapi";

interface EtcItem {
  uclass: string;
  teacherName: string;
  etc: string;
}

interface StudentInfo {
  teacherName: string;
  studentPk: number;
  studentName: string;
  studentPhone: string;
  studentEtc: string;
  studentBirth: string;
  studentAddr: string;
  studentZoneCode: string;
  studentDetail: string;
  studentGender?: string;
  parentName?: string;
  connet?: string;
  parentPhone?: string;
  studentPic?: string;
  studentCreatedAt?: string;
  parentId?: string;
  studentGrade?: string;
  studentClass?: string;
  prevEtcList?: EtcItem[];
}

const MyChildInfo = styled.div`
  .no-data {
    color: gray;
    padding-left: 0px !important;
  }

  .no-padding {
    padding-left: 0px !important;
  }

  .no-edit-class {
    pointer-events: none;
    background-color: #efece8 !important;
  }

  .gender-style {
    margin-left: 0px !important;
    input {
      width: 25px !important;
    }
    /* width: auto; */
  }

  .prev-class-item-span {
    border-right: 0px !important;
    width: 157px !important;
    /* border-left: 0px; */
  }

  .prev-class-item {
    padding: 10px 0;
    border-left: solid 3px #886348;
  }
`;
const StudentsImeStyle = styled.div`
  width: 100%;
  height: 100%;
  .img-contain {
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StudentInfoViewTeacher: React.FC = () => {
  const { studentPk } = useParams<{ studentPk: string }>();
  // 네비게이트
  const navigate = useNavigate();

  /** 성적 확인 페이지로 이동 */
  const handleClick = () => {
    navigate(`/grade/edit/${studentPk}`);
  };

  const [studentBirth, setStudentBirth] = useState("");
  const [connet, setConnet] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [studentAddr, setStudentAddr] = useState("");
  const [parentId, setParentId] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [studentGrade, setStudentGrade] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [studentEtc, setStudentEtc] = useState("");
  const [studentZoneCode, setStudentZoneCode] = useState("");
  const [parentName, setParentName] = useState("");
  const [studentGender, setStudentGender] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentPic, setStudentPic] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [prevEtcList, setPrevEtcList] = useState([]);
  const [studentCreatedAt, setStudentCreatedAt] = useState("");
  const [studentDetail, setStudentDetail] = useState("");

  /** 학생 정보 불러오기 */
  const getChildInfo = async () => {
    const res = await getStudentInfo(studentPk);
    console.log("불러오기 결과값 : ", res.data);

    // 학생 데이터 저장
    setStudentBirth(res.data.studentBirth);
    setConnet(res.data.connet);
    setTeacherName(res.data.teacherName);
    setStudentAddr(res.data.studentAddr);
    setParentId(res.data.parentId);
    setParentPhone(res.data.parentPhone);
    setStudentGrade(res.data.studentGrade);
    setStudentClass(res.data.studentClass);
    setStudentEtc(res.data.studentEtc);
    setStudentZoneCode(res.data.studentZoneCode);
    setParentName(res.data.parentName);
    setStudentGender(res.data.studentGender);
    setStudentName(res.data.studentName);
    setStudentPic(res.data.studentPic);
    setStudentPhone(res.data.studentPhone);
    setPrevEtcList(res.data.prevEtcList);
    setStudentCreatedAt(res.data.studentCreatedAt);
    setStudentDetail(res.data.studentDetail);
  };

  /** 최초 랜더링 */
  useEffect(() => {
    getChildInfo();
    console.log("권한 : ", getCookie("userRole"));
  }, []);

  const [postCode, setPostCode] = useState("우편번호");
  const [address, setAddress] = useState("주소");

  return (
    <>
      <HeaderTopPublic />
      <HeaderMemu />
      <div className="main-core">
        <MyChildInfo>
          <div className="main-core child-edit-wrap">
            <div className="student-list-title">
              <span>개인 정보 수정</span>
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
                </div>

                <div className="info-button">
                  <button
                    onClick={() => {
                      // 수정
                      navigate(`/students/edit/${studentPk}`);
                    }}
                  >
                    수정
                  </button>
                </div>
              </div>
              {/* <!-- 입력 부분 --> */}
              <div className="info-contain-top">
                <div className="info-item-top">
                  <div className="info-title">
                    <span>학생명</span>
                    <input
                      className="no-edit-class"
                      type="text"
                      name="text"
                      value={studentName}
                      placeholder="이름을 입력해주세요"
                      disabled
                      // onChange={e => {
                      //   setStudentName(e.target.value);
                      // }}
                    />
                    <div className="form-check gender-style ">
                      <input
                        className="no-edit-class"
                        type="text"
                        name="text"
                        value={studentGender}
                      />
                    </div>
                  </div>
                  <div className="info-title">
                    <span>생년월일</span>
                    <input
                      type="date"
                      name="date"
                      value={studentBirth}
                      className="no-edit-class"
                    />
                  </div>
                  <div className="info-title">
                    <span>전화번호</span>

                    <input
                      className="no-edit-class"
                      disabled
                      placeholder="전화번호를 입력하세요"
                      value={studentPhone}
                      // setPhoneNum={setStudentPhone}
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
                      className="no-edit-class"
                      // onChange={e => {
                      //   setParentName(e.target.value);
                      // }}
                    />
                  </div>
                  <div className="info-title">
                    <span>관계</span>
                    <select
                      className="no-edit-class"
                      name="family-info"
                      value={connet}
                    >
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
                      <input
                        type="text"
                        name="text"
                        placeholder=""
                        value={parentPhone}
                        className="no-edit-class"
                      />
                    </div>
                  </div>
                </div>
                <div className="info-img">
                  {studentPic !== null ? (
                    <StudentsImeStyle>
                      <img
                        src={`http://112.222.157.156:5121/pic/student/${studentPk}/${studentPic}`}
                        alt="StudentImg"
                      />
                    </StudentsImeStyle>
                  ) : (
                    <StudentsImeStyle>
                      <img src={catPicture} alt="귀야운 고양이"></img>
                    </StudentsImeStyle>
                  )}
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
                          value={studentZoneCode}
                          disabled
                        ></input>
                        <button
                          //   type="button"
                          //   onClick={e => {
                          //     handleAddClick(e);
                          //   }}
                          disabled
                        >
                          우편번호 찾기
                        </button>
                      </div>
                      <input
                        type="text"
                        name="text"
                        placeholder={address}
                        className="info-add"
                        value={studentAddr}
                        disabled
                      />
                      <input
                        type="text"
                        name="text"
                        value={studentDetail}
                        placeholder="상세주소를 입력해주세요."
                        className="info-add"
                        // onChange={e => {
                        //   setStudentDetail(e.target.value);
                        // }}
                        disabled
                      />
                    </div>
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
                    <div>{parentId}</div>
                  </div>
                </div>
              </div>
              <div className="info-contain-top">
                <div className="info-none-modify">
                  <div className="info-title">
                    <span>현재 학급</span>
                    <div>
                      {studentGrade}학년 {studentClass}반 | 담임 : {teacherName}
                    </div>
                  </div>
                </div>
              </div>
              <div className="info-contain-top">
                <div className="info-none-modify" id="info-none-modify-last">
                  <div className="info-title">
                    <span>기타사항</span>
                    <div>
                      {studentEtc === null || studentEtc === "" ? (
                        <div className="no-data">정보 없음</div>
                      ) : (
                        studentEtc
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MyChildInfo>
        <StudentsPrevInfo />
      </div>
      <Footer />
    </>
  );
};

export default StudentInfoViewTeacher;

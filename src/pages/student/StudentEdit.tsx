import styled from "@emotion/styled";
import { getStudentInfo } from "api/student/studentapi";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { openModal, updateModalDate } from "slices/modalSlice";
import "../../scss/student/studentEdit.css";

import BoxTitle from "components/common/style/BoxTitle";
import PageTitle from "components/common/style/PageTitle";
import Footer from "components/layout/Footer";
import HeaderMemu from "components/layout/header/HeaderMenu";
import HeaderTopPublic from "components/layout/header/HeaderTopPublic";
import StudentImg from "./StudentImg";
import StudentsPrevInfo from "./StudentsPrevInfo";
import usePreventRefresh from "hooks/common/usePreventRefresh";

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

const StudentsInfoStyle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 120px;
  margin: 0 auto;
  width: 1080px;
  padding-top: 70px;
  padding-bottom: 120px;
  @media screen and (max-width: 1023px) {
    // top: 70px;
    padding-top: 70px;
  }
`;

const PhoneInfoStyle = styled.input`
  pointer-events: none;
  background-color: #efece8 !important;
`;

const StudentEdit: React.FC = () => {
  // 네비게이트
  const navigate = useNavigate();
  const { studentPk } = useParams<{ studentPk: string }>();

  const handleClick = () => {
    navigate(`/grade/edit/${studentPk}`);
  };
  usePreventRefresh();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modalState = useSelector((state: any) => state.modalSlice);
  const dispatch = useDispatch();

  // 학생 한 명 데이터
  const [studentInfo, setStudentInfo] = useState<StudentInfo>(
    {} as StudentInfo,
  );
  const [studentName, setStudentName] = useState("");
  const [studentGender, setStudentGender] = useState("");
  const [studentBirth, setStudentBirth] = useState("");
  const [studentPhone, setStudentPhone] = useState("");

  const [parentName, setParentName] = useState("");
  const [connet, setConnet] = useState("");
  const [parentPhone, setParentPhone] = useState("");

  // 이미지 미리보기
  const [studentPic, setStudentPic] = useState("");
  // 서버에 POSt 할 파일을 관리할 변수
  const [imgFile, setImgFile] = useState<File | null>(null);

  const [studentZoneCode, setStudentZoneCode] = useState("우편번호");
  const [studentAddr, setStudentAddr] = useState("주소");

  // 주소 상세...
  const [studentDetail, setStudentDetail] = useState("");

  const [studentEtc, setStudentEtc] = useState("");

  const [studentCreatedAt, setStudentCreatedAt] = useState("");
  const [parentId, setParentId] = useState("");
  const [studentGrade, setStudentGrade] = useState("");
  const [studentClass, setStudentClass] = useState("");

  const [prevEtcList, setPrevEtcList] = useState([]);

  // 정보 불러오기
  const studentInfoData = async () => {
    try {
      const response = await getStudentInfo(Number(studentPk));
      const result = response.data;

      setStudentInfo(result);
      setStudentName(result.studentName);
      setStudentGender(result.studentGender);
      setStudentBirth(result.studentBirth);
      setStudentPhone(result.studentPhone);
      setParentName(result.parentName);
      setConnet(result.connet);
      setParentPhone(result.parentPhone);
      setStudentPic(result.studentPic);
      setStudentZoneCode(result.studentZoneCode);
      setStudentAddr(result.studentAddr);
      setStudentDetail(result.studentDetail);
      setStudentEtc(result.studentEtc);
      setStudentCreatedAt(result.studentCreatedAt);
      setParentId(result.parentId);
      setStudentGrade(result.studentGrade);
      setStudentClass(result.studentClass);

      setPrevEtcList(result.prevEtcList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // 학생 데이터 불러오기
    studentInfoData();
  }, [studentPk]);

  /** 모달 호출 */
  const saveModifyInfo = (selectModalType: string) => {
    const studentInfo = {
      studentPk,
      studentName,
      studentPhone,
      studentEtc,
      studentBirth,
      studentAddr,
      studentZoneCode,
      studentDetail,
    };
    const data = {
      headerText: ["학생 정보 관리"],
      bodyText: ["내용을 수정하시겠습니까?"],
      modalRes: [45, studentInfo, imgFile],
      buttonText: ["확인", "취소"],
    };
    dispatch(updateModalDate(data));
    dispatch(openModal(selectModalType));
  };

  /** 취소 기능 */
  const modifyCancel = (selectModalType: string) => {
    const data = {
      bodyText: ["정보 수정을 취소하시겠습니까?"],
      modalRes: [43],
      buttonText: ["확인", "닫기"],
    };

    dispatch(updateModalDate(data));
    dispatch(openModal(selectModalType));
  };

  /** 모달 종료 후 갱신 */
  useEffect(() => {
    if (modalState.modalRes[0] === false) {
      // console.log("완료.");
    }
  }, [modalState.modalRes[0]]);

  return (
    <>
      <HeaderTopPublic />
      <HeaderMemu />
      <div className="main-core">
        {/* <!-- 제목 위치 --> */}
        <PageTitle>학생 정보 관리</PageTitle>
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
                  saveModifyInfo("BasicModal");
                }}
              >
                저장
              </button>
              <button
                onClick={() => {
                  modifyCancel("BasicModal");
                }}
              >
                취소
              </button>
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
                  {studentGender === "남" ? (
                    <input
                      className="form-gender"
                      // type="radio"
                      name="chk_info"
                      value="남"
                      checked={studentGender === "남"}
                      // onChange={e => setStudentGender(e.target.value)}
                      style={{ background: "#efece8" }}
                      disabled
                    />
                  ) : (
                    <input
                      className="form-gender"
                      // type="radio"
                      name="chk_info"
                      value="여"
                      checked={studentGender === "여"}
                      // onChange={e => setStudentGender(e.target.value)}
                      style={{ background: "#efece8" }}
                      disabled
                    />
                  )}
                </div>
              </div>
              <div className="info-title">
                <span>생년월일</span>
                <input
                  type="date"
                  name="date"
                  value={studentBirth}
                  onChange={e => setStudentBirth(e.target.value)}
                />
              </div>
              <div className="info-title">
                <span>전화번호</span>
                {/* <PhoneInputFields
                phoneNum={studentPhone}
                onChange={e => setStudentPhone(e.target.value)}
              /> */}
                <PhoneInfoStyle
                  type="text"
                  name="text"
                  placeholder=""
                  disabled
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
                  disabled
                  value={parentName}
                  onChange={e => setParentName(e.target.value)}
                  style={{ background: "#efece8" }}
                />
              </div>
              <div className="info-title">
                <span>관계</span>
                <select
                  name="family-info"
                  value={connet}
                  disabled
                  // onChange={e => setConnet(e.target.value)}
                  style={{ background: "#efece8" }}
                ></select>
              </div>
              <div className="info-title">
                <span>학부모 전화번호</span>
                <PhoneInfoStyle
                  type="text"
                  name="text"
                  placeholder=""
                  value={parentPhone}
                  disabled
                />
              </div>
            </div>
            <div className="info-img">
              <StudentImg
                studentPk={studentPk}
                studentPic={studentPic}
                setImgFile={setImgFile}
              />
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
                      value={studentZoneCode}
                      readOnly
                    ></input>
                  </div>
                  <input
                    type="text"
                    name="text"
                    className="info-add"
                    readOnly
                    value={studentAddr}
                  />
                  <input
                    type="text"
                    name="text"
                    placeholder="상세주소를 입력해주세요."
                    className="info-add"
                    value={studentDetail}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="info-contain-top">
            <div className="info-item-bottom">
              <div className="info-title">
                <span>기타사항</span>
                <textarea
                  // placeholder="기타 특이사항을 입력하세요"
                  value={studentEtc}
                  onChange={e => setStudentEtc(e.target.value)}
                />
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
            <div className="info-none-modify" id="info-none-modify-last">
              <div className="info-title">
                <span>현재 학급</span>
                <div>
                  {studentGrade}학년 {studentClass}반 | 담임 :{" "}
                  {studentInfo.teacherName}
                </div>
              </div>
            </div>
          </div>
        </div>
        <StudentsPrevInfo />
      </div>
      <Footer />
    </>
  );
};

export default StudentEdit;

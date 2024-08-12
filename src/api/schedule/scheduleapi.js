import axios from "axios";

/** 전체 일정 캘린더 정보 추출 */
export const getSchedule = async () => {
  let res = await axios
    .get(`/api/calender`)
    .then(res => {
      // 성공 처리
      //   console.log("성공 : ", res.data);
      return res.data;
    })
    .catch(error => {
      // console.log("에러 : ", error);
      return false;
      // return Promise.reject(error);
    });

  return res;
};

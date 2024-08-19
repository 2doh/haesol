import jwtAxios from "api/jwtUtil";

export const words = async studentPk => {
  // console.log(studentPk);
  const response = await jwtAxios.get(
    `/api/online/english/words?studentPk=${studentPk}`,
  );
  // console.log(response);
  return response;
};

export const listeningList = async studentPk => {
  // console.log(studentPk);
  const res = await jwtAxios.get(
    `/api/online/english/listening?studentPk=${studentPk}`,
  );
  // console.log(res);
  return res;
};

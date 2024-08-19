import jwtAxios from "api/jwtUtil";

export const words = async studentPk => {
  console.log(studentPk);
  const response = await jwtAxios.get(
    `/api/online/english/words?studentPk=${studentPk}`,
  );
  console.log(response);
};

export const listening = async studentPk => {
  const res = await jwtAxios.get(
    `/api/online/english/listening?studentPk=${studentPk}`,
  );
  console.log(res);
};

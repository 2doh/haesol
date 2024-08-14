import styled from "@emotion/styled";
import SigninShape from "components/user/SigninShape";
import SignupBt from "components/user/SignupBt";
import SignupChildInput from "components/user/SignupChildInput";
import SignupDrop from "components/user/SignupDrop";
import SignupPhone from "components/user/SignupPhone";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import { signupSocialCode, signupSocialInfo } from "api/signup/socialapi";

const initSignupState = {
  phone: "",
  connet: "none",
  childecode: "",
};

const socialSignupSchema = yup.object().shape({
  phone: yup
    .string()
    .required("휴대폰 번호를 입력해주세요.")
    .matches(/^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/, "유효한 전화번호를 입력하세요."),
  connet: yup
    .string()
    .test("none", "가족관계를 선택해주세요", value => value !== "none")
    .required("가족관계를 선택해주세요"),
  childecode: yup
    .string()
    .min(6, "유효한 코드를 입력해주세요")
    .max(8, "유효한 코드를 입력해주세요")
    .required("자녀코드를 입력해주세요."),
});

const SocialSignup = () => {
  const [userChildrenCode, setUserChildrenCode] = useState("");
  const [userConnet, setUserConnet] = useState("");
  const [userPhoneNum, setUserPhoneNum] = useState("");
  const [isRandCode, setIsRandCode] = useState(false);
  const [userUId, setUserUid] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: initSignupState,
    resolver: yupResolver(socialSignupSchema),
    mode: "onChange",
  });

  const handleOnSubmit = async data => {
    if (!isRandCode) {
      alert("자녀코드 확인을 해주세요");
      return;
    }
    if (isRandCode === true) {
      setIsRandCode(false);
    }
    console.log(data);
    const reqData = {
      phoneNumber: data.phone,
      connect: data.connet,
      id: userUId,
      randCode: data.childecode,
    };
    console.log(reqData);
    const result = await signupSocialCode(reqData);
    const res = await signupSocialInfo(reqData);
    // console.log(res, result);
  };

  useEffect(() => {
    const userClientId = localStorage.getItem("clientid");
    if (!userClientId) {
      return;
    }
    setUserUid(userClientId);
    if (userClientId) {
      localStorage.removeItem("clientid");
    }
  }, []);

  return (
    <SigninShape>
      <FormStyle onSubmit={handleSubmit(handleOnSubmit)}>
        <InnerStyle>
          <SignupPhone
            userPhoneNum={userPhoneNum}
            setUserPhoneNum={setUserPhoneNum}
            register={register}
          >
            전화번호
          </SignupPhone>
          {errors.phone && (
            <p className="text-red-500 mt-4 text-xl">{errors.phone.message}</p>
          )}
          <SignupDrop setUserConnet={setUserConnet} register={register}>
            가족관계
          </SignupDrop>
          {errors.connet && (
            <p className="text-red-500 mt-4 text-xl">{errors.connet.message}</p>
          )}
          <SignupChildInput
            setUserChildrenCode={setUserChildrenCode}
            userChildrenCode={userChildrenCode}
            register={register}
            setIsRandCode={setIsRandCode}
          >
            자녀코드
          </SignupChildInput>
          {errors.childecode && (
            <p className="text-red-500 mt-4 text-xl">
              {errors.childecode.message}
            </p>
          )}
          <SignupBt></SignupBt>
        </InnerStyle>
      </FormStyle>
    </SigninShape>
  );
};

const FormStyle = styled.form``;

const InnerStyle = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 30px;
  margin-bottom: 30px;
`;

export default SocialSignup;

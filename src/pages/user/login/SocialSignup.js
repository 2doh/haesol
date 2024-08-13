import styled from "@emotion/styled";
import SigninShape from "components/user/SigninShape";
import SignupBt from "components/user/SignupBt";
import SignupChildInput from "components/user/SignupChildInput";
import SignupDrop from "components/user/SignupDrop";
import SignupPhone from "components/user/SignupPhone";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

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
  connet: yup.string().required("가족관계를 선택해주세요"),
  childecode: yup.string().required("자녀코드를 입력해주세요."),
});

const SocialSignup = () => {
  const [userChildrenCode, setUserChildrenCode] = useState("");
  const [userConnet, setUserConnet] = useState("");
  const [userPhoneNum, setUserPhoneNum] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: initSignupState,
    resolver: yupResolver(socialSignupSchema),
    mode: "onChange",
  });

  const handleOnSubmit = data => {
    console.log(data);
  };

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
            register={register}
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

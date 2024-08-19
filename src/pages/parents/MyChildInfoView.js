import Footer from "components/layout/Footer";
import HeaderMemu from "components/layout/header/HeaderMenu";
import HeaderTopPublic from "components/layout/header/HeaderTopPublic";
import "../../scss/parents/childedit.css";
import ChildInfoReadOnly from "./ChildInfoReadOnly";

const MyChildInfoView = () => {
  return (
    <>
      <HeaderTopPublic />
      <HeaderMemu />
      <ChildInfoReadOnly />
      <Footer />
    </>
  );
};

export default MyChildInfoView;

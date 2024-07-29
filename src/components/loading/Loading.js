import { BarLoader } from "react-spinners";

const Loading = () => {
  const LoadingCss = {
    position: "fixed",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  };

  return (
    <div style={LoadingCss}>
      <BarLoader
        color="#0dbbab"
        height={2}
        loading
        speedMultiplier={0}
        width={200}
      />
    </div>
  );
};

export default Loading;

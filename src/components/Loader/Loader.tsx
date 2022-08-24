import { Rings } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <Rings height="200" width="200" radius="100" color="#bfdbfe" />
    </div>
  );
};

export default Loader;

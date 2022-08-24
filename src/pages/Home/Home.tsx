import { FC } from "react";
import Cards from "../../components/Cards/Cards";
import Categories from "../../components/Categories/Categories";

const Home: FC = () => {
  return (
    <div>
      <h1 className="flex py-2 mb-5 text-xl font-bold border-b-2">
        Latest Posts
      </h1>
      <div className="flex flex-col-reverse mt-2 lg:grid lg:gap-4 lg:grid-cols-3 lg:grid-rows-1">
        <div className="col-span-2 grid">
          <Cards />
        </div>
        <div>
          <Categories />
        </div>
      </div>
    </div>
  );
};

export default Home;

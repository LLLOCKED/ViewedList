import abstr from "../../assets/abstr.jpg";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineCalendar } from "react-icons/ai";
import { FiList } from "react-icons/fi";
import { Timestamp } from "firebase/firestore";
import { dateToString } from "../../helpers/dateToString";

interface ICards {
  title: String;
  desc: String;
  type: String;
  createdAt: Timestamp;
  id: String;
}

const Card = ({ id, title, desc, type, createdAt }: ICards) => {
  return (
    <div className="w-full shadow-xl bg-gray-50 rounded-xl">
      <div className="relative">
        <img
          className="object-cover w-full h-40 rounded-t-xl"
          src={abstr}
          alt="abstr"
        />
        <h1 className="absolute text-4xl font-bold text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {title}
        </h1>
      </div>
      <div className="flex flex-col items-start w-full p-4">
        <div className="mb-1 text-sm text-blue-600">{type}</div>
        <span className="text-gray-600">{desc}</span>
        <Link
          className="my-2 font-bold underline"
          to={`/recommendations/${id}`}
        >
          Read full...
        </Link>
        <div className="flex justify-between w-full text-sm text-gray-600">
          <span className="truncate">By Lorem dfdg</span>
          <div className="flex flex-row items-center space-x-0.5">
            <AiOutlineCalendar />
            <span>{dateToString(createdAt)}</span>
          </div>
          <div className="flex flex-row items-center space-x-0.5">
            <FiList />
            <span>43</span>
          </div>
          <div className="flex flex-row items-center space-x-0.5">
            <AiOutlineEye />
            <span>10</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

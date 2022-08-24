import { FaTrashAlt } from "react-icons/fa";
import { BsFillPencilFill } from "react-icons/bs";

type IList = {
  id: string;
  name: string;
  status: string;
  rating: number;
  type: string;
  date: string;
  deleteItem: (itemId: string) => void;
};

const Item = ({ id, name, status, rating, type, date, deleteItem }: IList) => {
  return (
    <div className="flex items-center justify-center w-full p-3 border-b border-black bg-gray-50 last:border-0">
      <div className="justify-center w-1/5 p-2 text-center">{name}</div>
      <div className="w-1/5 p-2 text-center text-white bg-gray-700 rounded-xl">
        {status}
      </div>
      <div className="w-1/5 p-2 text-center">{rating}</div>
      <div className="w-1/5 p-2 text-center text-white bg-gray-700 rounded-xl">
        {type}
      </div>
      <div className="w-1/5 p-2 text-center">{date}</div>

      <div className="flex items-center justify-center w-1/5 space-x-2">
        <FaTrashAlt
          className="w-5 h-5 text-gray-700 cursor-pointer"
          onClick={() => deleteItem(id)}
        />
        <BsFillPencilFill className="w-5 h-5 text-gray-700 cursor-pointer" />
      </div>
    </div>
  );
};

export default Item;


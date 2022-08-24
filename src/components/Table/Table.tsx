import { IoMdAddCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import emptyImage from "../../assets/empty.jpg";
import Item from "../Item/Item";
import { db } from "../../firebase";
import { UserAuth } from "../../context/AuthContext";
import Inputs from "../Inputs/Inputs";
import { SubmitHandler } from "react-hook-form";
import Loader from "../Loader/Loader";

type IList = {
  id: string;
  name: string;
  status: string;
  rating: number;
  type: string;
  date: string;
  userId: string;
};

interface IFormInput {
  name: String;
  status: "watched" | "watching" | "willWatch";
  rating: number;
  type: "book" | "anime" | "movie";
  date: Date;
}

const colHead: string[] = [
  "What?",
  "Status",
  "Rating",
  "Type",
  "Date",
  "Action",
];

const Table = () => {
  const { user } = UserAuth();

  const [data, setData] = useState<IList[]>();
  const [isShow, setShow] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);

  const fetchItem = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "list"));
    const docs: IList[] = [];
    querySnapshot.docs.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() } as IList);
    });
    setData(docs);
    setLoading(false);
  };

  useEffect(() => {
    fetchItem();
  }, []);

  const handleAddItem: SubmitHandler<IFormInput> = async (data) => {
    try {
      console.log(data);
      await addDoc(collection(db, "list"), {
        name: data.name,
        status: data.status,
        rating: data.rating,
        type: data.type,
        date: data.date,
        userId: user?.uid,
      });
      setShow(false);
      fetchItem();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleDelete = async (itemId: string) => {
    await deleteDoc(doc(db, "list", itemId));
    fetchItem();
  };

  return (
    <div>
      <div className="flex w-full p-3 mb-2 text-white bg-blue-500 rounded-xl">
        {colHead.map((name) => {
          return (
            <div
              key={name}
              className="w-1/5 text-center border-r-2 last:border-r-0"
            >
              {name}
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center w-full p-3 mb-2 text-white bg-gray-700 space-x-2 rounded-xl">
        <span>{!isShow ? "Add item" : "Close"}</span>
        <IoMdAddCircle
          className="w-8 h-8 text-blue-200 cursor-pointer hover:text-blue-100"
          onClick={() => setShow((prevState) => !prevState)}
        />
      </div>
      {isShow && <Inputs add={handleAddItem} />}

      {!isLoading ? (
        data?.length !== 0 ? (
          data?.map((item) => {
            return <Item key={item.id} {...item} deleteItem={handleDelete} />;
          })
        ) : (
          <div className="flex items-center justify-center bg-white rounded-xl">
            <img src={emptyImage} alt={emptyImage} className="w-96" />
          </div>
        )
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Table;

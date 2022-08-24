import { useEffect, useState } from "react";
import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import Card from "../Card/Card";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { UserAuth } from "../../context/AuthContext";
import Loader from "../Loader/Loader";

type ICards = {
  id: string;
  title: string;
  desc: string;
  type: "Book" | "Anime" | "Movie" | "Seria" | "None";
  list: string[];
  createdAt: Timestamp;
  viewed: number;
  isShow: false | true;
  userId: string;
};

const Cards = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const { user } = UserAuth();
  const [data, setData] = useState<ICards[]>([]);
  console.log(data);
  const fetchItem = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "cards"));
    const docs: ICards[] = [];
    querySnapshot.docs.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() } as ICards);
    });
    setData(docs);
    setLoading(false);
  };

  const handleAddItem = async () => {
    try {
      console.log(data);
      await addDoc(collection(db, "cards"), {
        title: "New Card",
        desc: "Description",
        type: "None",
        list: [],
        createdAt: Timestamp.fromDate(new Date()),
        viewed: 0,
        isShow: false,
        userId: user?.uid,
      });
      fetchItem();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className="grid md:grid-cols-3 gap-4">
          <div
            className="flex items-center justify-center w-full h-full p-3 shadow-xl cursor-pointer hover:shadow-2xl bg-gray-50 rounded-xl"
            onClick={handleAddItem}
          >
            <AiOutlinePlusCircle className="w-10 h-10 text-green-500" />
            <span className="text-xl font-bold">New Rec</span>
          </div>
          {data.map((item) => (
            <Card key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};
export default Cards;

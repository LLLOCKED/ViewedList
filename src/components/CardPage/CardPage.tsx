import {
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
import { db, storage } from "../../firebase";
import { dateToString } from "../../helpers/dateToString";
import CardItems from "./CardItems";
import Loader from "../Loader/Loader";

type TParam = {
  param?: string;
};

const CardPage = ({ param }: TParam) => {
  const gsReference = ref(
    storage,
    "gs://watch-list-aa709.appspot.com/defaultPoster.jpg"
  );

  const [poster, setPoster] = useState<string>();

  const [data, setData] = useState<DocumentData>({});

  useEffect(() => {
    const fetchPoster = async () => {
      await getDownloadURL(gsReference)
        .then((url) => {
          setPoster(url);
        })
        .catch((error) => {
          console.log(error.code);
        });
    };
    fetchPoster();
  }, []);

  useEffect(() => {
    const fetchCard = async () => {
      let docRef: DocumentReference<DocumentData>;
      let docSnap;
      if (param) {
        docRef = doc(db, "cards", param);
        docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          console.log("not find");
        }
      }
    };
    fetchCard();
  }, []);

  return (
    <div className="flex w-full">
      {data ? (
        <>
          <div className="flex flex-col">
            <div className="flex items-center justify-center w-72 h-96">
              {poster ? (
                <img className="w-72 h-96" src={poster} alt="poster" />
              ) : (
                <Loader />
              )}
            </div>
            <div className="flex w-full mt-2">
              <button className="flex items-center justify-center w-1/2 text-gray-800 bg-gray-300 border-r-2 border-black hover:bg-blue-300">
                <BsFillTrashFill />
                Delete
              </button>
              <button className="flex items-center justify-center w-1/2 text-gray-800 bg-gray-300 hover:bg-blue-300">
                <AiFillEye />
                Show
              </button>
            </div>
          </div>
          <div className="w-full ml-4">
            <div className="relative w-auto">
              <h1 className="text-3xl font-bold border-b-2">{data.title}</h1>
              <div className="absolute right-0 p-1 bg-gray-300 cursor-pointer hover:bg-gray-400 rounded-md top-1/2 -translate-y-1/2">
                <BsFillPencilFill className="text-center" />
              </div>
            </div>
            <div className="flex text-gray-600 space-x-2">
              <span>{dateToString(data.createdAt)}</span>
              <span>10</span>
              <span>{data.viewed}</span>
            </div>
            <div className="flex my-2">
              <div className="px-3 py-1 text-white bg-gray-900 rounded-xl">
                {data.type}
              </div>
              <button className="px-3 py-1">add</button>
            </div>
            <span>{data.desc}</span>
            <CardItems list={data.list} />
          </div>
        </>
      ) : (
        <div>Empty</div>
      )}
    </div>
  );
};

export default CardPage;

import { Timestamp } from "firebase/firestore";

export const dateToString = (createdAt: Timestamp) => {
  const dateString: string =
    createdAt?.toDate().getDate() +
    "/" +
    (createdAt?.toDate().getMonth() + 1) +
    "/" +
    createdAt?.toDate().getFullYear();
  return dateString;
};

import Loader from "../Loader/Loader";

interface IList {
  list: [
    {
      title: string;
      rating: number;
    }
  ];
}

const CardItems = ({ list }: IList) => {
  console.log(list);

  return (
    <div className="mt-6">
      {list ? (
        list.map((item) => (
          <div
            key={item.title}
            className="flex justify-between bg-blue-300 text-gray-800 p-2 border-b-2 last:border-0 border-b-gray-800"
          >
            <span>{item.title}</span>
            <span>{item.rating}</span>
          </div>
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default CardItems;

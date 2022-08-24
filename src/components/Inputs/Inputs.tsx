import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  name: String;
  status: "watched" | "watching" | "willWatch";
  rating: number;
  type: "book" | "anime" | "movie";
  date: Date;
}

type TAdd = {
  add: SubmitHandler<IFormInput>;
};

const Inputs = ({ add }: TAdd) => {
  const { register, handleSubmit } = useForm<IFormInput>();
  return (
    <div className="flex w-full p-3 mb-2 bg-gray-300 rounded-xl space-x-4">
      <form className="flex w-full" onSubmit={handleSubmit(add)}>
        <input className="w-2/12 p-2" {...register("name")} />
        <select className="w-2/12 p-2" {...register("status")}>
          <option value="watched">Watched</option>
          <option value="watching">Watching</option>
          <option value="willWatch">Will Watch</option>
        </select>
        <input className="w-2/12 p-2" type="number" {...register("rating")} />
        <select className="w-2/12 p-2" {...register("type")}>
          <option value="book">Book</option>
          <option value="anime">Anime</option>
          <option value="movie">Movie</option>
        </select>
        <input className="w-2/12 p-2" type="date" {...register("date")} />
        <input className="w-2/12 p-2 text-white bg-gray-900" type="submit" />
      </form>
    </div>
  );
};

export default Inputs;

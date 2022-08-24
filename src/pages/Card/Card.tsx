import { useParams } from "react-router-dom";
import CardPage from "../../components/CardPage/CardPage";

const Card = () => {
  let params = useParams();
  return (
    <>
      <CardPage param={params.card} />
    </>
  );
};

export default Card;

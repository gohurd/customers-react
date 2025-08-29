import { useParams } from "react-router";

export const CustomerDetailsPage = () => {
  const params = useParams();

  return <div>User details {params.id}</div>;
};

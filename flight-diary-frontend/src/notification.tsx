import { Notify } from "./types";

interface Props {
  info: Notify;
}
const style = {
  color: "red",
};
const ErrorHandling = ({ info }: Props) => {
  return <p style={style}>{info.message}</p>;
};

export default ErrorHandling;

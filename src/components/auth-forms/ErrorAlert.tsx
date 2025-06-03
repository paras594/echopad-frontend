import { HiOutlineExclamationTriangle } from "react-icons/hi2";

const ErrorAlert = ({ message }: { message: string }) => (
  <div role="alert" className="alert bg-red-100 border border-red-200">
    <HiOutlineExclamationTriangle className="text-xl" />
    <span>{message}</span>
  </div>
);

export default ErrorAlert;

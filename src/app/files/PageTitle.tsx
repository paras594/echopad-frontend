import { PiInfo } from "react-icons/pi";

const PageTitle = () => {
  return (
    <div className="flex items-center gap-2">
      <h1 className="text-lg">Files Manager</h1>
      <details className="dropdown dropdown-start">
        <summary className="btn btn-sm btn-square text-xl btn-ghost text-gray-500">
          <PiInfo />
        </summary>
        <div className="px-4 py-4 mt-1 -translate-x-1/2 md:translate-x-0 shadow dropdown-content z-[1] bg-base-100 rounded-lg w-64 md:w-72">
          <ul className="list-disc pl-4 text-xs md:text-sm">
            <li className="mb-2">Files will be deleted after 12 hours</li>
            <li>Max files size is 10MB</li>
          </ul>
        </div>
      </details>
    </div>
  );
};

export default PageTitle;

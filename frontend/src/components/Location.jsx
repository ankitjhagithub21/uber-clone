import { MdLocationPin } from "react-icons/md";

const Location = () => {
  return (
    <div className="flex gap-3 border active:border-gray-800 rounded-lg  p-2 my-3 items-center">
      <div className="bg-gray-100 rounded-lg p-2">
        <MdLocationPin size={25} className="text-gray-800" />
      </div>
      <div>
        <h3 className="text-sm font-semibold">24B, Indrapuri</h3>
        <p className="text-sm">Lorem ipsum, dolor sit amet </p>
      </div>
    </div>
  );
};

export default Location;

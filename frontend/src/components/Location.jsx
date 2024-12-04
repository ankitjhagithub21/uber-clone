import { MdLocationPin } from "react-icons/md";

const Location = ({description,onClick}) => {
  return (
    <div className="flex gap-3 border active:border-gray-800 rounded-lg  p-2 my-3 items-center" onClick={()=>onClick(description)}>
      <div className="bg-gray-100 rounded-lg p-2">
        <MdLocationPin size={25} className="text-gray-800" />
      </div>
   
        <h3 className="text-sm">{description}</h3>
    
      
    </div>
  );
};

export default Location;

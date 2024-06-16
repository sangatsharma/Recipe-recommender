import errorimg from "../assets/Images/error404.jpg";
import Wrapper from "./Wrapper";
const InvalidPage = () => {
  return (
    <Wrapper>
      <div className="text-center bg-white p-5 rounded-lg shadow-md max-w-lg w-[1/2] ">
        <img
          src={errorimg}
          alt="404 Error Image"
          className="w-full object-cover mb-1 rounded h-[450px]"
        />
        <p className="text-lg text-gray-600 py-1 mb-1">
          Oops! The page you are looking for could not be found.
        </p>
        <a
          href="/"
          className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-3 rounded-[5px]"
        >
          Go Back Home
        </a>
      </div>
    </Wrapper>
  );
};
export default InvalidPage;

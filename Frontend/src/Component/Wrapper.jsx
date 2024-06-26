import "./Wrapper.css";
const Wrapper = ({ children,selectedPage }) => {
  return <section className={`wrapper ${selectedPage}`}>{children}</section>;
};
export default Wrapper; 
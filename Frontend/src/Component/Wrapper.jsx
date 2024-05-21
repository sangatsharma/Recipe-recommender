import "./Wrapper.css";
const Wrapper = ({ children,selectedPage }) => {
  return <main className={`${selectedPage}`}>{children}</main>;
};
export default Wrapper; 
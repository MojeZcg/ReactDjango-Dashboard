import { connect } from "react-redux";

function Layout({ children }) {
  return (
    <div className=" dark:bg-neutral-950 font-Main transition-all duration-500 ease-in-out ">
      {children}
    </div>
  );
}

const mapStateToProp = (state) => ({});

export default connect(mapStateToProp, {})(Layout);

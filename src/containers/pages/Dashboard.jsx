import Sidebar from "components/navigation/Sidebar";
import Layout from "hocs/Layout/Layout";

import { connect } from "react-redux";

function Dashboard() {
  return (
    <Layout>
      <div className="w-full h-64">
        <Sidebar />
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Dashboard);

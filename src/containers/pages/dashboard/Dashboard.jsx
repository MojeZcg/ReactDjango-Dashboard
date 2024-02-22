import DashboardContent from "components/Dashboard/DashboardContent";
import Layout from "hocs/Layout/Layout";

import { connect } from "react-redux";

function Dashboard() {
  return (
    <Layout>
      <div className="w-full h-64">
        <DashboardContent />
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Dashboard);

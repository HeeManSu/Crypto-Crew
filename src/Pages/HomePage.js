import React from "react";
import Banner from "../components/Banner/Banner";
import CoinsTable from "../components/CoinsTable";

const Homepage = () => {
  return (
    <>
    {/* used fragment here
    There is two things present in the home page */}
      <Banner />
      <CoinsTable />
    </>
  );
};

export default Homepage;

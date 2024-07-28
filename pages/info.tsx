

import PricingTable from "../components/PricingTable/PricingTable";
import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import { NextPageWithLayout } from "./page";

// set type for IInfo
interface IInfo {
 
}

const Info: NextPageWithLayout<IInfo> = ({  }) => {
  
  

  return (
    <section>
        <PricingTable />
    </section>
  );
};

Info.getLayout = (page) => {
  return (
    <PrimaryLayout>
      {page}
    </PrimaryLayout>
  );
};

export default Info;

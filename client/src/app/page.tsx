import { Banner } from "@/widgets/Banner/Banner";
import { Spacing } from "@/shared/ui/Spacing";
import Acquiring from "@/widgets/Acquiring/Acquiring";
import { FAQ } from "@/widgets/FAQ/FAQ";
import { WhyChooseUs } from "@/widgets/WhyChooseUs/WhyChooseUs";
import { AcquiringMethodsApi } from "@/features/getAcquiringMethods";
import { AcquiringHistoryApi } from "@/features/getAcquiringHistory/model/api";
import { ApiError } from "@/shared/api";
import { IAcquiring } from "@/entities/acquiring/model/types";
import { AcquiringMethod } from "@/entities/acquiringMethod";

import AcquiringHistoryLive from "@/widgets/AcquiringHistoryList/AcquiringHistoryLive";

export default async function Home() {
  let acquiringMethods: AcquiringMethod[] = [];
  let initialAcquiringHistory: IAcquiring[] = [];

  try {
    const acquiringMethodsApi = new AcquiringMethodsApi();
    acquiringMethods = await acquiringMethodsApi.getMethods();
  } catch (error) {
    if (error instanceof ApiError) {
      console.log(error);
    }
  }

  try {
    const acquiringHistoryApi = new AcquiringHistoryApi();
    initialAcquiringHistory = await acquiringHistoryApi.getAcquiringHistory();
  } catch (error) {
    if (error instanceof ApiError) {
      console.log(error);
    }
  }

  return (
    <>
      <Banner className="app-container" />
      <Spacing size="lg" direction="vertical" />

      <section
        id="replenishment"
        itemScope
        itemType="https://schema.org/Service"
      >
        <Acquiring
          className="app-container"
          acquiringMethods={acquiringMethods}
        />
      </section>

      <Spacing size="2xl" direction="vertical" />

      <AcquiringHistoryLive
        initial={initialAcquiringHistory}
        intervalMs={10000}
      />

      <Spacing size="2xl" direction="vertical" />

      <section id="faq" itemScope itemType="https://schema.org/FAQPage">
        <FAQ className="app-container" />
      </section>

      <Spacing size="2xl" direction="vertical" />

      <section id="guide">
        <WhyChooseUs className="app-container" />
      </section>
    </>
  );
}

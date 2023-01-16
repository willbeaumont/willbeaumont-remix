import { redirect } from "@remix-run/node";
import Layout from "~/components/layout";

export const loader = () => redirect("/willbeaumont");

function Index() {
  return (
    <Layout userName={"Will Beaumont"} navigation={false}>
      <div className="text-2xl text-center flex">
        Retrieving GitHub Profile!
      </div>
    </Layout>
  );
}

export default Index;

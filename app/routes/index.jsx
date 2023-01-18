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

export function ErrorBoundary() {
  return (
    <div className="bg-red-600 text-white p-14">
      <h1 className="text-3xl pb-8">Page Error</h1>
      <p>Something unexpected went wrong. Sorry about that.</p>
    </div>
  );
}

export default Index;

import Layout from "@/layout";
import ApplicationForm from "@/pages/applicationForm";
import classNames from "classnames";
import { Provider } from "react-redux";
import { store } from "./store";

const STEPS = ["Program Details", "Application Form", "Workflow", "Preview"];

const App = () => {
  return (
    <Provider store={store}>
      <Layout>
        <div className="bg-white px-10 flex items-center justify-between mt-10 shadow-[0_1px_18px_0_rgba(0,0,0,.12)]">
          {STEPS.map((item, idx) => (
            <div
              key={idx}
              className={classNames(
                "flex-1 py-8 px-10 font-bold text-center border-r",
                {
                  "bg-[#00635B] !text-white": item === "Application Form",
                  "border-r-0": idx === STEPS.length - 1,
                }
              )}
            >
              {item}
            </div>
          ))}
        </div>
        <ApplicationForm />
      </Layout>
    </Provider>
  );
};

export default App;

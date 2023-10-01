import FormWrapper from "@/components/wrappers/FormWrapper";
import CoverImage from "./components/CoverImage";
import PersonalInformation from "./components/PersonalInformation";
import Profile from "./components/Profile";
import AdditionalQuestions from "./components/AdditionalQuestions";
import appForm from "./hooks/appForm";
import cloneDeep from "lodash.clonedeep";

const ApplicationForm = () => {
  const {
    inputs,
    setInputs,
    handleChange,
    handleChangeCoverImage,
    handleSaveNewQuestion,
    handleDeleteQuestion,
    handleChangeExistingQuestion,
  } = appForm();
  const inputsToUse = inputs.data.attributes;

  return (
    <div className="flex flex-col gap-8 p-10">
      <FormWrapper
        title="Upload cover image"
        component={
          <CoverImage
            data={inputsToUse.coverImage}
            handleChangeCoverImage={handleChangeCoverImage}
          />
        }
      />
      <FormWrapper
        title="Personal Information"
        component={
          <PersonalInformation
            data={inputsToUse.personalInformation}
            handleChangeInput={(key, input, value) =>
              handleChange("personalInformation", key, input, value)
            }
            handleSaveNewQuestion={(input, value) =>
              handleSaveNewQuestion("personalInformation", input, value)
            }
            handleDeleteQuestion={(input, id) =>
              handleDeleteQuestion("personalInformation", input, id)
            }
            handleChangeExistingQuestion={(id, input, value) =>
              handleChangeExistingQuestion(
                "personalInformation",
                "personalQuestions",
                id,
                input,
                value
              )
            }
          />
        }
      />
      <FormWrapper
        title="Profile"
        component={
          <Profile
            data={inputsToUse.profile}
            handleChangeInput={(key, input, value) =>
              handleChange("profile", key, input, value)
            }
            handleSaveNewQuestion={(input, value) =>
              handleSaveNewQuestion("profile", input, value)
            }
            handleDeleteQuestion={(input, id) =>
              handleDeleteQuestion("profile", input, id)
            }
            handleChangeExistingQuestion={(id, input, value) =>
              handleChangeExistingQuestion(
                "profile",
                "profileQuestions",
                id,
                input,
                value
              )
            }
          />
        }
      />
      <FormWrapper
        title="Additional questions"
        component={
          <AdditionalQuestions
            questions={inputsToUse.customisedQuestions}
            handleSaveNewQuestion={(value) =>
              setInputs((prevState) => {
                const _inputs = cloneDeep(prevState);
                _inputs.data.attributes.customisedQuestions = [
                  ..._inputs.data.attributes.customisedQuestions,
                  value,
                ];
                return _inputs;
              })
            }
            handleDeleteQuestion={(id) =>
              setInputs((prevState) => {
                const _inputs = cloneDeep(prevState);
                const questions = _inputs.data.attributes.customisedQuestions;
                _inputs.data.attributes.customisedQuestions = questions.filter(
                  (item) => item.id !== id
                );
                return _inputs;
              })
            }
            handleChangeExistingQuestion={(id, input, value) =>
              setInputs((prevState) => {
                const _inputs = cloneDeep(prevState);
                const questions = _inputs.data.attributes.customisedQuestions;
                const index = questions.findIndex((x) => x.id === id);
                questions[index] = { ...questions[index], [input]: value };
                _inputs.data.attributes.customisedQuestions = questions;
                return _inputs;
              })
            }
          />
        }
      />
    </div>
  );
};

export default ApplicationForm;

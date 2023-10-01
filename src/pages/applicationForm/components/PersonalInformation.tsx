import CheckBox from "@/components/CheckBox";
import { PERSONAL_INFO } from "../Data";
import SwitchBox from "@/components/SwitchBox";
import RowWrapper from "@/components/wrappers/RowWrapper";
import { IProfile } from "./Profile";
import AdditionalQuestions from "./AdditionalQuestions";

const PersonalInformation: React.FC<IProfile> = ({
  data,
  handleChangeInput,
  handleSaveNewQuestion,
  handleDeleteQuestion,
  handleChangeExistingQuestion,
}) => {
  const keysToExclude = ["firstName", "lastName", "emailId"];

  return (
    <div>
      {PERSONAL_INFO.map((item, idx) => (
        <RowWrapper key={idx} isLastRow={idx === PERSONAL_INFO.length - 1}>
          <span className="font-bold">
            {item.name}{" "}
            {item.info ? (
              <span className="text-sm font-normal">({item.info})</span>
            ) : null}
          </span>
          {!keysToExclude.includes(item.key) ? (
            <div className="flex items-center gap-11">
              <CheckBox
                label="Internal"
                checked={data?.[item.key]?.internalUse}
                onChange={(checked) =>
                  handleChangeInput(item.key, "internalUse", checked)
                }
              />
              <SwitchBox
                label="Hide"
                id={item.key}
                checked={data?.[item.key]?.show}
                onChange={(checked) =>
                  handleChangeInput(item.key, "show", checked)
                }
              />
            </div>
          ) : null}
        </RowWrapper>
      ))}
      <AdditionalQuestions
        questions={data.personalQuestions}
        handleSaveNewQuestion={(value) =>
          handleSaveNewQuestion("personalQuestions", value)
        }
        handleDeleteQuestion={(id) =>
          handleDeleteQuestion("personalQuestions", id)
        }
        handleChangeExistingQuestion={handleChangeExistingQuestion}
      />
    </div>
  );
};

export default PersonalInformation;

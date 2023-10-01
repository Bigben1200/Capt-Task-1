import CheckBox from "@/components/CheckBox";
import { PROFILE } from "../Data";
import SwitchBox from "@/components/SwitchBox";
import RowWrapper from "@/components/wrappers/RowWrapper";
import AdditionalQuestions from "./AdditionalQuestions";

export interface IProfile {
  data: any;
  handleChangeInput: (key: string, input: string, value: boolean) => void;
  handleSaveNewQuestion: (input: string, value: any) => void;
  handleDeleteQuestion: (input: string, id: string) => void;
  handleChangeExistingQuestion: (id: string, input: string, value: any) => void;
}

const Profile: React.FC<IProfile> = ({
  data,
  handleChangeInput,
  handleSaveNewQuestion,
  handleDeleteQuestion,
  handleChangeExistingQuestion,
}) => {
  return (
    <div>
      {PROFILE.map((item, idx) => (
        <RowWrapper key={idx} isLastRow={idx === PROFILE.length - 1}>
          <span className="font-bold">{item.name}</span>
          <div className="flex items-center gap-11">
            <CheckBox
              label="Mandatory"
              checked={data?.[item.key]?.mandatory}
              onChange={(checked) =>
                handleChangeInput(item.key, "mandatory", checked)
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
        </RowWrapper>
      ))}
      <AdditionalQuestions
        questions={data.profileQuestions}
        handleSaveNewQuestion={(value) =>
          handleSaveNewQuestion("profileQuestions", value)
        }
        handleDeleteQuestion={(id) =>
          handleDeleteQuestion("profileQuestions", id)
        }
        handleChangeExistingQuestion={handleChangeExistingQuestion}
      />
    </div>
  );
};

export default Profile;

import { CancelIcon, EditIcon, ListIcon } from "@/assets/icons";
import classNames from "classnames";
import { useState } from "react";
import { nanoid } from "nanoid";
import { QUESTION_TYPES } from "../Data";
import SelectInput from "@/components/SelectInput";
import TextInput from "@/components/TextInput";
import { PlusOutlined } from "@ant-design/icons";
import CheckBox from "@/components/CheckBox";
import cloneDeep from "lodash.clonedeep";

interface IQuestionComponent {
  input: any;
  onDelete: () => void;
  onSave: () => void;
  handleChangeInput: (input: string, value: any) => void;
}

const QuestionComponent: React.FC<IQuestionComponent> = ({
  input,
  onDelete,
  onSave,
  handleChangeInput,
}) => {
  const [choices, setChoices] = useState([...input.choices]);

  const handleChangeChoices = (index, value) => {
    setChoices((prev) => {
      const _choices = cloneDeep(prev);
      _choices[index] = value;
      return _choices;
    });
    handleChangeInput("choices", choices);
  };

  const EXTRA_INPUTS = {
    "Yes/No": (
      <CheckBox
        label="Disqualify candidate if the answer is no"
        checked={input.disqualify}
        onChange={(checked) => handleChangeInput("disqualify", checked)}
      />
    ),
    Dropdown: (
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <p className="-mb-2 ml-7">Choice</p>
          {choices.map((choice, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <ListIcon />
              <TextInput
                placeholder="Type here"
                value={choice}
                onChange={(value) => handleChangeChoices(idx, value)}
              />
              {idx === choices.length - 1 ? (
                <PlusOutlined
                  onClick={() => setChoices((prev) => [...prev, ""])}
                />
              ) : null}
            </div>
          ))}
        </div>
        <CheckBox
          label="Enable 'Other' option"
          checked={input.other}
          onChange={(checked) => handleChangeInput("other", checked)}
        />
      </div>
    ),
    "Multiple choice": (
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <p className="-mb-2 ml-7">Choice</p>
          {choices.map((choice, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <ListIcon />
              <TextInput
                placeholder="Type here"
                value={choice}
                onChange={(value) => handleChangeChoices(idx, value)}
              />
              {idx === choices.length - 1 ? (
                <PlusOutlined
                  onClick={() => setChoices((prev) => [...prev, ""])}
                />
              ) : null}
            </div>
          ))}
        </div>
        <CheckBox
          label="Enable 'Other' option"
          checked={input.other}
          onChange={(checked) => handleChangeInput("other", checked)}
        />
        <TextInput
          label="Max choice allowed"
          placeholder="Type here"
          value={input.maxChoice}
          onChange={(value) => {
            const reg = /^[0-9\b]+$/;
            if (value === "" || reg.test(value)) {
              handleChangeInput("maxChoice", value);
            }
          }}
        />
      </div>
    ),
    "Video question": (
      <div className="flex flex-col gap-3">
        <TextInput placeholder="Additional information" />
        <div className="flex gap-3">
          <TextInput placeholder="Max duration of video in (sec/min)" />
          <SelectInput
            options={[
              { value: "Seconds", label: "Seconds" },
              { value: "Minutes", label: "Minutes" },
            ]}
            placeholder="Select 'Seconds' or 'Minutes'"
          />
        </div>
      </div>
    ),
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <SelectInput
          label="Type"
          options={QUESTION_TYPES}
          value={input.type}
          onChange={(value) => handleChangeInput("type", value)}
        />
        <TextInput
          label="Question"
          placeholder="Type here"
          value={input.question}
          onChange={(value) => handleChangeInput("question", value)}
        />
        {EXTRA_INPUTS[input.type]}
      </div>
      <div className="flex justify-between items-center mt-5">
        <button
          className="text-[#A80000] flex items-center gap-1 text-sm"
          onClick={onDelete}
        >
          <CancelIcon className="h-6 w-6" /> Delete question
        </button>
        <button
          className="bg-[#087B2F] text-white font-bold text-sm py-2 px-3 rounded"
          onClick={onSave}
        >
          Save
        </button>
      </div>
    </>
  );
};

const AdditionalQuestions = ({
  questions,
  handleSaveNewQuestion,
  handleDeleteQuestion,
  handleChangeExistingQuestion,
}) => {
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [newQuestion, setNewQuestion] = useState<any>(null);

  const handleAddQuestion = () => {
    setNewQuestion({
      id: nanoid(),
      type: "",
      question: "",
      choices: [""],
      maxChoice: 0,
      disqualify: false,
      other: false,
    });
  };

  const handleChangeNewQuestion = (input, value) => {
    setNewQuestion((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  const onSaveNewQuestion = () => {
    handleSaveNewQuestion(newQuestion);
    setNewQuestion(null);
  };

  const onDeleteQuestion = (id) => {
    handleDeleteQuestion(id);
    setActiveRow(null);
  };

  return (
    <div>
      {questions.map((item, idx) => (
        <div
          key={idx}
          className={classNames("py-4 border-b border-[#dfdfdf]", {
            "!border-b-0": idx === questions.length - 1,
          })}
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-sm text-[#979797]">{item.type}</span>
              <span className="font-bold text-base">{item.question}</span>
            </div>
            <EditIcon
              className="cursor-pointer"
              onClick={() => setActiveRow(activeRow === idx ? null : idx)}
            />
          </div>
          <div
            className={classNames("h-0 overflow-hidden transition-all", {
              "h-fit pt-4": activeRow === idx,
            })}
          >
            <QuestionComponent
              input={item}
              handleChangeInput={(input, value) =>
                handleChangeExistingQuestion(item.id, input, value)
              }
              onDelete={() => onDeleteQuestion(item.id)}
              onSave={() => setActiveRow(null)}
            />
          </div>
        </div>
      ))}

      {newQuestion ? (
        <div className="py-6 overflow-hidden transition-all ">
          <QuestionComponent
            input={newQuestion}
            handleChangeInput={handleChangeNewQuestion}
            onDelete={() => setNewQuestion(null)}
            onSave={onSaveNewQuestion}
          />
        </div>
      ) : null}

      <div
        className="flex items-center gap-3 text-sm font-bold mt-4 cursor-pointer"
        onClick={handleAddQuestion}
      >
        <PlusOutlined className="text-xl" />
        <span>Add a question</span>
      </div>
    </div>
  );
};

export default AdditionalQuestions;

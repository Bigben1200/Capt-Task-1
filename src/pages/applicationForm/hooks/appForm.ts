import { GET_URL } from "@/Config";
import axios from "axios";
import { useEffect, useState } from "react";
import cloneDeep from "lodash.clonedeep";
import { initialState } from "../Data";

export default () => {
  const [inputs, setInputs] = useState<any>(initialState);

  useEffect(() => {
    getFormData();
  }, []);

  const getFormData = async () => {
    try {
      const { data } = await axios.get(GET_URL);
      setInputs(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (label, key, input, value) => {
    setInputs((prevState) => {
      const _inputs = cloneDeep(prevState);
      _inputs.data.attributes[label][key][input] = value;
      return _inputs;
    });
  };

  const handleChangeCoverImage = (value) => {
    setInputs((prevState) => {
      const _inputs = cloneDeep(prevState);
      _inputs.data.attributes.coverImage = value;
      return _inputs;
    });
  };

  const handleChangeExistingQuestion = (
    label: string,
    key: string,
    id: string,
    input: string,
    value: any
  ) => {
    setInputs((prevState) => {
      const _inputs = cloneDeep(prevState);
      const questions = _inputs.data.attributes[label][key];
      const index = questions.findIndex((x) => x.id === id);
      questions[index] = { ...questions[index], [input]: value };
      _inputs.data.attributes[label][key] = questions;
      return _inputs;
    });
  };

  const handleSaveNewQuestion = (label, input, value) => {
    setInputs((prevState) => {
      const _inputs = cloneDeep(prevState);
      _inputs.data.attributes[label][input] = [
        ..._inputs.data.attributes[label][input],
        value,
      ];
      return _inputs;
    });
  };

  const handleDeleteQuestion = (label, input, id) => {
    setInputs((prevState) => {
      const _inputs = cloneDeep(prevState);
      const questions = _inputs.data.attributes[label][input];
      _inputs.data.attributes[label][input] = questions.filter(
        (item) => item.id !== id
      );
      return _inputs;
    });
  };

  return {
    inputs,
    setInputs,
    handleChangeCoverImage,
    handleChange,
    handleSaveNewQuestion,
    handleDeleteQuestion,
    handleChangeExistingQuestion,
  };
};

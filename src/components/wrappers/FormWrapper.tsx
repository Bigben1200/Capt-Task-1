interface IFormWrapper {
  title: string;
  component: React.ReactNode;
}

const FormWrapper: React.FC<IFormWrapper> = ({ title, component }) => {
  return (
    <div className="bg-white w-[595px] overflow-hidden rounded-[20px] shadow-[3px_3px_14px_0_rgba(190,190,190,.3)]">
      <div className="bg-[#D0F7FA] py-4 px-7">
        <p className="font-bold text-xl">{title}</p>
      </div>
      <div className="p-7">{component}</div>
    </div>
  );
};

export default FormWrapper;

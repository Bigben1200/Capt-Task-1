import classNames from "classnames";

interface IRowWrapper {
  isLastRow: boolean;
  children: React.ReactNode;
}

const RowWrapper: React.FC<IRowWrapper> = ({ isLastRow, children }) => {
  return (
    <div
      className={classNames(
        "flex justify-between items-center py-4 border-b border-[#dfdfdf]",
        {
          "!border-b-0": isLastRow,
        }
      )}
    >
      {children}
    </div>
  );
};

export default RowWrapper;

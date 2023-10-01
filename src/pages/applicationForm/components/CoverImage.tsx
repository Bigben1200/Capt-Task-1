import { useRef } from "react";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";

interface ICoverImage {
  data: any;
  handleChangeCoverImage: (value: string) => void;
}

const CoverImage: React.FC<ICoverImage> = ({
  data,
  handleChangeCoverImage,
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const file = data === "http://example.com" ? "" : data;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageURL = URL.createObjectURL(e.target.files[0]);
    handleChangeCoverImage(imageURL);
  };

  return (
    <div>
      <input
        ref={inputFileRef}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
      {file ? (
        <div className="relative flex flex-col">
          <img
            src={file}
            alt="Cover Image"
            className="w-full h-80 m-auto object-cover rounded-[5px]"
          />
          <div className="self-end text-sm flex gap-5 mt-3">
            <div
              className="flex items-center gap-2 text-gray-500 cursor-pointer p-2 border rounded-md"
              onClick={() => inputFileRef.current.click()}
            >
              <UploadOutlined style={{ fontSize: 18, fontWeight: "bold" }} />
              Re-upload
            </div>
            <div
              className="flex items-center gap-2 text-red-500 cursor-pointer p-2 border border-red-300 rounded-md"
              onClick={() => handleChangeCoverImage("")}
            >
              <DeleteOutlined style={{ fontSize: 17, fontWeight: "bold" }} />
              Delete
            </div>
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col items-center gap-[6px] py-14 text-sm border border-dashed border-black cursor-pointer rounded-[5px]"
          onClick={() => inputFileRef.current.click()}
        >
          <UploadOutlined
            style={{ color: "#000", fontSize: 35, fontWeight: "bold" }}
          />
          <p className="font-bold">Upload cover image</p>
          <p className="text-[#979797]">
            16:9 ratio is recommended. Max image size 1mb
          </p>
        </div>
      )}
    </div>
  );
};

export default CoverImage;

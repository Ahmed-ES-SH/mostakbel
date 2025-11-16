"use client";
import React from "react";
import Img from "./Img";
import { IoMdClose } from "react-icons/io";

export interface ProjectImage {
  id: number;
  project_id: number;
  image_path: string;
}
type ExtendedProjectImage = ProjectImage | { file: File; tempId: string };

interface props {
  errors: any;
  images: ExtendedProjectImage[];
  imagesInputRef: any;
  handleDeleteImage: (item: { file: File; tempId: string }) => void;
}

export default function MultiImages({
  errors,
  images,
  imagesInputRef,
  handleDeleteImage,
}: props) {
  return (
    <>
      {images && images.length > 0 ? (
        <div className="flex flex-col gap-1">
          <label className="my-2 pb-1 border-b w-fit border-b-primary">
            معرض المشروع
          </label>
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 w-full">
            {images.map((item: any, index) => {
              return (
                <div
                  key={item.id ?? item.tempId ?? index}
                  className="w-full rounded-md shadow-sm h-[30vh] relative"
                >
                  <Img
                    src={
                      item.file
                        ? URL.createObjectURL(item.file)
                        : item.image_path
                    }
                    errorSrc="/defaults/noServiceImage.jpg"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <div
                    onClick={() => handleDeleteImage(item)}
                    className="size-6 absolute top-2 right-2 rounded-sm bg-red-400 flex items-center justify-center text-white cursor-pointer hover:bg-red-600 hover:scale-110 duration-300"
                  >
                    <IoMdClose />
                  </div>
                </div>
              );
            })}
            <div
              onClick={() => imagesInputRef.current?.click()}
              className="w-full rounded-md shadow-sm h-[30vh] bg-gray-100 cursor-pointer hover:bg-primary-color duration-300 flex items-center justify-center relative"
            >
              <Img
                src={"/upload.png"}
                className="w-32 rounded-md"
                errorSrc="/noServiceImage.jpg"
              />
            </div>
          </div>
          {errors && errors["images"] && (
            <p className=" text-red-400 underline">{errors["images"]}</p>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <div
            onClick={() => imagesInputRef.current?.click()}
            className="w-full rounded-md shadow-sm h-[30vh] bg-gray-100 cursor-pointer hover:bg-primary-color/50 duration-300 flex items-center justify-center relative"
          >
            <Img
              src={"/upload.png"}
              className="w-32 rounded-md"
              errorSrc="/noServiceImage.jpg"
            />
          </div>
          {errors && errors["images"] && (
            <p className=" text-red-400 underline">{errors["images"]}</p>
          )}
        </div>
      )}
    </>
  );
}

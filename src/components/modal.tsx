/** @format */

import Draggable from "react-draggable";
import { ModalPropsType } from "@/types";
import { cn } from "@/lib/utils";

const Modal = ({ className, children, onClose, title }: ModalPropsType) => {
  return (
    <Draggable>
      <div className="absolute z-50 right-60 top-24">
        <div className="p-2 border rounded-xl bg-white bg-opacity-25">
          <div className="flex justify-between px-2 mb-2">
            <div
              className="flex mt-1 flex-col text-center bg-white bg-opacity-25 justify-center border rounded-full size-[20px] hover:drop-shadow-spark-hover"
              onClick={onClose}
            >
              x
            </div>
            <div className="rounded-full border border-opacity-50 px-2 bg-black bg-opacity-50">
              {title}
            </div>
          </div>
          <div
            className={cn(
              "w-[20vw] bg-white h-[20vh] border rounded-xl p-4 leading-none text-xs text-black overflow-x-scroll",
              className
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default Modal;

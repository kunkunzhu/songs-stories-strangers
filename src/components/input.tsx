/** @format */
"use client";

import useFormStore from "@/store/form";
import { usePathname, useRouter } from "next/navigation";
import { startTransition, useState } from "react";

export const TitleInput = () => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <input
      type="text"
      name="text"
      placeholder="type & search"
      onChange={(e) => {
        clearTimeout(timeoutId);
        let id = setTimeout(() => {
          startTransition(() => {
            let searchParams = e.target.value && `?search=${e.target.value}`;
            if (searchParams) {
              router.push(`${pathname}${searchParams}`);
            }
          });
        }, 500);
        setTimeoutId(id);
      }}
      className="border rounded-lg py-2 px-4 italic bg-white text-black"
    />
  );
};

export const TextInput = () => {
  const { inputText, setInputText } = useFormStore();

  return (
    <>
      <textarea
        placeholder={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="border h-3/4 overflow-scroll resize-none w-full bg-white text-black py-2 px-4 text-xs rounded-lg"
      />
    </>
  );
};

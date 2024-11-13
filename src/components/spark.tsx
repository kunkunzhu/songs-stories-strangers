/** @format */
import Image from "next/image";
import Link from "next/link";

interface SparkI {
  href: string;
  state?: "start" | "in-progress" | "finish";
}

const Spark = ({ href, state = "in-progress" }: SparkI) => {
  return (
    <Link href={href} className="group">
      <Image
        src="/spark.svg"
        alt="spark"
        width={30}
        height={30}
        className="drop-shadow-spark ease-in hover:drop-shadow-spark-hover"
      />
      {state == "start" ? (
        <div className="absolute font-mono hidden opacity-75 tracking-widest -mx-10 italic p-2 group-hover:block">
          what is this?
        </div>
      ) : (
        <div className="absolute font-mono tracking-widest p-2 -mx-10 my-2 text-center hidden group-hover:flex flex-col gap-1">
          <span className="px-6 opacity-75 uppercase">exit</span>
        </div>
      )}
    </Link>
  );
};

export default Spark;

/** @format */
import Image from "next/image";
import Link from "next/link";

const Spark = ({ href }: { href: string }) => {
  return (
    <Link href={href}>
      <Image
        src="/spark.svg"
        alt="spark"
        width={30}
        height={30}
        className="drop-shadow-spark ease-in hover:drop-shadow-spark-hover"
      />
    </Link>
  );
};

export default Spark;

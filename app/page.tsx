import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-green-100">
        <Image
          src={"/logo-ieda-green.png"}
          width={1200}
          height={1200}
          className="w-72 md:w-80 lg:w-96 "
          alt="Logo IEDA"
        />

        <Image
          src={"/ieda-logo.png"}
          width={1200}
          height={1200}
          className="w-72 md:w-80 lg:w-96 absolute hover:opacity-0 transition-opacity"
          alt="Logo IEDA"
        />
      </div>
    </>
  );
}

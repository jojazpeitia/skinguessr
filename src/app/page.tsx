import Image from "next/image"

export default function Home() {
  return (
    <div className="flex justify-center w-screen ">
       <div className="relative overflow-hidden border-4 border-gray-700 rounded shadow-sm h-96 w-96">
          <Image
          src="/roblox-dance.gif"
          height={512}
          width={512}
          quality={100}
          alt="Dragon Lore"
          />
      </div>
    </div>
  );
}

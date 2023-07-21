import Image from "next/image"

export default function Home() {
  return (
    <div className="flex justify-center w-screen mt-20">
       <div className="relative max-w-screen-sm overflow-hidden border-4 border-gray-700 rounded shadow-sm h-max">
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

import Image from "next/image"

export default function Home() {
  return (
    <div className="flex justify-center w-screen mt-28">
       <div className="relative max-w-screen-sm overflow-hidden skew-y-12 border-4 border-gray-700 rounded shadow-2xl h-max">
          <Image
          src="/roblox-dance.gif"
          height={512}
          width={512}
          quality={100}
          alt="Dragon Lore"
          className="scale-125 skew-y-12 rounded-md"
          />
      </div>
    </div>
  );
}

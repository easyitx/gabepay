import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/app_logo.svg"
      alt="Gabepay logo mark"
      width={175}
      height={34}
      className="w-full h-full not-sm:h-[70%] object-contain select-none"
      priority
      draggable={false}
    />
  );
}

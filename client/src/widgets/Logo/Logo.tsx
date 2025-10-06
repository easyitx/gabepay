import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-2 md:gap-3 select-none">
      <Image
        src="/Logo.png"
        alt="Gabepay logo mark"
        width={40}
        height={40}
        className="w-8 h-8 md:w-14 md:h-14"
        priority
        draggable={false}
      />
      <span
        className="text-accent font-black text-xl md:text-3xl"
        style={{ lineHeight: 1 }}
      >
        Gabepay
      </span>
    </div>
  );
}

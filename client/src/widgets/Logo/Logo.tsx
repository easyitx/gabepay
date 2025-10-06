import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-3 select-none">
      <Image
        src="/Logo.png"
        alt="Gabepay logo mark"
        width={56}
        height={56}
        priority
        draggable={false}
      />
      <span
        className="text-accent font-black"
        style={{ fontSize: "32px", lineHeight: 1 }}
      >
        Gabepay
      </span>
    </div>
  );
}

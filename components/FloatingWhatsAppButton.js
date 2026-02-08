"use client";

export default function FloatingWhatsAppButton() {
  return (
    <button
      onClick={() => window.open("https://wa.me/234XXXXXXXXXX", "_blank")}
      className="
        fixed bottom-6 right-6
        z-9999
        pointer-events-auto
        w-16 h-16
        rounded-full
        bg-[#25D366]
        shadow-2xl
        flex items-center justify-center
        hover:scale-110
        transition
      "
    >
      <svg
        className="w-8 h-8 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12.04 2C6.58 2 2.04 6.54 2.04 12c0 1.96.56 3.85 1.62 5.48L2 22l4.7-1.56a9.92 9.92 0 0 0 5.34 1.52c5.46 0 10-4.54 10-10s-4.54-10-10-10z" />
      </svg>
    </button>
  );
}

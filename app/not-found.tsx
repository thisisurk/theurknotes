import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center justify-center px-6 py-32">
      <div className="text-center">
        <p className="section-label mb-4">404</p>
        <h1
          className="text-primary"
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: "1rem",
          }}
        >
          ไม่เจอหน้านั้น
        </h1>
        <p className="text-secondary mb-8" style={{ lineHeight: 1.7 }}>
          อาจจะถูกลบ ย้าย หรือยังไม่เคยมี
        </p>
        <Link href="/" className="link-gold text-sm">
          ← กลับหน้าแรก
        </Link>
      </div>
    </section>
  );
}

import { useState, useEffect } from "react";

interface TOCItem {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

const TableOfContents = ({ items }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      className="reveal"
      style={{ position: "sticky", top: 96, display: "grid", gap: "var(--s2)" }}
    >
      <p
        style={{
          fontFamily: "var(--body)",
          fontSize: "var(--step--1)",
          fontWeight: 600,
          letterSpacing: "var(--track-caps)",
          textTransform: "uppercase",
          color: "var(--green)",
          marginBottom: "var(--s2)",
        }}
      >
        On This Page
      </p>
      {items.map((item) => {
        const isActive = activeId === item.id;
        return (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              fontFamily: "var(--body)",
              fontSize: "var(--step-0)",
              padding: "8px 14px",
              borderRadius: 6,
              cursor: "pointer",
              background: isActive ? "var(--green-wash)" : "transparent",
              color: isActive ? "var(--green)" : "var(--mid)",
              fontWeight: isActive ? 600 : 400,
              borderLeft: isActive ? "2px solid var(--green)" : "2px solid transparent",
              transition: "color var(--dur-micro) var(--ease-micro), background var(--dur-micro) var(--ease-micro)",
            }}
          >
            {item.title}
          </button>
        );
      })}
    </nav>
  );
};

export default TableOfContents;

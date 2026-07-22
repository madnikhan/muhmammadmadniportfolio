import { profile } from "@/content/profile";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = `${profile.name} — ${profile.role}`;

export function BrandOgMarkup() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#070b09",
        color: "#c8e6d4",
        padding: "56px 64px",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: 22, color: "#6b8f7a" }}>
          <span style={{ color: "#33ff99" }}>$</span>
          <span>~/madni</span>
          <span style={{ color: "#33ff99" }}>▋</span>
        </div>
        <div style={{ fontSize: 18, color: "#6b8f7a" }}>portfolio — UK</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18, width: "100%" }}>
        <div style={{ fontSize: 22, color: "#33ff99", letterSpacing: "0.08em" }}>
          FULL STACK SOFTWARE ENGINEER
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#33ff99",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          {profile.name}
        </div>
        <div style={{ fontSize: 28, color: "#c8e6d4", maxWidth: 900, lineHeight: 1.35 }}>
          {profile.headline}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          width: "100%",
          borderTop: "1px solid rgba(51,255,153,0.25)",
          paddingTop: 28,
        }}
      >
        <div style={{ display: "flex", gap: 28, fontSize: 20, color: "#6b8f7a" }}>
          <span>
            <span style={{ color: "#33ff99" }}>{profile.yearsExperience}+</span> years
          </span>
          <span>
            <span style={{ color: "#33ff99" }}>{profile.projectsDelivered}+</span> projects
          </span>
          <span>Merseyside, UK</span>
        </div>
        <div style={{ fontSize: 18, color: "#33ff99" }}>madnikhan.dev</div>
      </div>
    </div>
  );
}

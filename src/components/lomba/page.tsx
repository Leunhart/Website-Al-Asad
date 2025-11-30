"use client";

export default function LombaSection() {
  return (
    <section
      id="lomba-kompetisi"
      style={{
        background: "#121213",
        padding: "40px 0",
        color: "white",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "36px",
          fontWeight: 600,
          marginBottom: "50px",
        }}
      >
        Lomba & Kompetisi
      </h2>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "35px",
        }}
      >
        {/* ================= CARD 1 — MERAH ================= */}
        <div
          style={{
            border: "1px solid #262626",
            borderRadius: "10px",
            background: "#1b1b1c",
          }}
        >
          <div
            style={{
              background: "#722F37",
              padding: "18px 20px",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <span style={{ fontSize: "20px" }}>🏆 Turnamen Regional</span>
            <span style={{ fontSize: "14px" }}>15–17 November 2025</span>
          </div>

          <div style={{ padding: "18px 22px" }}>
            <p style={{ marginBottom: "12px", opacity: 0.9 }}>
              📍 Lapangan Panahan Regional, Jakarta
            </p>

            <p style={{ marginBottom: "15px", opacity: 0.85 }}>
              Kompetisi tingkat regional untuk semua kategori panahan.
            </p>

            {/* Tags */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
              {["Recurve", "Compound", "Traditional"].map((tag, i) => (
                <span
                  key={i}
                  style={{
                    background: "#722F37",
                    color: "black",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Button */}
            <button
              style={{
                width: "100%",
                padding: "10px",
                background: "#111",
                color: "white",
                borderRadius: "6px",
                border: "1px solid #333",
                cursor: "pointer",
                transition: "0.25s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#722F37")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#111")}
            >
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>

        {/* ================= CARD 2 — KUNING ================= */}
        <div
          style={{
            border: "1px solid #262626",
            borderRadius: "10px",
            background: "#1b1b1c",
          }}
        >
          <div
            style={{
              background: "#D4A62A",
              padding: "18px 20px",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <span style={{ fontSize: "20px" }}>🏆 Championship Nasional</span>
            <span style={{ fontSize: "14px" }}>20–25 Desember 2025</span>
          </div>

          <div style={{ padding: "18px 22px" }}>
            <p style={{ marginBottom: "12px", opacity: 0.9 }}>📍 Senayan, Jakarta</p>

            <p style={{ marginBottom: "15px", opacity: 0.85 }}>
              Kejuaraan nasional dengan hadiah besar untuk para juara.
            </p>

            <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
              {["National Level", "Prize Pool"].map((tag, i) => (
                <span
                  key={i}
                  style={{
                    background: "#D4A62A",
                    color: "black",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Button tetap hover kuning */}
            <button
              style={{
                width: "100%",
                padding: "10px",
                background: "#111",
                color: "white",
                borderRadius: "6px",
                border: "1px solid #333",
                cursor: "pointer",
                transition: "0.25s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#D4A62A")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#111")}
            >
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>

        {/* ================= CARD 3 — KUNING ================= */}
        <div
          style={{
            border: "1px solid #262626",
            borderRadius: "10px",
            background: "#1b1b1c",
          }}
        >
          <div
            style={{
              background: "#D4A62A",
              padding: "18px 20px",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <span style={{ fontSize: "20px" }}>🏅 Fun Competition Kids</span>
            <span style={{ fontSize: "14px" }}>5 Januari 2026</span>
          </div>

          <div style={{ padding: "18px 22px" }}>
            <p style={{ marginBottom: "12px", opacity: 0.9 }}>📍 Lapangan Club Panahan</p>

            <p style={{ marginBottom: "15px", opacity: 0.85 }}>
              Kompetisi santai dan edukatif khusus untuk anak-anak.
            </p>

            <div style={{ marginBottom: "20px" }}>
              <span
                style={{
                  background: "#D4A62A",
                  color: "black",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                Kids Event
              </span>
            </div>

            {/* Button hover kuning */}
            <button
              style={{
                width: "100%",
                padding: "10px",
                background: "#111",
                color: "white",
                borderRadius: "6px",
                border: "1px solid #333",
                cursor: "pointer",
                transition: "0.25s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#D4A62A")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#111")}
            >
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>

        {/* ================= CARD 4 — MERAH ================= */}
        <div
          style={{
            border: "1px solid #262626",
            borderRadius: "10px",
            background: "#1b1b1c",
          }}
        >
          <div
            style={{
              background: "#722F37",
              padding: "18px 20px",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <span style={{ fontSize: "20px" }}>🎯 Internal Club Tournament</span>
            <span style={{ fontSize: "14px" }}>Setiap bulan</span>
          </div>

          <div style={{ padding: "18px 22px" }}>
            <p style={{ marginBottom: "12px", opacity: 0.9 }}>📍 Lapangan Club Panahan</p>

            <p style={{ marginBottom: "15px", opacity: 0.85 }}>
              Turnamen internal rutin antar anggota untuk melatih kompetisi.
            </p>

            <div style={{ marginBottom: "20px" }}>
              <span
                style={{
                  background: "#722F37",
                  color: "black",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                Internal Level
              </span>
            </div>

            {/* Button hover merah */}
            <button
              style={{
                width: "100%",
                padding: "10px",
                background: "#111",
                color: "white",
                borderRadius: "6px",
                border: "1px solid #333",
                cursor: "pointer",
                transition: "0.25s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#722F37")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#111")}
            >
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

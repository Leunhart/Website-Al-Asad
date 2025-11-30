export default function VisiMisiSection() {
  return (
    <section
      id="visi-misi"
      style={{
        background: "#121213",
        padding: "80px 0",
        color: "white",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        {/* VISI */}
        <div
          style={{
            flex: 1,
            minWidth: "360px",
            background: "#1a1a1b",
            border: "1px solid #262626",
            borderRadius: "12px",
            padding: "28px 25px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#c9a12c",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "18px",
                marginRight: "12px",
              }}
            >
              🎯
            </div>

            <h2 style={{ fontSize: "24px", fontWeight: 600 }}>Visi</h2>
          </div>

          <p style={{ lineHeight: "1.7", fontSize: "14px", opacity: 0.95 }}>
            Menjadi klub panahan terdepan di Indonesia yang mencetak atlet-atlet
            berprestasi dan memasyarakatkan olahraga panahan sebagai gaya hidup
            sehat dan sportif.
          </p>
        </div>

        {/* MISI */}
        <div
          style={{
            flex: 1,
            minWidth: "360px",
            background: "#1a1a1b",
            border: "1px solid #262626",
            borderRadius: "12px",
            padding: "28px 25px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#a0324a",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "18px",
                marginRight: "12px",
              }}
            >
              ❤️
            </div>

            <h2 style={{ fontSize: "24px", fontWeight: 600 }}>Misi</h2>
          </div>

          <ul style={{ paddingLeft: "18px", fontSize: "14px", lineHeight: "1.7" }}>
            <li style={{ marginBottom: "6px", color: "#f26b6b" }}>
              <span style={{ color: "white" }}>
                Memberikan pelatihan berkualitas dengan standar internasional
              </span>
            </li>

            <li style={{ marginBottom: "6px", color: "#f26b6b" }}>
              <span style={{ color: "white" }}>
                Mengembangkan karakter dan disiplin melalui olahraga
              </span>
            </li>

            <li style={{ marginBottom: "6px", color: "#f26b6b" }}>
              <span style={{ color: "white" }}>
                Menciptakan komunitas panahan yang solid dan suportif
              </span>
            </li>

            <li style={{ marginBottom: "6px", color: "#f26b6b" }}>
              <span style={{ color: "white" }}>
                Memfasilitasi atlet untuk berkompetisi di berbagai event
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function FasilitasSection() {
  return (
    <section
      id="fasilitas"
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
          marginBottom: "50px",
          fontWeight: 600,
        }}
      >
        Fasilitas
      </h2>

      {/* 4 Card Fasilitas */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "60px",
        }}
      >
        {/* Card 1 */}
        <div
          style={{
            width: "250px",
            padding: "25px",
            borderRadius: "14px",
            textAlign: "center",
            background: "#1b1b1c",
            border: "1px solid #262626",
            transition: "0.2s",
          }}
        >
          <div style={{ fontSize: "40px", marginBottom: "15px" }}>🎯</div>
          <h3 style={{ marginBottom: "10px", fontWeight: 600 }}>
            Target Standar Internasional
          </h3>
          <p style={{ fontSize: "14px", lineHeight: "1.6", opacity: 0.9 }}>
            Target berkualitas tinggi sesuai standar kompetisi internasional
          </p>
        </div>

        {/* Card 2 */}
        <div
          style={{
            width: "250px",
            padding: "25px",
            borderRadius: "14px",
            textAlign: "center",
            background: "#1b1b1c",
            border: "1px solid #262626",
            transition: "0.2s",
          }}
        >
          <div style={{ fontSize: "40px", marginBottom: "15px" }}>🏹</div>
          <h3 style={{ marginBottom: "10px", fontWeight: 600 }}>
            Peralatan Lengkap
          </h3>
          <p style={{ fontSize: "14px", lineHeight: "1.6", opacity: 0.9 }}>
            Busur dan arrow berkualitas tersedia untuk peminjaman
          </p>
        </div>

        {/* Card 3 */}
        <div
          style={{
            width: "250px",
            padding: "25px",
            borderRadius: "14px",
            textAlign: "center",
            background: "#1b1b1c",
            border: "1px solid #262626",
            transition: "0.2s",
          }}
        >
          <div style={{ fontSize: "40px", marginBottom: "15px" }}>🧍‍♂️</div>
          <h3 style={{ marginBottom: "10px", fontWeight: 600 }}>
            Ruang Istirahat
          </h3>
          <p style={{ fontSize: "14px", lineHeight: "1.6", opacity: 0.9 }}>
            Area istirahat yang nyaman dengan fasilitas lengkap
          </p>
        </div>

        {/* Card 4 */}
        <div
          style={{
            width: "250px",
            padding: "25px",
            borderRadius: "14px",
            textAlign: "center",
            background: "#1b1b1c",
            border: "1px solid #262626",
            transition: "0.2s",
          }}
        >
          <div style={{ fontSize: "40px", marginBottom: "15px" }}>🏞️</div>
          <h3 style={{ marginBottom: "10px", fontWeight: 600 }}>
            Lapangan Outdoor
          </h3>
          <p style={{ fontSize: "14px", lineHeight: "1.6", opacity: 0.9 }}>
            Lapangan luas dengan pemandangan alam yang asri
          </p>
        </div>
      </div>

      {/* Gambar */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "25px",
          flexWrap: "wrap",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1572726243931-884b05e4a198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          style={{
            width: "300px",
            height: "200px",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />

        <img
          src="https://images.unsplash.com/photo-1672702251238-c5a34065e7c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          style={{
            width: "300px",
            height: "200px",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />

        <img
          src="https://images.unsplash.com/photo-1721885876144-25863108be60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          style={{
            width: "300px",
            height: "200px",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />
      </div>
    </section>
  );
}
"use client";

export default function PendaftaranEventSection() {
  return (
    <section
      id="pendaftaran-event"
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
          marginBottom: "40px",
          color: "white",
        }}
      >
        Pendaftaran Event
      </h2>

      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "#1b1b1c",
          border: "1px solid #262626",
          borderRadius: "10px",
          padding: "35px 40px",
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
          }}
        >
          {/* 1. Nama Event */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "15px" }}>Nama Event</label>
            <input
              type="text"
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #333",
                background: "#111",
                color: "white",
              }}
            />
          </div>

          {/* 2. Nama Penyelenggara */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "15px" }}>Nama Penyelenggara</label>
            <input
              type="text"
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #333",
                background: "#111",
                color: "white",
              }}
            />
          </div>

          {/* 5. No WhatsApp Admin Penyelenggara */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "15px" }}>No. WhatsApp Admin</label>
            <input
              type="text"
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #333",
                background: "#111",
                color: "white",
              }}
              placeholder="0812xxxxxxx"
            />
          </div>

          {/* 6. Tanggal Event */}
          <div>
            <label style={{ fontSize: "15px" }}>Tanggal Event</label>
            <div
              style={{
                display: "flex",
                gap: "15px",
                marginTop: "6px",
              }}
            >
              <input
                type="date"
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #333",
                  background: "#111",
                  color: "white",
                }}
              />
              <input
                type="date"
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #333",
                  background: "#111",
                  color: "white",
                }}
              />
            </div>
          </div>

          {/* 7. Lokasi Event */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "15px" }}>Lokasi Event</label>
            <input
              type="text"
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #333",
                background: "#111",
                color: "white",
              }}
              placeholder="Contoh: Lapangan Panahan Jakarta"
            />
          </div>

          {/* 8. Tingkat Event */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "15px" }}>Tingkat Event</label>
            <select
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #333",
                background: "#111",
                color: "white",
              }}
            >
              <option>Lokal</option>
              <option>Regional</option>
              <option>Nasional</option>
              <option>Internasional</option>
            </select>
          </div>

          {/* 10. Deskripsi Event */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "15px" }}>Deskripsi Event</label>
            <textarea
              rows={5}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #333",
                background: "#111",
                color: "white",
              }}
              placeholder="Jelaskan detail event..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              marginTop: "10px",
              padding: "12px",
              background: "#722F37",
              borderRadius: "8px",
              border: "none",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
              transition: "0.25s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#8a3b46")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "#722F37")
            }
          >
            Kirim Pendaftaran
          </button>
        </form>
      </div>
    </section>
  );
}

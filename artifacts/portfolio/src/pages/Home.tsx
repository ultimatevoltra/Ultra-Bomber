import { useState, useEffect, useRef } from "react";

const API_LIST = [
  "PaperFly", "Ghoori", "Doctime", "Sundarban", "Apex4U",
  "Robi", "Banglalink", "Banglalink OTP", "Grameenphone", "Robi Offer",
  "Robi DA", "Robi Chat", "Redx", "Fundesh", "Bikroy",
  "MotionView", "Chorki", "Jatri", "ChinaOnline", "Deepto",
  "Shikho", "Redx Signup", "Bioscope", "Binge", "AppLink",
  "Chokrojan", "Dhaka Bank", "Easy", "Eshop", "FSIBL",
  "MyGP", "GP Shop", "Hishabee", "Iqra", "Robi Smart",
  "MCB", "Mithai", "EnglishMoja", "MoveOn", "OshudPotro",
  "MyGP Login", "Qcoom", "Circle", "Shomvob", "ToyBox",
  "Win2Gain", "Kepler", "Roots Edu", "Roots Forget"
];

const SERVICES = [
  { icon: "fas fa-code", title: "Web Development", description: "Building modern, responsive websites and web applications using latest technologies." },
  { icon: "fas fa-user-shield", title: "Cyber Security", description: "Securing your online presence and protecting accounts from unauthorized access." },
  { icon: "fas fa-palette", title: "Graphic Design", description: "Designing unique logos, banners, and marketing materials for your brand." },
  { icon: "fas fa-pen-nib", title: "Content Writing", description: "Engaging and SEO-friendly writing for blogs, websites, and social media ads." }
];

const SOCIALS = [
  { icon: "fab fa-facebook-f", label: "Facebook", url: "https://www.facebook.com/profile.php?id=61588354202467", hoverBg: "#1877F2" },
  { icon: "fab fa-instagram", label: "Instagram", url: "https://www.instagram.com/mdsisirmdsisir44?igsh=ZWtzaWZ5YmRtb3k4", hoverBg: "#E4405F" },
  { icon: "fab fa-whatsapp", label: "WhatsApp", url: "https://wa.me/92727766256", hoverBg: "#25D366" },
  { icon: "fab fa-telegram-plane", label: "Telegram", url: "https://t.me/Shishir699", hoverBg: "#0088cc" },
  { icon: "fas fa-envelope", label: "Email", url: "mailto:Shshishir7777@gmail.com", hoverBg: "#3b82f6" }
];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: "all 0.7s ease-out",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)"
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh" }}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

      <nav style={{
        position: "fixed", top: 0, left: 0, width: "100%", zIndex: 999,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 8%", background: "rgba(11,12,23,0.85)", backdropFilter: "blur(10px)"
      }}>
        <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "white" }}>
          SHISHIR<span style={{ color: "#3b82f6" }}> AHMED</span>
        </div>
        <div style={{ display: "flex", gap: "15px" }}>
          <a href="#services" style={{ fontWeight: 500, color: "white", transition: "0.3s", fontSize: "0.9rem" }}>Services</a>
          <a href="#apis" style={{ fontWeight: 500, color: "white", transition: "0.3s", fontSize: "0.9rem" }}>APIs</a>
          <a href="#contact" style={{ fontWeight: 500, color: "white", transition: "0.3s", fontSize: "0.9rem" }}>Contact</a>
        </div>
      </nav>

      <header style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        padding: "12vh 8% 6vh", flexDirection: "column", textAlign: "center"
      }}>
        <FadeIn>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{
              width: 180, height: 180, borderRadius: "50%",
              border: "4px solid #3b82f6", boxShadow: "0 0 30px rgba(59,130,246,0.5)",
              background: "linear-gradient(135deg, #1e293b, #0f172a)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "3.5rem", fontWeight: 700, color: "#3b82f6"
            }}>
              SA
            </div>
            <h1 style={{ fontSize: "3rem", marginTop: 15 }}>
              SHISHIR <span style={{ color: "#3b82f6" }}>AHMED</span>
            </h1>
            <p style={{ color: "#98a0b3", marginBottom: 20 }}>Developer | Designer | Cyber Expert</p>

            <div style={{
              display: "flex", flexDirection: "column", gap: 10,
              width: "100%", maxWidth: 280
            }}>
              <a href="#apis" style={{
                padding: 12, borderRadius: 10, fontWeight: "bold", textAlign: "center",
                display: "block", background: "#3b82f6", color: "white", transition: "0.3s"
              }}>
                <i className="fas fa-server" style={{ marginRight: 8 }} />
                View APIs ({API_LIST.length})
              </a>
              <a href="#services" style={{
                padding: 12, borderRadius: 10, fontWeight: "bold", textAlign: "center",
                display: "block", background: "rgba(255,255,255,0.1)", color: "white",
                border: "1px solid rgba(255,255,255,0.2)", transition: "0.3s"
              }}>
                <i className="fas fa-briefcase" style={{ marginRight: 8 }} />
                My Services
              </a>
            </div>
          </div>
        </FadeIn>
      </header>

      <section id="apis" style={{ padding: "80px 8%" }}>
        <FadeIn>
          <h2 style={{ textAlign: "center", fontSize: "2.2rem", marginBottom: 15 }}>
            Available APIs
          </h2>
          <p style={{ textAlign: "center", color: "#98a0b3", marginBottom: 40, fontSize: "1rem" }}>
            Total {API_LIST.length} APIs integrated and ready to use
          </p>
        </FadeIn>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 15
        }}>
          {API_LIST.map((api, idx) => (
            <FadeIn key={api} delay={idx * 20}>
              <div style={{
                backdropFilter: "blur(10px)",
                background: "rgba(255,255,255,0.05)",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "16px 20px",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "default"
              }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "#3b82f6";
                  el.style.transform = "translateY(-3px)";
                  el.style.boxShadow = "0 8px 25px rgba(59,130,246,0.2)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(255,255,255,0.1)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                <i className="fas fa-check-circle" style={{ color: "#22c55e", fontSize: 16 }} />
                <span style={{ fontWeight: 500, fontSize: "0.95rem" }}>{api}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="services" style={{ padding: "80px 8%" }}>
        <FadeIn>
          <h2 style={{ textAlign: "center", fontSize: "2.2rem", marginBottom: 40 }}>My Services</h2>
        </FadeIn>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20
        }}>
          {SERVICES.map((service, idx) => (
            <FadeIn key={service.title} delay={idx * 100}>
              <div
                style={{
                  backdropFilter: "blur(10px)",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 15,
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: 30,
                  transition: "all 0.3s ease",
                  textAlign: "center"
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "translateY(-5px)";
                  el.style.borderColor = "#3b82f6";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "translateY(0)";
                  el.style.borderColor = "rgba(255,255,255,0.1)";
                }}
              >
                <i className={service.icon} style={{ fontSize: 45, color: "#3b82f6", marginBottom: 20, display: "block" }} />
                <h3 style={{ marginBottom: 12, fontSize: "1.3rem" }}>{service.title}</h3>
                <p style={{ fontSize: "0.95rem", color: "#98a0b3", lineHeight: 1.6 }}>{service.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="contact" style={{ padding: "80px 8%" }}>
        <FadeIn>
          <h2 style={{ textAlign: "center", fontSize: "2.2rem", marginBottom: 40 }}>Connect With Me</h2>
        </FadeIn>
        <FadeIn delay={100}>
          <div style={{
            display: "flex", justifyContent: "center", gap: 15,
            flexWrap: "wrap", marginTop: 30
          }}>
            {SOCIALS.map((social, idx) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "12px 20px", borderRadius: 10,
                  background: hoveredSocial === idx ? social.hoverBg : "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  transition: "all 0.3s ease", fontWeight: 600, color: "white",
                  transform: hoveredSocial === idx ? "translateY(-5px)" : "translateY(0)"
                }}
                onMouseEnter={() => setHoveredSocial(idx)}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                <i className={social.icon} />
                {social.label}
              </a>
            ))}
          </div>
        </FadeIn>
      </section>

      <footer style={{
        textAlign: "center", padding: 30,
        background: "#0b0c17", color: "#98a0b3"
      }}>
        &copy; 2026 SHISHIR AHMED | All Rights Reserved.
      </footer>
    </div>
  );
}

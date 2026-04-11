import { useEffect, useRef, useState } from "react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

interface ApiResult {
  name: string;
  success: boolean;
}

interface SmsResponse {
  results: ApiResult[];
  successCount: number;
  failCount: number;
  totalApis: number;
}

function MatrixCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const chars = "01";
    let drops: number[] = Array(Math.floor(canvas.width / 10)).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.07)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ffbf";
      ctx.font = "14px monospace";
      drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * 10, y * 10);
        if (y * 10 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };

    const id = setInterval(draw, 33);
    return () => {
      clearInterval(id);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed", top: 0, left: 0,
        width: "100%", height: "100%",
        zIndex: -1, background: "black",
      }}
    />
  );
}

export default function Home() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("1");
  const [output, setOutput] = useState("Output will appear here...");
  const [loading, setLoading] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const append = (msg: string) => {
    setOutput((prev) => (prev === "Output will appear here..." ? msg : prev + "\n" + msg));
    setTimeout(() => {
      if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }, 0);
  };

  const handleSend = async () => {
    const normalizedPhone = phone.replace(/[^0-9]/g, "");
    if (!normalizedPhone) {
      setOutput("[ ERROR ] Phone number is required.");
      return;
    }
    const cycles = parseInt(amount) || 1;
    setOutput("");
    setLoading(true);

    append(`[ INFO ] Target: ${normalizedPhone}`);
    append(`[ INFO ] Cycles: ${cycles}`);
    append(`[ INFO ] Starting attack...`);
    append("─".repeat(50));

    try {
      const res = await fetch(`${BASE}/api/sms/send`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ phone: normalizedPhone, amount: cycles }),
      });
      const data: SmsResponse = await res.json();

      const apisPerCycle = data.totalApis / cycles;
      const firstCycleResults = data.results.slice(0, apisPerCycle);

      firstCycleResults.forEach((r) => {
        const status = r.success ? "[ ✓ OK ]  " : "[ ✗ FAIL ]";
        append(`  ${status} ${r.name}`);
      });

      const firstSuccess = firstCycleResults.filter((r) => r.success).length;
      const firstFail = firstCycleResults.filter((r) => !r.success).length;
      append("─".repeat(50));
      append(`[ DONE ] Success: ${firstSuccess} | Failed: ${firstFail} | Total: ${apisPerCycle}`);
    } catch (e: unknown) {
      append(`[ ERROR ] ${e instanceof Error ? e.message : "Request failed"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MatrixCanvas />
      <div style={{
        width: "100%", maxWidth: 940, margin: "50px auto", padding: "28px",
        background: "rgba(0,0,0,0.45)", border: "1px solid rgba(0,255,180,0.2)",
        borderRadius: 12, backdropFilter: "blur(4px)",
        fontFamily: '"Courier New", monospace',
      }}>
        <h3 style={{
          fontSize: 34, textAlign: "center", marginTop: 0, marginBottom: 20,
          color: "#00ffbf", fontWeight: 700, textShadow: "0 0 12px #00ffbf",
        }}>
          ☠️ SMS Bomber Counter ☠️
        </h3>

        <label style={{ color: "#7fffe0", fontSize: 14, display: "block", marginBottom: 6 }}>
          Phone Number
        </label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="017xxxxxxxx"
          style={{
            width: "100%", padding: 12, fontSize: 16,
            color: "#00ffbf", background: "#031319",
            border: "1px solid #00ffbf", borderRadius: 8,
            marginBottom: 14, boxSizing: "border-box",
            fontFamily: '"Courier New", monospace',
            outline: "none",
          }}
        />

        <label style={{ color: "#7fffe0", fontSize: 14, display: "block", marginBottom: 6 }}>
          Amount (Cycles)
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          min={1}
          max={10}
          placeholder="1"
          style={{
            width: "100%", padding: 12, fontSize: 16,
            color: "#00ffbf", background: "#031319",
            border: "1px solid #00ffbf", borderRadius: 8,
            marginBottom: 14, boxSizing: "border-box",
            fontFamily: '"Courier New", monospace',
            outline: "none",
          }}
        />

        <button
          onClick={handleSend}
          disabled={loading}
          style={{
            width: "100%", padding: 12, fontSize: 16,
            color: "#00ffbf", background: loading ? "#001a15" : "#012e26",
            border: "1px solid #00ffbf", borderRadius: 8,
            marginBottom: 14, cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 700, transition: "0.2s",
            fontFamily: '"Courier New", monospace',
            boxShadow: loading ? "0 0 12px #00ffbf55" : "none",
          }}
          onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "#005f52"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 12px #00ffbf"; }}
          onMouseLeave={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "#012e26"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
        >
          {loading ? "⏳ Sending..." : "⚡ Start Bombing"}
        </button>

        <div
          ref={outputRef}
          style={{
            background: "#000", border: "1px solid rgba(0,255,191,0.2)",
            padding: 12, height: 280, overflowY: "auto",
            borderRadius: 8, color: "#00ffbf", fontSize: 13,
            marginTop: 12, whiteSpace: "pre-wrap",
            fontFamily: '"Courier New", monospace',
            lineHeight: 1.6,
          }}
        >
          {output}
        </div>

      </div>
    </>
  );
}

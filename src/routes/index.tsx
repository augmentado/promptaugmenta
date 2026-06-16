import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Augmenta — 내 질문의 한계가 AI의 한계가 된다" },
      {
        name: "description",
        content:
          "막연한 아이디어를 AI가 이해할 수 있는 구조로 바꾸고, 최적의 프롬프트와 워크플로우로 실행 결과까지 연결하는 AI 실행 플랫폼.",
      },
      { property: "og:title", content: "Augmenta — AI 실행 플랫폼" },
      {
        property: "og:description",
        content: "아이디어 → 프롬프트 → 실행 → 마켓플레이스. AI 활용의 격차를 좁힙니다.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Marquee />
      <Problem />
      <Journey />
      <Features />
      <Position />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2">
          <Logo />
          <span className="font-display text-[15px] font-bold tracking-tight">Augmenta</span>
        </a>
        <nav className="hidden gap-7 text-[13px] text-muted-foreground md:flex">
          <a href="#problem" className="hover:text-foreground">문제</a>
          <a href="#journey" className="hover:text-foreground">작동방식</a>
          <a href="#features" className="hover:text-foreground">기능</a>
          <a href="#pricing" className="hover:text-foreground">요금</a>
        </nav>
        <a
          href="#cta"
          className="rounded-full bg-foreground px-4 py-1.5 text-[12px] font-medium text-background transition hover:bg-accent"
        >
          Waitlist
        </a>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor" />
      <path d="M7 17L12 7L17 17M9 14H15" stroke="var(--paper)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border grain">
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 md:pt-24">
        <div className="mb-8 flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
          <span className="inline-block h-px w-8 bg-foreground" />
          <span>AI Execution Platform · v0.1</span>
        </div>

        <h1 className="font-display text-[44px] font-bold leading-[1.02] tracking-[-0.025em] text-balance md:text-[88px]">
          내 질문의 한계가<br />
          <span className="inline-flex items-baseline">
            <em className="not-italic text-accent">AI의 한계</em>
            <span className="ml-1 inline-block h-[0.9em] w-[0.08em] translate-y-[0.05em] bg-foreground blink" aria-hidden />
          </span>
          가 된다.
        </h1>

        <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-[17px]">
          Augmenta는 막연한 아이디어를 <span className="text-foreground">AI가 이해할 수 있는 구조</span>로 변환하고,
          최적의 프롬프트와 워크플로우로 <span className="text-foreground">실행 결과</span>까지 연결합니다.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#cta"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-[14px] font-medium text-background transition hover:bg-accent"
          >
            얼리 액세스 신청
            <span className="transition group-hover:translate-x-0.5">→</span>
          </a>
          <a
            href="#journey"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-[14px] font-medium text-foreground hover:bg-secondary"
          >
            작동 방식 보기
          </a>
        </div>

        {/* Hero diagram */}
        <div className="mt-16 grid gap-3 md:mt-24 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <DiagramCard
            label="BEFORE"
            tone="muted"
            lines={["“부동산 투자 분석", "서비스 만들고 싶어”", "→ 막연한 생각"]}
          />
          <Arrow />
          <DiagramCard
            label="AUGMENTA"
            tone="ink"
            lines={["역할 · 컨텍스트 · 형식", "구조화 + Prompt 생성", "+ Workflow 연결"]}
          />
          <Arrow />
          <DiagramCard
            label="AFTER"
            tone="flame"
            lines={["실행 가능한 결과물", "문서 · 분석 · 콘텐츠", "→ 공유 / 판매"]}
          />
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <div className="flex items-center justify-center text-muted-foreground md:px-2">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="rotate-90 md:rotate-0">
        <path d="M4 12h15M14 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function DiagramCard({
  label,
  lines,
  tone,
}: {
  label: string;
  lines: string[];
  tone: "muted" | "ink" | "flame";
}) {
  const styles =
    tone === "ink"
      ? "bg-foreground text-background border-foreground"
      : tone === "flame"
        ? "bg-accent text-accent-foreground border-accent"
        : "bg-card text-foreground border-border";
  return (
    <div className={`rounded-xl border p-5 ${styles}`}>
      <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">{label}</div>
      <div className="space-y-1 text-[14px] leading-snug">
        {lines.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- MARQUEE ---------------- */
function Marquee() {
  const items = [
    "1인 창업자",
    "크리에이터",
    "마케터",
    "기획자",
    "개발 비전문가",
    "사이드 프로젝트",
    "AI Beginner",
    "AI Power User",
    "AI Creator",
  ];
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-b border-border bg-foreground text-background">
      <div className="flex whitespace-nowrap py-4 marquee">
        {row.map((t, i) => (
          <span key={i} className="mx-6 font-display text-[14px] font-medium tracking-tight opacity-90">
            <span className="mr-6 text-accent">✦</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- PROBLEM ---------------- */
function Problem() {
  const items = [
    {
      n: "01",
      title: "AI 활용 격차",
      body: "모델은 빠르게 발전하지만, 대부분은 원하는 결과를 얻기 위한 질문 방법을 모릅니다. 무엇을, 어떤 맥락으로, 어떤 구조로 물어야 할지 알 수 없습니다.",
    },
    {
      n: "02",
      title: "기존 Prompt의 한계",
      body: "좋은 프롬프트는 개인의 경험 속에 갇혀 있고, 재사용이 어렵습니다. 결과 품질을 검증하기 힘들고 목적과도 잘 연결되지 않습니다.",
    },
    {
      n: "03",
      title: "아이디어 → 실행의 단절",
      body: "“이런 서비스를 만들고 싶다” 라는 생각은 있어도, 요구사항 정의 · 실행 계획 · AI 활용 방식 · 결과물 생성 단계에서 막힙니다.",
    },
  ];
  return (
    <section id="problem" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <SectionHeader kicker="THE GAP" title={<>왜 대부분은<br />AI를 제대로 못 쓸까.</>} />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {items.map((it) => (
            <div key={it.n} className="bg-card p-7">
              <div className="font-mono text-[11px] tracking-[0.2em] text-accent">{it.n}</div>
              <h3 className="mt-4 font-display text-[22px] font-bold tracking-tight">{it.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- JOURNEY ---------------- */
function Journey() {
  const [active, setActive] = useState(0);
  const steps = [
    {
      title: "Idea Input",
      sub: "아이디어 입력",
      desc: "자연어로 떠오르는 생각을 그대로 적습니다. “마케팅 콘텐츠를 자동 생성하고 싶어.”",
      tag: "natural language",
    },
    {
      title: "Augmentation",
      sub: "의도 구조화",
      desc: "Augmenta가 목적 · 필요한 정보 · 추천 AI 역할 · 최적 질문 구조를 생성합니다.",
      tag: "role · context · format",
    },
    {
      title: "Prompt Creation",
      sub: "프롬프트 생성",
      desc: "목적에 맞는 Prompt · Template · Workflow를 자동으로 만들어 줍니다.",
      tag: "auto-build",
    },
    {
      title: "Execute",
      sub: "실행",
      desc: "문서, 이미지, 분석, 콘텐츠, 서비스 아이디어까지 — 바로 실행해 결과물을 얻습니다.",
      tag: "one-click run",
    },
    {
      title: "Marketplace",
      sub: "공유 · 판매",
      desc: "Create → Share → Sell. 자신의 노하우를 상품화하고 수익을 얻습니다.",
      tag: "creator economy",
    },
  ];

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), 3200);
    return () => clearInterval(id);
  }, [steps.length]);

  return (
    <section id="journey" className="border-b border-border bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <SectionHeader
          kicker="HOW IT WORKS"
          dark
          title={
            <>
              아이디어가 결과물이 되기까지<br />
              <span className="text-accent">다섯 걸음.</span>
            </>
          }
        />

        <div className="mt-14 grid gap-10 md:grid-cols-[1.1fr_1fr]">
          {/* Step list */}
          <ol className="space-y-1">
            {steps.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.title}>
                  <button
                    onClick={() => setActive(i)}
                    className={`group flex w-full items-start gap-5 rounded-xl border px-4 py-4 text-left transition ${
                      isActive
                        ? "border-accent bg-accent/10"
                        : "border-transparent hover:border-background/20"
                    }`}
                  >
                    <span
                      className={`mt-1 font-mono text-[11px] tracking-[0.2em] ${
                        isActive ? "text-accent" : "text-background/50"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span className="flex-1">
                      <span className="flex items-baseline gap-3">
                        <span className="font-display text-[20px] font-bold tracking-tight md:text-[24px]">
                          {s.title}
                        </span>
                        <span className="text-[12px] text-background/60">{s.sub}</span>
                      </span>
                      {isActive && (
                        <span className="mt-2 block text-[14px] leading-relaxed text-background/80">
                          {s.desc}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Live panel */}
          <div className="sticky top-20 self-start rounded-2xl border border-background/15 bg-background/[0.04] p-6">
            <div className="flex items-center justify-between border-b border-background/15 pb-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span className="h-2 w-2 rounded-full bg-background/30" />
                <span className="h-2 w-2 rounded-full bg-background/30" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-background/50">
                augmenta · step 0{active + 1}
              </span>
            </div>
            <div className="space-y-3 pt-5 font-mono text-[12.5px] leading-relaxed">
              <div className="text-background/50">{`// ${steps[active].tag}`}</div>
              <div>
                <span className="text-accent">$</span> augmenta.run(<span className="text-background/70">"{steps[active].title}"</span>)
              </div>
              <div className="text-background/80">→ {steps[active].sub}</div>
              <div className="rounded-md bg-background/5 p-3 text-background/80">
                {steps[active].desc}
              </div>
              <div className="text-background/40">{`// status: ready`}<span className="ml-1 inline-block h-3 w-1.5 translate-y-0.5 bg-accent blink" aria-hidden /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FEATURES ---------------- */
function Features() {
  const feats = [
    {
      tag: "5.1",
      title: "AI Prompt Builder",
      desc: "목적 기반 Prompt 생성. 역할(Role) 추천 · Context 구조화 · 결과 형식 지정까지.",
      bullets: ["Role 추천", "Context 빌더", "Output Format"],
    },
    {
      tag: "5.2",
      title: "Prompt Marketplace",
      desc: "AI 활용 지식의 거래소. 등록 · 구매 · 리뷰 · 평점 · 카테고리.",
      bullets: ["검증된 결과", "카테고리 탐색", "리뷰 · 평점"],
    },
    {
      tag: "5.3",
      title: "AI Workflow Library",
      desc: "Prompt를 넘어 ‘업무 해결 방법’을 거래. 마케팅 · 채용 · 투자 분석 워크플로우.",
      bullets: ["멀티-스텝 자동화", "도구 연결", "원클릭 실행"],
    },
    {
      tag: "5.4",
      title: "Creator Economy",
      desc: "AI 전문가가 자신의 노하우를 상품화. Prompt · Workflow · 구독 · Premium Pack.",
      bullets: ["수익 분배 80%", "팔로워 · 구독", "Featured 노출"],
    },
  ];
  return (
    <section id="features" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <SectionHeader
          kicker="CORE FEATURES"
          title={
            <>
              질문하고, 실행하고,<br />
              <span className="text-accent">팔 수 있는</span> AI 인프라.
            </>
          }
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {feats.map((f) => (
            <article
              key={f.tag}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition hover:border-foreground"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
                  /{f.tag}
                </span>
                <span className="font-mono text-[11px] text-accent opacity-0 transition group-hover:opacity-100">
                  →
                </span>
              </div>
              <h3 className="mt-4 font-display text-[26px] font-bold tracking-tight md:text-[30px]">
                {f.title}
              </h3>
              <p className="mt-3 max-w-md text-[14px] leading-relaxed text-muted-foreground">
                {f.desc}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {f.bullets.map((b) => (
                  <li
                    key={b}
                    className="rounded-full border border-border bg-background px-3 py-1 text-[12px] text-foreground"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- POSITION ---------------- */
function Position() {
  const rows = [
    { them: "PromptBase", desc: "Prompt 거래", us: "Prompt + Execution" },
    { them: "Lovable", desc: "Idea → App", us: "Idea → Prompt → Tool → App" },
    { them: "GPT Store", desc: "Custom GPT", us: "AI Creation Ecosystem" },
  ];
  return (
    <section className="border-b border-border bg-secondary">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <SectionHeader
          kicker="COMPETITIVE POSITION"
          title={
            <>
              Augmenta는<br />
              <span className="text-accent">실행까지</span> 갑니다.
            </>
          }
        />
        <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="grid grid-cols-[1.2fr_1fr_1.6fr] border-b border-border bg-foreground px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-background/70 md:text-[11px]">
            <span>Competitor</span>
            <span>Scope</span>
            <span>Augmenta</span>
          </div>
          {rows.map((r, i) => (
            <div
              key={r.them}
              className={`grid grid-cols-[1.2fr_1fr_1.6fr] items-center px-5 py-5 text-[13px] md:text-[15px] ${
                i !== rows.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span className="font-display font-bold tracking-tight">{r.them}</span>
              <span className="text-muted-foreground">{r.desc}</span>
              <span className="font-display font-bold tracking-tight text-accent">
                {r.us}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PRICING ---------------- */
function Pricing() {
  const tiers = [
    {
      name: "Free",
      price: "₩0",
      sub: "시작하기",
      features: ["Prompt 생성 월 제한", "기본 Marketplace 탐색", "커뮤니티 워크플로우"],
      cta: "무료로 시작",
      ink: false,
    },
    {
      name: "Pro",
      price: "₩19,000",
      sub: "월 / 1인",
      features: [
        "Unlimited Prompt 생성",
        "Advanced Builder · 멀티 Role",
        "Workflow 무제한 실행",
        "Marketplace 우선 노출",
      ],
      cta: "Pro 시작",
      ink: true,
    },
    {
      name: "Creator",
      price: "수익 80%",
      sub: "플랫폼 수수료 20%",
      features: ["Prompt · Workflow 판매", "Premium Pack 구독", "Featured Creator 프로그램"],
      cta: "크리에이터 신청",
      ink: false,
    },
  ];
  return (
    <section id="pricing" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <SectionHeader
          kicker="MONETIZATION"
          title={<>쓰는 사람도, 만드는 사람도<br />함께 자라는 모델.</>}
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`flex flex-col rounded-2xl border p-7 ${
                t.ink
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-[20px] font-bold tracking-tight">{t.name}</h3>
                {t.ink && (
                  <span className="rounded-full bg-accent px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-foreground">
                    Popular
                  </span>
                )}
              </div>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-[40px] font-bold tracking-tight">{t.price}</span>
                <span className={`text-[12px] ${t.ink ? "text-background/60" : "text-muted-foreground"}`}>
                  {t.sub}
                </span>
              </div>
              <ul className={`mt-7 space-y-2.5 text-[13.5px] ${t.ink ? "text-background/85" : "text-foreground"}`}>
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-accent">✦</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[13px] font-medium transition ${
                  t.ink
                    ? "bg-accent text-accent-foreground hover:opacity-90"
                    : "border border-foreground text-foreground hover:bg-foreground hover:text-background"
                }`}
              >
                {t.cta} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */
function CTA() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section id="cta" className="border-b border-border bg-accent text-accent-foreground">
      <div className="mx-auto max-w-4xl px-5 py-24 text-center md:py-32">
        <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] opacity-80">
          Early Access · Limited
        </div>
        <h2 className="font-display text-[40px] font-bold leading-[1.05] tracking-[-0.02em] text-balance md:text-[68px]">
          질문이 달라지면<br />결과가 달라집니다.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed opacity-90 md:text-[17px]">
          Augmenta 얼리 액세스에 등록하고, 가장 먼저 AI 실행 인프라를 경험하세요.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email) setDone(true);
          }}
          className="mx-auto mt-10 flex max-w-md flex-col gap-2 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
            className="flex-1 rounded-full border border-accent-foreground/20 bg-accent-foreground/10 px-5 py-3 text-[14px] text-accent-foreground placeholder:text-accent-foreground/50 outline-none focus:border-accent-foreground/60"
          />
          <button
            type="submit"
            className="rounded-full bg-accent-foreground px-6 py-3 text-[14px] font-medium text-accent transition hover:opacity-90"
          >
            {done ? "신청 완료 ✓" : "신청하기"}
          </button>
        </form>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2">
              <Logo />
              <span className="font-display text-[15px] font-bold tracking-tight">Augmenta</span>
            </div>
            <p className="mt-3 max-w-sm text-[13px] text-muted-foreground">
              막연한 아이디어를 실행 가능한 결과로 — AI 실행 플랫폼.
            </p>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            © {new Date().getFullYear()} Augmenta · Built for AI Creators
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- SECTION HEADER ---------------- */
function SectionHeader({
  kicker,
  title,
  dark,
}: {
  kicker: string;
  title: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <div className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] ${dark ? "text-background/60" : "text-muted-foreground"}`}>
        <span className={`inline-block h-px w-8 ${dark ? "bg-background" : "bg-foreground"}`} />
        {kicker}
      </div>
      <h2 className="mt-5 font-display text-[34px] font-bold leading-[1.05] tracking-[-0.02em] text-balance md:text-[56px]">
        {title}
      </h2>
    </div>
  );
}

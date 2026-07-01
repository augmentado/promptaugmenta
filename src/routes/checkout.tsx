import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const CLIENT_KEY = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Emo";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const widgetRef = useRef<Awaited<ReturnType<typeof import("@tosspayments/payment-widget-sdk")["loadPaymentWidget"]>> | null>(null);
  const [ready, setReady] = useState(false);
  const [paying, setPaying] = useState(false);
  const orderId = useRef(`order_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      const { loadPaymentWidget } = await import("@tosspayments/payment-widget-sdk");
      const widget = await loadPaymentWidget(CLIENT_KEY, "--anonymous--");
      if (cancelled) return;

      widgetRef.current = widget;

      // 결제수단 UI와 약관 UI를 병렬 렌더
      const [methodsWidget] = await Promise.all([
        widget.renderPaymentMethods("#payment-method", { value: 19000 }),
        widget.renderAgreement("#payment-agreement"),
      ]);

      if (cancelled) return;

      // iframe 내부 로딩 완료 이벤트 대기
      methodsWidget.on("ready", () => {
        if (!cancelled) setReady(true);
      });

      // ready 이벤트가 이미 발생했을 경우 대비 fallback
      setTimeout(() => {
        if (!cancelled) setReady((prev) => prev || true);
      }, 3000);
    }

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handlePay() {
    if (!widgetRef.current || !ready || paying) return;
    setPaying(true);
    try {
      await widgetRef.current.requestPayment({
        orderId: orderId.current,
        orderName: "Augmenta Pro 구독",
        customerName: "테스트 사용자",
        customerEmail: "test@augmenta.ai",
        successUrl: `${window.location.origin}/checkout/success`,
        failUrl: `${window.location.origin}/checkout/fail`,
      });
    } catch (err: unknown) {
      const e = err as { code?: string; message?: string };
      if (e?.code !== "USER_CANCEL") {
        alert(`결제 오류: ${e?.message ?? "알 수 없는 오류"}`);
      }
    } finally {
      setPaying(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-xl px-5 py-16">
        {/* 주문 요약 */}
        <div className="mb-8 rounded-2xl border border-border bg-card p-6">
          <h1 className="font-display text-[24px] font-bold tracking-tight">결제하기</h1>
          <div className="mt-5 space-y-2 text-[14px]">
            <div className="flex justify-between">
              <span className="text-muted-foreground">상품</span>
              <span className="font-medium">Augmenta Pro 구독</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">결제 금액</span>
              <span className="font-bold">₩19,000 / 월</span>
            </div>
          </div>
        </div>

        {/* 로딩 스피너 (위젯 초기화 전) */}
        {!ready && (
          <div className="flex items-center justify-center py-12 text-muted-foreground text-[14px] gap-3">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-foreground" />
            결제 수단 불러오는 중...
          </div>
        )}

        {/* 토스 결제 위젯 — 항상 DOM에 존재해야 함 */}
        <div className={ready ? "block" : "hidden"}>
          <div id="payment-method" />
          <div id="payment-agreement" className="mt-2" />

          <button
            onClick={handlePay}
            disabled={paying}
            className="mt-6 w-full rounded-full bg-foreground py-4 text-[15px] font-medium text-background transition hover:bg-accent disabled:opacity-50"
          >
            {paying ? "결제 처리 중..." : "₩19,000 결제하기"}
          </button>
        </div>

        <p className="mt-4 text-center text-[12px] text-muted-foreground">
          토스 샌드박스 테스트 환경 — 실제 결제가 발생하지 않습니다
        </p>
      </div>
    </div>
  );
}

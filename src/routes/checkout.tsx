import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

// 토스 샌드박스 공개 테스트키
const CLIENT_KEY = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Emo";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const navigate = useNavigate();
  const paymentWidgetRef = useRef<ReturnType<typeof import("@tosspayments/payment-widget-sdk")["loadPaymentWidget"]> extends Promise<infer T> ? T : never>(null);
  const [ready, setReady] = useState(false);

  // orderId는 결제마다 고유해야 함
  const orderId = useRef(`order_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`);

  useEffect(() => {
    async function init() {
      const { loadPaymentWidget } = await import("@tosspayments/payment-widget-sdk");

      const widget = await loadPaymentWidget(CLIENT_KEY, "--anonymous--");
      paymentWidgetRef.current = widget;

      // 결제 UI 마운트
      await widget.renderPaymentMethods("#payment-method", { value: 19000 });
      // 약관 동의 UI
      await widget.renderAgreement("#payment-agreement");

      setReady(true);
    }
    init();
  }, []);

  async function handlePay() {
    if (!paymentWidgetRef.current) return;
    try {
      await paymentWidgetRef.current.requestPayment({
        orderId: orderId.current,
        orderName: "Augmenta Pro 구독",
        customerName: "테스트 사용자",
        customerEmail: "test@augmenta.ai",
        successUrl: `${window.location.origin}/checkout/success`,
        failUrl: `${window.location.origin}/checkout/fail`,
      });
    } catch (err: unknown) {
      const e = err as { code?: string; message?: string };
      if (e?.code === "USER_CANCEL") return; // 사용자가 직접 닫은 경우 무시
      alert(`결제 오류: ${e?.message ?? "알 수 없는 오류"}`);
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

        {/* 토스 결제 위젯 */}
        <div id="payment-method" className="rounded-2xl border border-border bg-card p-1" />
        <div id="payment-agreement" className="mt-2 rounded-2xl border border-border bg-card p-1" />

        {/* 결제 버튼 */}
        <button
          onClick={handlePay}
          disabled={!ready}
          className="mt-6 w-full rounded-full bg-foreground py-4 text-[15px] font-medium text-background transition hover:bg-accent disabled:opacity-40"
        >
          {ready ? "₩19,000 결제하기" : "결제창 로딩 중..."}
        </button>

        <p className="mt-4 text-center text-[12px] text-muted-foreground">
          토스 샌드박스 테스트 환경 — 실제 결제가 발생하지 않습니다
        </p>
      </div>
    </div>
  );
}

import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";

// 토스가 리다이렉트 시 붙여주는 쿼리파라미터
const searchSchema = z.object({
  paymentKey: z.string(),
  orderId: z.string(),
  amount: z.coerce.number(),
});

export const Route = createFileRoute("/checkout/success")({
  validateSearch: searchSchema,
  component: SuccessPage,
});

function SuccessPage() {
  const { paymentKey, orderId, amount } = useSearch({ from: "/checkout/success" });
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");

  useEffect(() => {
    // 서버에서 결제 최종 승인
    fetch("/api/confirm-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentKey, orderId, amount }),
    })
      .then((r) => (r.ok ? setStatus("done") : setStatus("error")))
      .catch(() => setStatus("error"));
  }, [paymentKey, orderId, amount]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center">
        {status === "loading" && (
          <>
            <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-border border-t-foreground" />
            <h1 className="font-display text-[24px] font-bold">결제 확인 중...</h1>
          </>
        )}
        {status === "done" && (
          <>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-[28px] text-accent-foreground font-bold">
              ✓
            </div>
            <h1 className="font-display text-[28px] font-bold tracking-tight">결제 완료!</h1>
            <p className="mt-3 text-[15px] text-muted-foreground">
              Augmenta Pro 구독이 시작되었습니다.
            </p>
            <div className="mt-6 rounded-xl border border-border bg-card p-4 text-left text-[13px] space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">주문번호</span>
                <span className="font-mono">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">결제금액</span>
                <span className="font-medium">₩{amount.toLocaleString()}</span>
              </div>
            </div>
            <Link
              to="/"
              className="mt-6 inline-block rounded-full bg-foreground px-8 py-3 text-[14px] font-medium text-background transition hover:bg-accent"
            >
              홈으로 →
            </Link>
          </>
        )}
        {status === "error" && (
          <>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-[28px] text-destructive font-bold">
              !
            </div>
            <h1 className="font-display text-[24px] font-bold">결제 승인 실패</h1>
            <p className="mt-3 text-[14px] text-muted-foreground">
              결제는 완료됐으나 최종 승인에 실패했습니다. 고객센터로 문의해 주세요.
            </p>
            <Link
              to="/checkout"
              className="mt-6 inline-block rounded-full border border-border px-8 py-3 text-[14px] font-medium transition hover:bg-secondary"
            >
              다시 시도
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

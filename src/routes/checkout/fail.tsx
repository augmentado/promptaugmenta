import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({
  code: z.string().optional(),
  message: z.string().optional(),
  orderId: z.string().optional(),
});

export const Route = createFileRoute("/checkout/fail")({
  validateSearch: searchSchema,
  component: FailPage,
});

function FailPage() {
  const { code, message, orderId } = useSearch({ from: "/checkout/fail" });

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-[28px] text-destructive font-bold">
          ✕
        </div>
        <h1 className="font-display text-[28px] font-bold tracking-tight">결제 실패</h1>
        <p className="mt-3 text-[15px] text-muted-foreground">
          {message ?? "결제 처리 중 오류가 발생했습니다."}
        </p>
        {(code || orderId) && (
          <div className="mt-4 rounded-xl border border-border bg-card p-4 text-left text-[13px] space-y-1">
            {orderId && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">주문번호</span>
                <span className="font-mono">{orderId}</span>
              </div>
            )}
            {code && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">오류코드</span>
                <span className="font-mono text-destructive">{code}</span>
              </div>
            )}
          </div>
        )}
        <div className="mt-6 flex justify-center gap-3">
          <Link
            to="/checkout"
            className="rounded-full bg-foreground px-6 py-3 text-[14px] font-medium text-background transition hover:bg-accent"
          >
            다시 시도 →
          </Link>
          <Link
            to="/"
            className="rounded-full border border-border px-6 py-3 text-[14px] font-medium transition hover:bg-secondary"
          >
            홈으로
          </Link>
        </div>
      </div>
    </div>
  );
}

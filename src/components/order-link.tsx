"use client";

import {
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";
import { enrichHref } from "@/lib/utm";
import type { Vertical } from "@/lib/order-forms";

type OrderLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children"
> & {
  vertical: Vertical;
  children: ReactNode;
  /**
   * Extra query params carried into the order page, e.g. the package the
   * visitor chose on a card. The external order form cannot prefill, so this
   * is context for us, never a promise that the selection is "in the cart".
   */
  params?: Record<string, string>;
};

export function OrderLink({
  vertical,
  children,
  params,
  ...rest
}: OrderLinkProps) {
  const baseHref = `/order/${vertical}`;
  const extraQuery = params
    ? Object.entries(params)
        .map(([k, v]) => `&${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join("")
    : "";
  const staticHref = `${baseHref}?source=averyandbryant.com&vertical=${vertical}${extraQuery}`;
  const [href, setHref] = useState(staticHref);
  const paramsKey = JSON.stringify(params ?? {});

  useEffect(() => {
    const extra = JSON.parse(paramsKey) as Record<string, string>;
    setHref(
      enrichHref(baseHref, {
        source: "averyandbryant.com",
        vertical,
        ...extra,
      }),
    );
  }, [baseHref, vertical, paramsKey]);

  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

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
};

export function OrderLink({ vertical, children, ...rest }: OrderLinkProps) {
  const baseHref = `/order/${vertical}`;
  const staticHref = `${baseHref}?source=averyandbryant.com&vertical=${vertical}`;
  const [href, setHref] = useState(staticHref);

  useEffect(() => {
    setHref(enrichHref(baseHref, { source: "averyandbryant.com", vertical }));
  }, [baseHref, vertical]);

  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

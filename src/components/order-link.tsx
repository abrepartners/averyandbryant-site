"use client";

import {
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";
import { orderFormUrl, type Vertical } from "@/lib/order-forms";
import { enrichHref } from "@/lib/utm";

type OrderLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children"
> & {
  vertical: Vertical;
  children: ReactNode;
};

export function OrderLink({
  vertical,
  children,
  target = "_blank",
  rel = "noopener noreferrer",
  ...rest
}: OrderLinkProps) {
  const baseHref = orderFormUrl(vertical);
  const staticHref = `${baseHref}?source=averyandbryant.com&vertical=${vertical}`;
  const [href, setHref] = useState(staticHref);

  useEffect(() => {
    setHref(
      enrichHref(baseHref, { source: "averyandbryant.com", vertical }),
    );
  }, [baseHref, vertical]);

  return (
    <a href={href} target={target} rel={rel} {...rest}>
      {children}
    </a>
  );
}

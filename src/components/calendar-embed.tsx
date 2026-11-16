"use client";

import Script from "next/script";
import { useId } from "react";

/**
 * A CRM booking calendar shown inside one of our own pages, so the visitor
 * stays on the site and the page around the calendar is ours. The embed
 * script resizes the frame to the calendar's height as the visitor moves
 * through the steps.
 */
export function CalendarEmbed({
  calendarId,
  interest,
  title,
}: {
  calendarId: string;
  /** Prefills the calendar's interest field so the team sees context. */
  interest?: string;
  title: string;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const src = `https://api.leadconnectorhq.com/widget/booking/${calendarId}${
    interest ? `?interest=${encodeURIComponent(interest)}` : ""
  }`;
  return (
    <>
      <iframe
        src={src}
        id={`${calendarId}_${uid}`}
        title={title}
        scrolling="no"
        className="block min-h-[680px] w-full border-0"
        style={{ overflow: "hidden" }}
      />
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </>
  );
}

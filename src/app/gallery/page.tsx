import { permanentRedirect } from "next/navigation";

export const metadata = {
  title: "Portfolio & Gallery | Avery & Bryant",
  description:
    "Browse real estate, drone, and rental property media from Avery & Bryant — Arkansas' premium real estate media team.",
};

export default function GalleryPage() {
  permanentRedirect("https://homes.averyandbryant.com");
}

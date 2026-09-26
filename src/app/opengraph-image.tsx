import { ogImage, OG_SIZE } from "@/lib/og";
import { SITE_NAME } from "@/lib/site";

export const alt = SITE_NAME;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    title: "Hosting, który po prostu działa.",
    subtitle: "Serwery Minecraft, boty Discord i ochrona AntyDDoS.",
  });
}

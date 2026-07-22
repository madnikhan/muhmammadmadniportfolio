import { ImageResponse } from "next/og";
import { BrandOgMarkup, ogAlt, ogSize } from "@/lib/brand-og";

export const runtime = "edge";
export const alt = ogAlt;
export const size = ogSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<BrandOgMarkup />, { ...ogSize });
}

import type { SVGProps } from "react";

type IconName =
  | "arrow-up-right"
  | "arrow-down-right"
  | "arrow-down"
  | "arrow-up"
  | "sun"
  | "moon"
  | "menu"
  | "close"
  | "plus"
  | "copy"
  | "check"
  | "pin";
const paths: Record<IconName, React.ReactNode> = {
  "arrow-up-right": (
    <>
      <path d="M6 18 18 6M6 6h12v12" />
    </>
  ),
  "arrow-down-right": (
    <>
      <path d="m6 6 12 12M6 18h12V6" />
    </>
  ),
  "arrow-down": (
    <>
      <path d="M12 4v16m-7-7 7 7 7-7" />
    </>
  ),
  "arrow-up": (
    <>
      <path d="M12 20V4m-7 7 7-7 7 7" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
    </>
  ),
  moon: <path d="M20.5 13A8.5 8.5 0 0 1 11 3.5 8.5 8.5 0 1 0 20.5 13Z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  plus: <path d="M5 12h14M12 5v14" />,
  copy: (
    <>
      <rect x="8" y="8" width="12" height="13" rx="1.5" />
      <path d="M16 8V3H3v13h5" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  pin: (
    <>
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
};

export function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}

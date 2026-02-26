// components/ThemeWrapper.tsx
// ThemeProvider already handles class/colorScheme application.
// This component is kept as a passthrough for structural compatibility.
export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

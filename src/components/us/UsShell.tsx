export const UsShell = ({
  phase,
  children,
}: {
  phase: "entry" | "body";
  children: React.ReactNode;
}) => {
  return <div className={`us-root us-root-${phase}`}>{children}</div>;
};

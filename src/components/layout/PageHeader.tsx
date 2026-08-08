import type { ReactNode } from "react";

type Props = {
  title: string;
  description?: ReactNode;
  children?: ReactNode;
};

export function PageHeader({ title, description, children }: Props) {
  return (
    <div className="mb-10">
      <h1 className="type-page-title text-foreground">{title}</h1>
      {description ? (
        <p className="type-page-lead mt-3 max-w-4xl text-muted-foreground">{description}</p>
      ) : null}
      {children}
    </div>
  );
}

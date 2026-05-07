import type { PropsWithChildren, ReactNode } from 'react';

type SectionContainerProps = PropsWithChildren<{
  eyebrow?: string;
  title: string;
  description?: string;
  extra?: ReactNode;
  className?: string;
}>;

export const SectionContainer = ({
  eyebrow,
  title,
  description,
  extra,
  className,
  children,
}: SectionContainerProps) => {
  return (
    <section className={`section-shell ${className ?? ''}`.trim()}>
      <div className="section-heading">
        <div>
          {eyebrow ? <span className="section-eyebrow">{eyebrow}</span> : null}
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
        {extra ? <div className="section-extra">{extra}</div> : null}
      </div>
      {children}
    </section>
  );
};

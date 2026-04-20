import { safeJsonLd } from "@/lib/utils";

type Props = {
  data: Record<string, unknown> | Record<string, unknown>[];
  /** Stable id used as React key inside arrays */
  id?: string;
};

export function JsonLd({ data, id }: Props) {
  return (
    <script
      type="application/ld+json"
      id={id}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}

import Image from "next/image";
import type { ImgHTMLAttributes } from "react";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";

function MdxImage({
  src,
  alt = "",
  title,
}: ImgHTMLAttributes<HTMLImageElement>) {
  if (typeof src !== "string") return null;
  return (
    <figure>
      <Image
        src={src}
        alt={alt}
        width={1360}
        height={900}
        sizes="(max-width: 680px) 100vw, 680px"
        className="h-auto w-full"
      />
      {title ? <figcaption>{title}</figcaption> : null}
    </figure>
  );
}

export const mdxComponents: MDXRemoteProps["components"] = {
  img: MdxImage,
};

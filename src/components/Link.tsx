// Using Link from MUI template as is
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";
import { styled } from "@mui/material/styles";

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled("a")({});

interface NextLinkComposedProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    Omit<
      NextLinkProps,
      "href" | "as" | "passHref" | "onMouseEnter" | "onClick" | "onTouchStart"
    > {
  to: NextLinkProps["href"];
  linkAs?: NextLinkProps["as"];
}

export const NextLinkComposed = React.forwardRef<
  HTMLAnchorElement,
  NextLinkComposedProps
>((props, ref) => {
  const {
    to,
    linkAs,
    replace,
    scroll,
    shallow,
    prefetch,
    legacyBehavior = true,
    locale,
    ...other
  } = props;

  return (
    <NextLink
      as={linkAs}
      href={to}
      legacyBehavior={legacyBehavior}
      locale={locale}
      passHref
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
    >
      <Anchor ref={ref} {...other} />
    </NextLink>
  );
});

export type LinkProps = {
  activeClassName?: string;
  as?: NextLinkProps["as"];
  href: NextLinkProps["href"];
  // Useful when the as prop is shallow by styled().
  linkAs?: NextLinkProps["as"];
  noLinkStyle?: boolean;
} & Omit<NextLinkComposedProps, "to" | "linkAs" | "href"> &
  Omit<MuiLinkProps, "href">;

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/api-reference/next/link
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const {
    activeClassName = "active",
    as,
    className: classNameProps,
    href,
    legacyBehavior,
    linkAs: linkAsProp,
    locale,
    noLinkStyle,
    prefetch,
    replace,
    // Link don't have roles
    scroll,
    shallow,
    ...other
  } = props;

  const router = useRouter();
  const pathname = typeof href === "string" ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName
  });

  const isExternal =
    typeof href === "string" &&
    (href.indexOf("http") === 0 || href.indexOf("mailto:") === 0);

  if (isExternal) {
    if (noLinkStyle) {
      return <Anchor className={className} href={href} ref={ref} {...other} />;
    }

    return <MuiLink className={className} href={href} ref={ref} {...other} />;
  }

  const linkAs = linkAsProp || as;
  const nextjsProps = {
    to: href,
    linkAs,
    replace,
    scroll,
    shallow,
    prefetch,
    legacyBehavior,
    locale
  };

  if (noLinkStyle) {
    return (
      <NextLinkComposed
        className={className}
        ref={ref}
        {...nextjsProps}
        {...other}
      />
    );
  }

  return (
    <MuiLink
      className={className}
      component={NextLinkComposed}
      ref={ref}
      {...nextjsProps}
      {...other}
    />
  );
});

export default Link;

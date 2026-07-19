import { forwardRef } from 'react';
import { Link as RouterLink } from '@remix-run/react';
import { classes } from '~/utils/style';
import styles from './link.module.css';

// File extensions that can be linked to
const VALID_EXT = ['txt', 'png', 'jpg'];

function isAnchor(href) {
  const isValidExtension = VALID_EXT.includes(href?.split('.').pop());
  return href?.includes('://') || href?.[0] === '#' || isValidExtension;
}

export const Link = forwardRef(
  ({ rel, target, children, secondary, className, href, ...rest }, ref) => {
    const isExternal = href?.includes('://');
    const relValue = rel || (isExternal ? 'noreferrer noopener' : undefined);
    const targetValue = target || (isExternal ? '_blank' : undefined);

    const commonProps = {
      className: classes(styles.link, className),
      ['data-secondary']: secondary,
      rel: relValue,
      target: targetValue,
      ref: ref,
      ...rest,
    };

    if (isAnchor(href)) {
      return (
        <a {...commonProps} href={href}>
          {children}
        </a>
      );
    }

    return (
      <RouterLink prefetch="intent" {...commonProps} to={href}>
        {children}
      </RouterLink>
    );
  }
);

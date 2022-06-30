import React, { ReactNode } from 'react';
import { Typography, TypographyVariants } from '@mui/material';

interface SectionCardProps {
  title: ReactNode;
  icon?: ReactNode;
  onClickIcon?: () => void;
  children: ReactNode;
  variant?: TypographyVariants;
  className?: string;
  hide?: boolean
}

function SectionCard(props: SectionCardProps) {
  if (props.hide) return null;
  return (
    <section className={'mt-2 card pt-3 px-3 br-16 w-100 ' + (props.className || '')}>
      <div className="d-flex flex-row justify-content-between align-items-center">
        <Typography textAlign="left" variant={props.variant || 'h2'}>
          {props.title}
        </Typography>
        {props.icon}
      </div>
      <div className="my-2">
        {props.children}
      </div>
    </section>
  );
}

export default SectionCard;

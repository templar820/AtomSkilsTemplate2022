import React from 'react';
import { Card } from 'react-bootstrap';

interface PageCardProps {
  className?: string;
  children: React.ReactNode;
  cardLabel?: string;
}

export default function (props: PageCardProps) {
  if (!props.cardLabel) {
    return (
      <Card className={` d-flex flex-column p-4 ${props.className}`}>
        {props.children}
      </Card>
    );
  }

  return (
    <Card className={` d-flex flex-column p-4 ${props.className}`}>
      {props.cardLabel}
      <hr className="my-4 w-100" />
      {props.children}
    </Card>
  );
}

import React, { ReactNode } from 'react';
import NavBar from '../../modecules/NavBar';
interface Props {
  children: ReactNode;
}
export default function Lnb({ children }: Props) {
  return <NavBar lnb>{children}</NavBar>;
}

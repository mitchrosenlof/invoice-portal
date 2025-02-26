import React, { JSX } from 'react';

type Props = {
  onClick: () => void;
  title: string;

}
const Button = ({
  onClick,
  title,
}: Props): JSX.Element => {
  return <>
    <button className="rounded px-2 bg-blue-300 hover:bg-blue-400 hover:cursor-pointer" onClick={onClick}>{title}</button>
  </>
}

export default Button;
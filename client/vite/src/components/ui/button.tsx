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
    <button className="p-3 bg-blue-300 hover:bg-blue-400" onClick={onClick}>{title}</button>
  </>
}

export default Button;
import React, { FC } from "react";
import { Link } from "react-router-dom";

export const TopPageLink: FC = (): JSX.Element => {
  return <Link to="/">トップページへ戻る</Link>;
};

import React from 'react';

export const Details = ({ match }: any): JSX.Element => {

  return (
    <div>
      <h1>詳細ページ</h1>
      <h2>id:{match.params.id}</h2>
    </div>
  );
}
Details.displayName = Details.name;

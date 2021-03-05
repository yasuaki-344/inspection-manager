import React from 'react';

export const Create = (): JSX.Element => {
  const handleButtonClick = () => {
    console.log("button clicked")
  }

  return (
    <div>
      <h1>新規作成ページ</h1>
      <button onClick={handleButtonClick}>新規作成</button>
    </div>
  );
}
Create.displayName = Create.name;

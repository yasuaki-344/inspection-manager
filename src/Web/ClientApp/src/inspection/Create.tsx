import React from 'react';

export const Create = (): JSX.Element => {
  const handleButtonClick = () => {
    console.log('button clicked');
    fetch('inspectionsheet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sheetName: 'example sheet',
      })
    })
      .then((res) => res.json())
      .then(console.log)
      .catch(console.error);
  }

  return (
    <div>
      <h1>新規作成ページ</h1>
      <button onClick={handleButtonClick}>新規作成</button>
    </div>
  );
}
Create.displayName = Create.name;

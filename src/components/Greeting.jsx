import { useState } from 'react';

const Greeting = () => {
  const [changedText, setChangedText] = useState(false);

  const changeTextHandler = () => {
    setChangedText(true);
  };

  return (
    <div>
      <h2>Hello World!</h2>
      {/* But if we know that this paragraph should never be visible if we click
      the button, then of course we also need a test that tests if that 
      paragraph is gone once we click the button. */}
      {!changedText && <p>It's good to see you!</p>}

      {/* Suppose we forgot to render conditionally and the text is always there.*/}
      {/* <p>It's good to see you!</p> */}

      {changedText && <p>Changed!</p>}
      <button onClick={changeTextHandler}>Change Text!</button>
    </div>
  );
};

export default Greeting;

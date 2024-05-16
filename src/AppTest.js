import { render, screen } from '@testing-library/react';
import App from './App';

// First argument is the description of the text. It will identify this test
// in the testing output. It's helpful if we have a App with more than one test.
// The second argument is an anonymous function which contains the actual
// testing code.

test('renders React for Developers link', () => {
  // render the App with the help of RTL
  render(<App />);
  // Get hold of some element on that virtual screen so to say. So in that
  // simulated browser into which this <App /> is rendered
  // `/.../i` is a regular expression which checkes in 'insensitive' way
  const linkElement = screen.getByText(/react for developers/i);
  // Test will fail if that text is not in that document. It will succeed
  // if it founds.
  expect(linkElement).toBeInTheDocument();
});

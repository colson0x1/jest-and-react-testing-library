// Convention is to write this test as close as possible to the thing we
// want to test!

// `screen` gives us access to this virtual DOM, which was rendered
import { render, screen } from '@testing-library/react';
// `userEvent` is an object that helps us trigger user events in this virtual
// screen.
import userEvent from '@testing-library/user-event';
import Greeting from './Greeting.jsx';

// Test Suites vs Tests
// As our application grows, we typically will have dozens or maybe hundreds or
// thousands of tests and to organize and group those different tests, we often
// organize them into different testing suites.
// For example, all the tests, belonging to one feature, or one component of
// our application, could be grouped into one testing suite.
// And we create such a testing suite by using the global `describe()` function.
// We also give this, two arguments where the first argument is a description
// and this is a description of this category to which our different tests will
// then belong.
// And here it could be 'Greeting component' or '<Greeting />' like that to
// make it clear that we're talking about the tests belonging to the
// 'Greeting component'
// Then we have a second argument which is also is an anonymous function here.
// But in this function we don't write the testing code itself, but we put
// our different `tests` in there.
// And now we've got one suite with one test and we can have multiple suites
// and we can also have multiple tests per suite!
// As our application grows, we definitely wanna group our tests like this!!
describe('<Greeting />', () => {
  // We can write test by using this `test()` function which is globally available.
  test('renders "Hello World" as a text', () => {
    // Here we wanna write the test by using the 3 A's.
    // * First A stands for 'Arrange'
    // Here we wanna setup our tests. For example we wanna render a component
    // which we wanna test.
    // * Second A stands for 'Act'
    // Here we wanna do the thing, which we wanna actually test. For example, if
    // we wanna simulate a button click, we wanna do that as a second step.
    // * Third A stands for 'Assert'
    // Here we wanna assert the results. So we wanna have a look at the output
    // that's visible in the browser, for example and then see if that matches
    // our expectations.

    // @ Arrange
    // We pass JSX code in render()
    render(<Greeting />);

    // @ Act
    // ... nothing

    // @ Assert
    // screen.get functions - will thrown an error if an element is not found.
    // screen.query functions - won't do that.
    // and screen.find functions - will return a promise. So there, its enough if
    // an element is eventually on the screen.
    // Here we're using get an element by text
    // We can pass a full string like this or use an regular expression.
    // We can also pass second arugment to getByText and configure if we want an
    // exact match, which is the default.
    // If we set exact to false, casing won't matter for example and it will also
    // match sub-strings.
    /* screen.getByText('Hello World', { exact: false }); */
    // getByText will return an element. If it doesn't find an element, it will
    // throw an error!
    const helloWorldElement = screen.getByText('Hello World', { exact: false });

    // Now we can make the actual assertion
    // We can check whether that element exists.
    // For this we got the globally available `expect` function to which we can
    // pass our testing result value and that can be anything: a number, a string
    // or like in this case, a DOM Node in the end, a HTML element.
    // And on this resut of this expection function, we've got various matchers
    // like this `toBeInTheDocument()` function which checks whether the thing
    // we expect here, the HTML element we expect here is in the document.
    // We can also check for opposites by adding `.not` and then adding our
    // matching functions like `expect(htmlEl).not.toBeInTheDocument()`
    // if we want that element NOT to be in that document. Though, in that case,
    // we would have to use the query by a text function since `getByText`
    // would fail if no element would be found.
    // Here we want to check if this element is in the document
    expect(helloWorldElement).toBeInTheDocument();
  });

  test('renders "good to see you" if the button was NOT clicked', () => {
    render(<Greeting />);

    const outputElement = screen.getByText('good to see you', { exact: false });
    expect(outputElement).toBeInTheDocument();
  });

  test('renders "Changed!" if the button was clicked', () => {
    // @ Stage 1: Arrange
    render(<Greeting />);

    // @ Stage 2: Act
    // select button
    // we can get it by role and button is a role elements can have on the screen
    // since there is only one button in Greeting component, that will give
    // us access to that 1 button
    const buttonElement = screen.getByRole('button');
    // that's above is the button which we wanna simulate a click
    userEvent.click(buttonElement);

    // @ Stage 3: Assert
    const outputElement = screen.getByText('Changed!');
    expect(outputElement).toBeInTheDocument();
  });

  test('does not render "good to see you" if the button was clicked', () => {
    // @ Stage 1: Arrange
    // After adding Ouput component, the nice thing which we'll notice is that,
    // the tests (for Greeting component here) simply continue to work.
    // So that's the good thing about `render()` which we use to render the
    // greeting component.
    // It really renders this entire component tree that is required here.
    // So it renders not just Greeting and ignores other components used in that
    // JSX but it renders the content of those components like in this case,
    // the Output component as well.
    // And technically, we could therefore call this an integration test
    // because now more than one unit, more than one component is involved.
    // But especially when dealing with such a wrapper component which doesn't
    // have its own logic, that's of course not really the right term.
    // Testing the conjunction of these two components together i.e Greeting and
    // Output, is absolutely fine.
    // We might wanna split them, if the Output component  becomes more complex
    // and also starts managing state, then we might wanna test that separately
    // from the core logic of the Greeting  component.
    render(<Greeting />);

    // @ Stage 2: Act
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    // @ Stage 3: Assert
    const outputElement = screen.queryByText('good to see you', {
      exact: false,
    });
    // Now `getByText` will fail if an element is not found. And here our
    // expectation is actually that it's not found.
    // But again, since this i.e getByText, would throw an error if it's not
    // found. This test could never pass if the element is not found even though
    // that is what we want.
    // So that's then a reason for using `queryByText` because that will simply
    // return null if the element is not found. And therefore, actually here
    // we then wanna check if output element is null and for that we got
    // the `toBeNull` method here.
    // So here we wanna check if that's (i.e outputElement), is null because
    // that would be our expectation since we don't want to find this element
    // (i.e outputElement), if the button i.e buttonElement, was clicked.
    expect(outputElement).toBeNull();
  });
});

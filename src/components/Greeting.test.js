// Convention is to write this test as close as possible to the thing we
// want to test!

// `screen` gives us access to this virtual DOM, which was rendered
import { render, screen } from '@testing-library/react';
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
  test('renders Hello World as a text', () => {
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
});

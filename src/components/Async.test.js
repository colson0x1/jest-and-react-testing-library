import { render, screen } from '@testing-library/react';
import Async from './Async';

describe('Async component', () => {
  test('renders posts if request succeeds', async () => {
    // @ Stage 1: Arrange
    render(<Async />);

    // @ Stage 2: Act
    // We don't really need to act because rendering is already everything
    // we wanna do since we'll then fetch and set posts automatically because
    // of useEffect. So no other steps required.

    // @ Stage 3: Assertion
    // We'll find out if list items were rendered.
    // And there are various ways of getting access. Here we're gonna access
    // by role because getting access by role will allow us to find out if
    // there are list items on the screen since list item is a role HTML
    // elements can assume.
    // However since we expect to actually have multiple list items, we should
    // use getAllByRoll because getByRoll will fail if we have more than one
    // item with that specified role.
    // The roll here is listitems. Its from the documentation.
    /* const listItemElements = screen.getAllByRole('listitem'); */

    // getAllByRole is not asynchronous. We immediately get all these items
    // on the screen and initially there are none.
    // Work around is, using findAllByRole.
    // We can use find queries instead of get queries and
    // These queries `fineAllByRole` returns a promise and actually React Testing
    // Library will basically reevaluate the screen a couple of times until this
    // succeeds.
    // So therefore now, this will then wait for this HTTP request to succeed.
    // For findAllByRole, we can also specify a third argument. The second
    // argument allows us to set exact and so on.
    // The third argument is another object where we can set that timeout period.
    // The default here is 1 second.
    // So if our items are not there after one second, this `findAllByRole`
    // would still fail.
    // We must await since this returns a promise.
    // Thankfully our test code can be async!
    // So our test here can actually return a promise. And then JEST, our
    // test runner, will wait for this promise to resolve.
    // So it will wait until our test is already done.
    // So this works, but this actually is still not ideal!!
    const listItemElements = await screen.findAllByRole('listitem');

    // listItemElements will be an array of HTML elements
    // And the expectation now would be that, this array `listItemElements`
    // is not empty because if this array of items is empty, we know that
    // no items were rendered and that ofcourse is not the desired result.
    // toHaveLength allows us to check length of an array
    expect(listItemElements).not.toHaveLength(0);
  });
});

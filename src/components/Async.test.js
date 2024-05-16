import { render, screen } from '@testing-library/react';
import Async from './Async';

describe('Async component', () => {
  test('renders posts if request succeeds', async () => {
    // `jest` object is globally available in our testing code by the JEST tool
    // which runs our test.
    // jest has couple of utility methods.
    // fn method creates a mock function. So it creates a dummy function for us.
    // The difference to just creating a function on our own is that this mock
    // function then has some additional features which we can use.
    // So now we did actually override this built in fetch function with our
    // own dummy function only of course in our testing code.
    window.fetch = jest.fn();
    // Now since, that is created with Jest fn, we can again use this mock fn
    // which we have now and call special methods there.
    // mockResolvedValueOnce allows us to set a value, this fetch fn below should
    // resolve to when it's begin called.
    // And it should resolve to something that is then used here by our code
    // in fetch of ASync.jsx
    // So when this fetch fn is called here, it should in our case, resolve to
    // an object that has `json()` method.
    // Because here we're working with that resolved value of that fetch.
    // And then we're calling `json` on that resolved value.
    // So this is the resolved value we now wanna set here and therefore we'll
    // set this to an object here.
    // The object resolved by that promise which will atuomatically be returned
    // when we call mockResolvedValueOnce here.
    // And then here, we wanna make it clear that we have a JSON property,
    // which actually holds a function as a value, so that calling it as a function
    // as we do it into Components, works.
    // And that will be a async function because JSON returns a new promise.
    // That's the case for builtin fetch function and that therefore should be
    // the case for our mocked fetch function.
    // And then here it's up to us which value we wanna simulate that should be
    // returned.
    // Here in our case, we actually wanna return an array when json is called
    // and this promise here i.e async () =>, resolves.
    // Because in fetch of Async.js, data there in that case, is an Array for
    // that API end point for that Async.js Component. And that stand as array
    // full of posts. And every post should have an ID and a title.
    // And therefore to simulate the success case here, we wanna return an array
    // with at least one post with an ID of p1 and a title of first post.
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: 'p1', title: 'First post' }],
    });
    // Now with that code, we're overriding the built in fetch function.
    // When we rerun our tests, they still pass.
    // But now we're simulating the success case here. We are simulating this
    // success case and we're not actually sending a request to the API!!
    // And therefore, we're not hammering that API, we're not sending unnecessary
    // requests. We are reducing the amount of network traffic, we also avoid
    // potential problems if the server is down and our tests would fail for that
    // reason which of course is not something we want and we can control
    // different outcomes for this fetch function to test different scenarios
    // with our tests here.

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

    // With the help of defined queries i.e findAllByRoute, we're able to
    // wait for our data to be rendered. So this generally works but this is
    // still not ideal here, this test.
    // Because we're sending a HTTP request here in Async.jsx, and in this
    // case we're fetching some data from some API.
    // However when we run our tests, which we typically do a lot during
    // development, we generally don't wanna send HTTP request to our servers.
    // We don't wanna send request because A, that will cause a lot of
    // network traffic, it will hammer our servers with requests. Especially
    // if we have lot of tests with lot of requests.
    // And B, if we are not fetching data, but we have some component that
    // sends a post request to a server, our tests might start inserting
    // data into a database or they might start changing thing on the server
    // because of course we also wanna add test components where such kind of
    // requests are being sent.
    // And that's definitely not something we wanna do during testing.
    // We don't wanna send requests to servers that start changing things here.
    // So therefore, what we generally wanna do, when we write tests is,
    // we either don't even wanna send a real request or we wanna sent it to some
    // fake server, some testing server.
    // Both are viable approaches and we'll go for the approach here where
    // we don't even send the request in the first place.
    // Because there's one super important thing to note,
    // When we write a test we don't wanna test code, which we haven't written.
    // So in this case, we don't wanna test weather this `fetch` fn in Async
    // component works correctly and sends a request.
    // The fetch fn was not written by us, it's built into the browser.
    // So therefore, we wanna test if our component behaves correctly depending on
    // the different outcomes of sending a request.
    // So we wanna check if our Component behaves correctly once we got the
    // response data. We maybe also and wanna check if our Component behaves
    // correctly, if they got an error.
    // But we don't wanna check weather technically sending this request succeeds.
    // i.e fetch('https://jsonplaceholder.typicode.com/posts')
    // And therefore we wanna replace this fetch function there which is built
    // into the browser with a so called mock function! With a dummy function
    // that overrides the build in function.
    // A dummy function that does what we want and that doest not send a real
    // request. So did when our Component executes during testing we use that
    // dummy function, that mock, instead of that real built in function.
    // This is such a common scenario not just for fetch but also for something
    // like local storage, for example where we also don't wanna trigger changes
    // in the actual storage.
    // This is such a common scenario that JEST, this testing tool which we're
    // using under the hood has built in support for mocking such functions.
    // And it's therefore fairly easy to do.
    // When we arrange our test here in our Async.test.js file, here we now
    // wanna override the built in fetch function with our own one.
    // And for that we can reach out to the window object which will be
    // available here and then there call the fetch method and set it to the new
    // function defined by us!

    const listItemElements = await screen.findAllByRole('listitem');

    // listItemElements will be an array of HTML elements
    // And the expectation now would be that, this array `listItemElements`
    // is not empty because if this array of items is empty, we know that
    // no items were rendered and that ofcourse is not the desired result.
    // toHaveLength allows us to check length of an array
    expect(listItemElements).not.toHaveLength(0);
  });
});

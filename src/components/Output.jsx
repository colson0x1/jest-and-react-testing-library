// The goal of this component is to see,
// how multiple components can interact with each other and how we can test
// that and how we can work with props and tests.

const Output = (props) => {
  return <p>{props.children}</p>;
};

export default Output;

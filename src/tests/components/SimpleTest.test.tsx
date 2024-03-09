import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";

// Um componente simples para teste
const TestComponent = () => {
  return (
    <React.Fragment>
      <Text>Test</Text>
    </React.Fragment>
  );
};

describe("Simple Test", () => {
  it("renders correctly", () => {
    const { getByText } = render(<TestComponent />);
    expect(getByText("Test")).toBeTruthy();
  });
});

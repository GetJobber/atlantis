import { useEffect, useState } from "react";
import { Text } from "@jobber/components/Text";
import { Card } from "@jobber/components/Card";
import { Content } from "@jobber/components/Content";
import { InputText } from "@jobber/components/InputText";
import { useDebounce } from "@jobber/hooks";
import { Heading } from "@jobber/components/Heading";

export function UseDebounce() {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [callCount, setCallCount] = useState(0);

  // Set up a debounced function that updates state after 500ms
  const debouncedSetValue = useDebounce((value: string) => {
    setDebouncedValue(value);
    setCallCount(prev => prev + 1);
  }, 500);

  // Call the debounced function whenever inputValue changes
  useEffect(() => {
    debouncedSetValue(inputValue);
  }, [inputValue, debouncedSetValue]);

  return (
    <Content>
      <Card>
        <Content>
          <Card.Header>
            <Heading level={2}>Basic Debounce Example</Heading>
          </Card.Header>

          <Text>
            Type in the input field below. The debounced value will update 500ms
            after you stop typing.
          </Text>
          <InputText
            value={inputValue}
            onChange={(value: string) => setInputValue(value)}
            placeholder="Start typing..."
          />
          <div style={{ marginTop: "1rem" }}>
            <Text>Input value (updates immediately): {inputValue}</Text>
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <Text>Debounced value (500ms delay): {debouncedValue}</Text>
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <Text>
              Number of times the debounced function was called: {callCount}
            </Text>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <Text>
              The useDebounce hook automatically handles cleanup when the
              component unmounts, ensuring there are no memory leaks from
              pending function calls.
            </Text>
          </div>
        </Content>
      </Card>
    </Content>
  );
}

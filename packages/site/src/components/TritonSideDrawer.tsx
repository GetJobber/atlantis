import {
  Box,
  Button,
  Content,
  InputText,
  SideDrawer,
  Text,
} from "@jobber/components";
import { useTritonChat } from "../providers/TritonProvider";

export function TritonSideDrawer() {
  const { tritonOpen, onCloseTriton, question, setQuestion, sendSearch } =
    useTritonChat();

  return (
    <SideDrawer open={tritonOpen} onRequestClose={onCloseTriton}>
      <SideDrawer.Toolbar>
        <Box margin={{ bottom: "base" }}>
          <Content>
            <Text>Welcome to Triton!</Text>
          </Content>
        </Box>
        <InputText
          multiline
          value={question}
          onChange={d => setQuestion(d as string)}
        />
        <Button label="Search" onClick={sendSearch}></Button>
      </SideDrawer.Toolbar>
    </SideDrawer>
  );
}

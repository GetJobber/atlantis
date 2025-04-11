import {
  Box,
  Button,
  Form,
  FormField,
  Grid,
  Heading,
  Stack,
  Text,
} from "@jobber/components";
import { useState } from "react";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

export const VisualTestFormFieldPage = () => {
  const [formValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    age: 0,
  });

  const handleSubmit = () => {
    // Form values will be handled by the Form component internally
    console.log("Form submitted");
  };

  return (
    <Box padding="large">
      <Stack space="extravagant">
        <Heading level={1}>FormField Examples</Heading>

        <Stack space="large">
          {/* Basic Form with FormFields */}
          <section>
            <Text size="large">Basic Form with FormFields</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Form onSubmit={handleSubmit}>
                  <Stack space="small">
                    <FormField
                      placeholder="First Name"
                      name="firstName"
                      type="text"
                    />

                    <FormField
                      placeholder="Last Name"
                      name="lastName"
                      type="text"
                    />

                    <FormField
                      placeholder="Email Address"
                      name="email"
                      type="email"
                    />

                    <FormField placeholder="Age" name="age" type="number" />

                    <Button submit={true}>Submit Form</Button>
                  </Stack>
                </Form>
              </Grid.Cell>

              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Box padding="small">
                  <Text>Form Values:</Text>
                  <pre>{JSON.stringify(formValues, null, 2)}</pre>
                </Box>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Form with Validation */}
          <section>
            <Text size="large">Form with Validation</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Form onSubmit={handleSubmit}>
                  <Stack space="small">
                    <FormField
                      placeholder="First Name"
                      name="firstName"
                      type="text"
                      validations={{ required: "First name is required" }}
                    />

                    <FormField
                      placeholder="Email Address"
                      name="email"
                      type="email"
                      validations={{ required: "Email is required" }}
                    />

                    <FormField
                      placeholder="Age"
                      name="age"
                      type="number"
                      validations={{
                        min: { value: 18, message: "Must be 18 or older" },
                      }}
                    />

                    <Button submit={true}>Submit Form with Validation</Button>
                  </Stack>
                </Form>
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};

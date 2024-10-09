const { RuleTester } = require("eslint");
const { rules } = require("../index");

const rule = rules["no-deprecated-prop-values"];

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run("no-deprecated-props-values", rule, {
  valid: [
    {
      code: '<MyComponent myProp="newValue1" />',
      options: [
        {
          components: [
            {
              component: "MyComponent",
              prop: "myProp",
              deprecatedValues: {
                oldValue1: "newValue1",
                oldValue2: "newValue2",
              },
            },
            {
              component: "AnotherComponent",
              prop: "anotherProp",
              deprecatedValues: {
                oldPropValueA: "newPropValueA",
                oldPropValueB: "newPropValueB",
              },
            },
          ],
        },
      ],
    },
    {
      code: '<AnotherComponent anotherProp="newPropValueA" />',
      options: [
        {
          components: [
            {
              component: "MyComponent",
              prop: "myProp",
              deprecatedValues: {
                oldValue1: "newValue1",
                oldValue2: "newValue2",
              },
            },
            {
              component: "AnotherComponent",
              prop: "anotherProp",
              deprecatedValues: {
                oldPropValueA: "newPropValueA",
                oldPropValueB: "newPropValueB",
              },
            },
          ],
        },
      ],
    },
    {
      code: '<MyComponent myProp="newValue2" />',
      options: [
        {
          components: [
            {
              component: "MyComponent",
              prop: "myProp",
              deprecatedValues: {
                oldValue1: "newValue1",
                oldValue2: "newValue2",
              },
            },
          ],
        },
      ],
    },
    {
      code: '<OtherComponent myProp="oldValue1" />',
      options: [
        {
          components: [
            {
              component: "MyComponent",
              prop: "myProp",
              deprecatedValues: {
                oldValue1: "newValue1",
                oldValue2: "newValue2",
              },
            },
          ],
        },
      ],
    },
  ],

  invalid: [
    {
      code: '<MyComponent myProp="oldValue1" />',
      options: [
        {
          components: [
            {
              component: "MyComponent",
              prop: "myProp",
              deprecatedValues: {
                oldValue1: "newValue1",
                oldValue2: "newValue2",
              },
            },
            {
              component: "AnotherComponent",
              prop: "anotherProp",
              deprecatedValues: {
                oldPropValueA: "newPropValueA",
                oldPropValueB: "newPropValueB",
              },
            },
          ],
        },
      ],
      errors: [
        {
          message:
            "'oldValue1' is a deprecated value for 'myProp' on 'MyComponent'. Use 'newValue1' instead.",
        },
      ],
    },
    {
      code: '<AnotherComponent anotherProp="oldPropValueA" />',
      options: [
        {
          components: [
            {
              component: "MyComponent",
              prop: "myProp",
              deprecatedValues: {
                oldValue1: "newValue1",
                oldValue2: "newValue2",
              },
            },
            {
              component: "AnotherComponent",
              prop: "anotherProp",
              deprecatedValues: {
                oldPropValueA: "newPropValueA",
                oldPropValueB: "newPropValueB",
              },
            },
          ],
        },
      ],
      errors: [
        {
          message:
            "'oldPropValueA' is a deprecated value for 'anotherProp' on 'AnotherComponent'. Use 'newPropValueA' instead.",
        },
      ],
    },
    {
      code: '<MyComponent myProp="oldValue2" />',
      options: [
        {
          components: [
            {
              component: "MyComponent",
              prop: "myProp",
              deprecatedValues: {
                oldValue1: "newValue1",
                oldValue2: "newValue2",
              },
            },
          ],
        },
      ],
      errors: [
        {
          message:
            "'oldValue2' is a deprecated value for 'myProp' on 'MyComponent'. Use 'newValue2' instead.",
        },
      ],
    },
    {
      code: '<AnotherComponent anotherProp="oldPropValueB" />',
      options: [
        {
          components: [
            {
              component: "AnotherComponent",
              prop: "anotherProp",
              deprecatedValues: {
                oldPropValueA: "newPropValueA",
                oldPropValueB: "newPropValueB",
              },
            },
          ],
        },
      ],
      errors: [
        {
          message:
            "'oldPropValueB' is a deprecated value for 'anotherProp' on 'AnotherComponent'. Use 'newPropValueB' instead.",
        },
      ],
    },
  ],
});

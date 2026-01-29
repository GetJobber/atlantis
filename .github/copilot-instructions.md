1. **TypeScript**:

   - Use TypeScript, specifically version 5.0+.
   - Ensure type safety and leverage TypeScript features.
   - Use function(){} style definition, and not () => {}
   - Prefer named exports over default
   - When defining interfaces, we provide descriptions in JSDoc format for each
     property

2. **CSS Modules**:

   - Use CSS Modules for styles.
   - Import styles using a default import named `styles`.

3. **Code Style**:

   - Use double quotes instead of single quotes.
   - Follow consistent code formatting and style guidelines.

4. **Dependency Management**:

   - Use npm to manage dependencies.

5. **Accessibility**:

   - Consider accessibility in all code.
   - Prefer HTML-native roles and attributes, and use ARIA roles only as
     necessary

6. **Comments and Documentation**:

   - Include quality comments and documentation in all code.
   - Provide usage examples and prop descriptions for components.

7. **Testing**:
   - Use Jest for testing.
   - Use Testing Library within Jest for testing React components.

### Example Implementation

#### TypeScript Component with CSS Modules and Accessibility

```tsx
import React from "react";
import styles from "./YourComponent.module.css";

/**
 * YourComponent is a sample component that demonstrates the use of TypeScript,
 * CSS Modules, and accessibility best practices.
 *
 * @param {object} props - The component props.
 * @param {string} props.label - The label for the component.
 * @returns {JSX.Element} The rendered component.
 */
export function YourComponent({ label }: { label: string }): JSX.Element {
  return (
    <div className={styles.container} role="region" aria-label={label}>
      <label className={styles.label}>{label}</label>
      <input className={styles.input} type="text" aria-labelledby={label} />
    </div>
  );
}
```

#### Jest Test with Testing Library

```tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import YourComponent from "./YourComponent";

test("renders YourComponent with label", () => {
  render(<YourComponent label="Test Label" />);
  const labelElement = screen.getByText(/Test Label/i);
  expect(labelElement).toBeInTheDocument();
});
```

# Atlantis Design System Component Audit Plan

> **Purpose**: This document provides step-by-step instructions for an LLM
> (Claude, GPT, etc.) to conduct a comprehensive developer audit of Atlantis
> design system components.
>
> **Output**: A structured Markdown file (e.g., `Tooltip_Audit_Report.md`) for
> easy reference and editing. Having the report as a file (rather than just chat
> output) makes it easier to copy sections into the
> [Atlantis Portal](https://atlantis.jobber.dev) scorecard (an internal web app
> for tracking component audit status).

---

## Important: Output Format

The final deliverable is a **Markdown file** saved as:

```
[ComponentName]_Audit_Report.md
```

Example: `Tooltip_Audit_Report.md`, `Button_Audit_Report.md`

This file should be generated at the end of the audit using the
[Output Template](#output-template) section.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Scoring System](#scoring-system)
3. [Pre-Audit Discovery Phase](#pre-audit-discovery-phase)
4. [Audit Categories & Criteria](#audit-categories--criteria)
5. [Output Template](#output-template)
6. [Verification Checklist](#verification-checklist)

---

## Quick Start

To audit a component, provide the LLM with:

```
Audit the [COMPONENT_NAME] component following the COMPONENT_AUDIT_PLAN.md instructions.
Component path: atlantis/packages/components/src/[COMPONENT_NAME]/
```

The LLM will:

1. Discover and read all relevant component files
2. Evaluate each criterion in the rubric
3. Perform self-verification
4. Generate and save a Markdown report file (e.g., `Tooltip_Audit_Report.md`)

### Step-by-Step Execution Mode (Recommended for Cursor IDE)

For best results, instruct the LLM to create a **TODO list** and work through
each step sequentially. This leverages Cursor's built-in task tracking.

**Recommended prompt:**

```
Audit the [COMPONENT_NAME] component following COMPONENT_AUDIT_PLAN.md.

Create a TODO list with these steps and work through them ONE AT A TIME:
1. Pre-Audit Discovery - Read all component files and document understanding
2. Category 1: Tokens & Theming - Evaluate all 5 criteria
3. Category 2: Visual UI - Document observations for manual review
4. Category 3: Content Design - Evaluate criteria
5. Category 4: Accessibility - Evaluate criteria (note Pa11y for 4.3)
6. Category 5: Interaction States - Evaluate all 8 criteria
7. Category 6: Behavioral States - Evaluate all 5 criteria
8. Category 7: Flexibility/Composition - Evaluate all 4 criteria
9. Category 8: Motion/Transitions - Evaluate all 3 criteria
10. Category 9: Code Quality - Evaluate criteria (skip 9.3 Performance)
11. Category 10: Cross Platform - Evaluate all 4 criteria
12. Category 11: Localization - Evaluate all 3 criteria
13. Verification - Run self-review checklist
14. Generate Report - Save as [COMPONENT_NAME]_Audit_Report.md using the template

Mark each TODO as complete before moving to the next.
Reference the corresponding section in COMPONENT_AUDIT_PLAN.md for each step.
```

This approach:

- Prevents attention drift with long documents
- Ensures thorough coverage of all criteria
- Provides visible progress tracking
- Allows for pause/resume of audits

---

## Scoring System

Each criterion is scored on a 4-point scale:

| Score   | Label                    | Meaning                                                |
| ------- | ------------------------ | ------------------------------------------------------ |
| **3**   | Up-to-date               | Fully meets the criterion with best practices          |
| **2**   | Needs minor improvements | Partially meets the criterion; small fixes needed      |
| **1**   | Needs major improvements | Does not meet the criterion; significant work required |
| **N/A** | Not Applicable           | Criterion does not apply to this component             |

### When to use N/A:

- The component genuinely doesn't need that capability (e.g., a pure layout
  component doesn't need "Selected" state)
- The criterion is explicitly marked as design-only (this audit is
  developer-focused)
- The platform doesn't exist for this component (e.g., no mobile version)

---

## Areas Requiring Manual Review

While most criteria can be audited by an LLM through code analysis, some areas
require human intervention:

| Area                                  | Reason                        | Recommended Action                                                                        |
| ------------------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------- |
| **Category 2: Visual UI**             | Requires Figma access         | **Optional** - Designers already reviewed. Use LLM observations or defer to design scores |
| **Criterion 3.2: Tone & Voice**       | Content/design judgment       | Mark as N/A or defer to content designer                                                  |
| **Criterion 4.3: Contrast/Text Size** | Automated testing recommended | Use [Pa11y](https://pa11y.org/) against docs site or Storybook                            |
| **Criterion 9.3: Performance**        | Dev/prod build differences    | Mark as N/A (see note below)                                                              |

---

## Pre-Audit Discovery Phase

Before evaluating any criteria, the LLM **MUST** thoroughly understand the
component. This phase is critical for accurate scoring.

### Step 1: Locate Component Files

**Web Component** (required):

```
atlantis/packages/components/src/[ComponentName]/
├── [ComponentName].tsx           # Main implementation
├── [ComponentName].module.css    # Styles (may be .css)
├── [ComponentName].test.tsx      # Unit tests
├── [ComponentName].types.ts      # TypeScript types
├── index.ts                      # Exports
└── ... (other supporting files)
```

**Mobile Component** (if exists):

```
atlantis/packages/components-native/src/[ComponentName]/
├── [ComponentName].tsx           # Main implementation
├── [ComponentName].style.ts      # Styles
├── [ComponentName].test.tsx      # Tests
├── index.ts                      # Exports
└── ...
```

**Documentation**:

```
atlantis/docs/components/[ComponentName]/
├── [ComponentName].stories.mdx   # Documentation
├── Web.stories.tsx               # Web examples
├── Mobile.stories.tsx            # Mobile examples (if exists)
└── ...
```

### Step 2: Read All Files

Read the following files in order (stop if file doesn't exist):

1. **Main component file(s)**: `[ComponentName].tsx` - understand the component
   structure, props, and behavior
2. **CSS/Styles**: `[ComponentName].module.css` or `.css` - check token usage,
   theming
3. **Types**: `[ComponentName].types.ts` - understand prop definitions
4. **Tests**: `[ComponentName].test.tsx` - understand test coverage and tested
   behaviors
5. **Documentation**: `.stories.mdx` and `.stories.tsx` - understand documented
   examples
6. **Mobile version** (if exists): Check
   `components-native/src/[ComponentName]/`

### Step 3: Document Component Understanding

Before proceeding, document:

- **Component purpose**: What does this component do?
- **Key props**: What are the main configuration options?
- **Platform availability**: Web only? Web + Mobile?
- **Composition model**: Does it use compound components? Children?
- **Dependencies**: What other Atlantis components does it use?

---

## Audit Categories & Criteria

### Category 1: Tokens & Theming

**Description**: Uses latest design tokens and supports light/dark themes.

#### 1.1 Proper use of semantic design tokens

**Trades**: Design, Dev | **Environments**: Web, Mobile

**What to check (Developer)**:

- Open the CSS file (`.module.css` or `.css`)
- Look for CSS custom properties usage

**Scoring**:

- **3**: 100% semantic tokens (e.g., `var(--color-interactive)` instead of
  `var(--color-green-200)`)
- **2**: Some semantic tokens, but also uses base/primitive tokens
- **1**: No semantic tokens; uses hardcoded values or only primitive tokens
- **N/A**: Component has no visual styling

**Evidence to cite**: List specific token usage patterns found in CSS

---

#### 1.2 Tokens applied correctly for color, spacing, radius, typography

**Trades**: Design, Dev | **Environments**: Web, Mobile

**What to check**:

- CSS file for proper token categories:
  - Colors: `--color-*`
  - Spacing: `--space-*`
  - Radius: `--radius-*`
  - Typography: `--typography--*`

**Scoring**:

- **3**: All visual properties use appropriate tokens
- **2**: Most use tokens, some hardcoded values
- **1**: Few or no tokens used
- **N/A**: Component has no visual styling

**Evidence to cite**: Examples of correct/incorrect token usage

---

#### 1.3 Theme capability

**Trades**: Dev only | **Environments**: Web, Mobile

**What to check**:

- Are visual tokens exposed as CSS custom properties that can be overridden?
- Does the component define component-level CSS variables (e.g.,
  `--tooltip--surface`)?
- Check for `UNSAFE_className` or `UNSAFE_style` props for style overrides

> **Important Clarification**: A component does NOT need to explicitly consume
> `AtlantisThemeContext` (via `useAtlantisTheme()`) to support theming. If the
> component uses semantic CSS tokens (`--color-*`, `--space-*`, etc.), it
> automatically gets theme support because these tokens are set at the document
> level by `AtlantisThemeContextProvider`.
>
> A component only needs to explicitly consume the context if it needs:
>
> - Access to the current theme value in JavaScript
> - Programmatic access to token values
> - Component-specific token overrides
>
> **This criterion is about customization capability**, not theme compatibility
> (which is covered in 1.4 Dark/Light Mode).

**Scoring**:

- **3**: Defines component-level CSS variables that can be overridden + supports
  `UNSAFE_className`/`UNSAFE_style` for full customization
- **2**: Some CSS variables defined OR supports UNSAFE\_\* props, but not both
- **1**: No CSS variables exposed, no UNSAFE\_\* props, hardcoded styles
- **N/A**: Component is purely structural with no visual styling

**Evidence to cite**: Component-level CSS variables, UNSAFE\_\* prop support

---

#### 1.4 Dark and light mode compatible

**Trades**: Design, Dev | **Environments**: Web, Mobile

**What to check**:

- CSS tokens should be semantic (they automatically support dark/light mode)
- No hardcoded color values
- Check if component uses `--color-surface`, `--color-text`, etc.

**Scoring**:

- **3**: Fully supports dark mode via semantic tokens
- **2**: Partially supports; some hardcoded colors
- **1**: Does not support dark mode
- **N/A**: Component has no visual styling

**Evidence to cite**: Token usage that proves dark mode compatibility

---

#### 1.5 Tokens can be overridden

**Trades**: Dev only | **Environments**: Web, Mobile

**What to check**:

- Are CSS custom properties defined at the component level?
- Look for pattern: `--component-name--property: var(--token);`
- Check for `UNSAFE_className` prop support

**Scoring**:

- **3**: All visual tokens can be overridden
- **2**: Some tokens can be overridden
- **1**: No tokens can be overridden
- **N/A**: Component has no visual styling

**Evidence to cite**: CSS custom property patterns

---

### Category 2: Visual UI

**Description**: Matches Figma specifications and design intent.

> **ℹ️ OPTIONAL MANUAL REVIEW**: Designers have already reviewed Visual UI from
> their perspective. Developer review of this category might be **optional**
> given deadline constraints.
>
> **If time permits**: Compare Storybook with Figma side-by-side for the scored
> criteria. **If time is tight**: Accept the LLM's observations as-is and mark
> scores as "Deferred to Design" or use designer's existing scores if available.

> **What LLMs CAN do**: Document observations about token usage patterns that
> may indicate visual consistency or inconsistency. These notes can be useful
> for future reference even if full review is skipped.

#### 2.1 Icons have visual parity

**Trades**: Design, Dev | **Environments**: Web, Mobile

**LLM Partial Check**:

- List all icons used in the component (search for `Icon` or icon name imports)
- Note if icons are using the Atlantis `Icon` component vs. custom SVGs

**Manual Review Required**:

- Compare icons in Storybook with Figma designs
- Verify icon names match between platforms

**Scoring** (Manual):

- **3**: Icons match Figma exactly
- **2**: Minor icon differences
- **1**: Icons don't match Figma
- **N/A**: Component uses no icons

---

#### 2.2 Color tokens have visual parity

**Trades**: Design, Dev | **Environments**: Web, Mobile

**LLM Partial Check**:

- List all color tokens used in CSS
- Flag any hardcoded hex/rgb values
- Note if token names suggest they match Figma naming conventions

**Manual Review Required**:

- Compare rendered colors in Storybook with Figma
- Verify color tokens are applied to the correct elements

**Scoring** (Manual):

- **3**: All colors match Figma
- **2**: Some color differences
- **1**: Colors don't match Figma
- **N/A**: Component has no color styling

---

#### 2.3 Typography has visual parity

**Trades**: Design, Dev | **Environments**: Web, Mobile

**LLM Partial Check**:

- List all typography tokens used (`--typography--*`)
- Flag any hardcoded font sizes, weights, or families
- Note if Text/Heading components are used vs. raw HTML

**Manual Review Required**:

- Compare font styles in Storybook with Figma
- Check font sizes, weights, and line heights match

**Scoring** (Manual):

- **3**: Typography matches Figma
- **2**: Minor typography differences
- **1**: Typography doesn't match Figma
- **N/A**: Component has no text

---

#### 2.4 Spacing has visual parity

**Trades**: Design, Dev | **Environments**: Web, Mobile

**LLM Partial Check**:

- List all spacing tokens used (`--space-*`)
- Flag any hardcoded pixel values for margins/padding
- Note if spacing appears consistent (same tokens used throughout)

**Manual Review Required**:

- Compare spacing in Storybook with Figma (use browser DevTools)
- Verify padding, margins, and gaps match design specs

**Scoring** (Manual):

- **3**: Spacing matches Figma
- **2**: Minor spacing differences
- **1**: Spacing doesn't match Figma
- **N/A**: Component has no significant spacing

---

#### 2.5 Visual assets/frames are formatted correctly

**Trades**: Design, Dev | **Environments**: Web, Mobile

**LLM Partial Check**:

- Note any image/asset handling in the component
- Check if responsive behavior is implemented
- Look for aspect ratio handling

**Manual Review Required**:

- Compare component appearance at different viewport sizes
- Verify visual assets render correctly

**Scoring** (Manual):

- **3**: Visual assets match Figma exactly
- **2**: Minor visual differences
- **1**: Significant visual differences
- **N/A**: Component has no visual assets

---

### Category 3: Content Design

**Description**: Includes strong documentation and example use cases.

#### 3.1 Clear naming

**Trades**: Design, Dev | **Environments**: Web, Mobile

**What to check**:

- Component name: Is it descriptive and follows conventions?
- Prop names: Are they clear and consistent with other components?
- TypeScript types: Are they well-named and documented?

**Scoring**:

- **3**: Component and props have clear, descriptive names following conventions
- **2**: Mostly clear, some props could be better named
- **1**: Confusing or inconsistent naming
- **N/A**: Never applicable

**Evidence to cite**: Prop names and their purposes

---

#### 3.2 Correct Tone & Voice

**Trades**: Design, Dev | **Environments**: Web, Mobile

- **Developer action**: Mark as **N/A** (Design/content criterion)

---

#### 3.3 Clear examples and do/don't guidance

**Trades**: Design, Dev | **Environments**: Web, Mobile

**What to check**:

- Documentation at `docs/components/[ComponentName]/`
- Storybook stories: How many examples exist?
- Are there do/don't sections in the documentation?

**Scoring**:

- **3**: 3-4+ examples covering major props, clear do/don't guidance
- **2**: Some examples, incomplete guidance
- **1**: No examples or poor documentation
- **N/A**: Never applicable

**Evidence to cite**: Number of stories, documentation quality

---

### Category 4: Accessibility (A11y)

**Description**: Meets WCAG 2.1 AA compliance.

#### 4.1 ARIA Roles

**Trades**: Dev only | **Environments**: Web only

**What to check**:

- Look for `role` attributes in the component
- Check if semantic HTML elements are used (which provide implicit roles)
- Reference: https://www.w3.org/WAI/ARIA/apg/patterns/

**Scoring**:

- **3**: Correct ARIA roles as defined in WAI-ARIA APG
- **2**: Proper defaults via semantic elements, no explicit ARIA needed
- **1**: Incorrect or missing ARIA roles
- **N/A**: Component has no interactive elements

**Evidence to cite**: ARIA attributes and semantic elements used

---

#### 4.2 Keyboard Support

**Trades**: Dev only | **Environments**: Web only

**What to check**:

- Event handlers: `onKeyDown`, `onKeyUp`, `onKeyPress`
- Focus management: `tabIndex`, `focus()` calls
- Standard keyboard patterns for the component type

**Scoring**:

- **3**: Full keyboard support per WAI-ARIA patterns
- **2**: Partial keyboard support
- **1**: No keyboard support (but should have)
- **N/A**: Component is not interactive

**Evidence to cite**: Keyboard event handlers and focus management code

---

#### 4.3 Proper Contrast and Text Size

**Trades**: Design, Dev | **Environments**: Web, Mobile

**What to check**:

- Are text colors using semantic tokens (which ensure contrast)?
- Are font sizes using typography tokens?
- No custom colors that might fail contrast

**Automated Testing with Pa11y** (Recommended):

[Pa11y](https://pa11y.org/) is a free, open-source accessibility testing tool
that can automatically check contrast ratios and text size compliance.

---

##### LLM/Cursor Automated Approach (Preferred)

The LLM should run Pa11y via CLI and include the results in the audit report.

**Step 1: Find Storybook story IDs**

Look in `docs/components/[ComponentName]/` for `Web.stories.tsx` files. The
story ID format is:

```
components-[category]-[componentname]-[platform]--[storyname]
```

Example for Tooltip:

- File: `docs/components/Tooltip/Web.stories.tsx`
- Story export: `Basic`
- Story ID: `components-overlays-tooltip-web--basic`

**Step 2: Run Pa11y via CLI**

Use the **iframe URL** (renders only the component, not Storybook UI):

```bash
pa11y "https://atlantis.getjobber.com/storybook/iframe.html?id=[story-id]" --timeout 30000
```

Example:

```bash
pa11y "https://atlantis.getjobber.com/storybook/iframe.html?id=components-overlays-tooltip-web--basic" --timeout 30000
```

> **Important**: Use `iframe.html?id=` NOT `?path=/story/`. The iframe URL
> renders ONLY the component without Storybook's surrounding UI.

**Step 3: Parse the results**

**Errors to IGNORE** (Storybook infrastructure, not the component):

```
• Error: Iframe element requires a non-empty title attribute
  └── <iframe height="1" width="1" style="...visibility: hidden;"></iframe>
```

This is a Storybook analytics tracking pixel - ignore it.

**Errors to REPORT** (actual component issues):

- Contrast ratio errors mentioning component elements
- Text size errors
- Color contrast failures

**Step 4: Interpret for scoring**

- **"0 Errors"** (or only the iframe tracking pixel) → Score **3**
- **Warnings only** → Score **2**
- **Real contrast/text errors** → Score **1** (document the specific issue)

**Step 5: Document in audit report**

Include in the notes column:

- Pass: `Pa11y verified (0 errors)`
- Fail: `Pa11y: [specific error description]`

---

##### Manual Approach (Fallback)

If Pa11y is not installed or CLI access is unavailable:

1. Install Pa11y globally:

   ```bash
   npm install -g pa11y
   ```

2. Run against deployed Storybook:

   ```bash
   pa11y "https://atlantis.getjobber.com/storybook/iframe.html?id=[story-id]" --timeout 30000
   ```

3. Or run against local Storybook:

   ```bash
   npm run storybook
   pa11y "http://localhost:6006/iframe.html?id=[story-id]" --timeout 30000
   ```

---

**LLM Code Review** (in addition to Pa11y):

- Check CSS for semantic color tokens (`--color-text`,
  `--color-text--secondary`, etc.)
- Verify typography tokens are used (`--typography--fontSize-*`)
- Flag any hardcoded color values that bypass the token system

**Scoring**:

- **3**: Pa11y passes (0 real errors) + uses semantic color and typography
  tokens
- **2**: Pa11y warnings, or mostly uses tokens with some concerns
- **1**: Pa11y fails with contrast errors, or hardcoded colors
- **N/A**: Component has no text

**Evidence to cite**: Pa11y CLI output + color/typography token usage from CSS

---

#### 4.4 Focus States

**Trades**: Dev only | **Environments**: Web, Mobile

**What to check**:

- CSS `:focus`, `:focus-visible` styles
- Focus ring visibility
- Consistent with Atlantis focus patterns

**Scoring**:

- **3**: Proper focus states following WCAG focus-appearance guidelines
- **2**: Some focus states, could be improved
- **1**: No focus states (but should have)
- **N/A**: Component is not focusable

**Evidence to cite**: Focus-related CSS rules

---

#### 4.5 Tab Order

**Trades**: Design, Dev | **Environments**: Web, Mobile

**What to check**:

- `tabIndex` prop support
- Logical DOM order for natural tab flow
- No `tabIndex > 0` (anti-pattern)

**Scoring**:

- **3**: Supports `tabIndex` prop or has proper semantic elements
- **2**: Uses default browser tabbing via semantic elements
- **1**: No tab support but should have
- **N/A**: Component is not interactive

**Evidence to cite**: tabIndex usage and DOM structure

---

#### 4.6 Semantic Markup

**Trades**: Dev only | **Environments**: Web, Mobile

**What to check**:

- Uses semantic HTML elements (`button`, `a`, `nav`, `section`, etc.)
- Avoids `div` soup where semantic elements are appropriate

**Scoring**:

- **3**: Uses semantic elements appropriately
- **2**: Some semantic elements, key element is non-semantic
- **1**: All divs/spans where semantic elements should be used
- **N/A**: Component is purely presentational

**Evidence to cite**: HTML elements used in render output

---

### Category 5: Interaction States

**Description**: Includes all relevant interaction states.

> **Scoring approach for this category**: If the component type doesn't need a
> particular state (e.g., a `Heading` doesn't need hover), mark as N/A. Only
> score 1 if the state is expected but missing.

#### 5.1 Hover

**Trades**: Design, Dev | **Environments**: Web, Mobile

**What to check**: CSS `:hover` styles in `.module.css`

**Scoring**:

- **3**: Supports hover state
- **2**: Hover exists but needs improvement
- **1**: No hover but should have
- **N/A**: Component doesn't need hover (non-interactive)

---

#### 5.2 Focus

**Trades**: Design, Dev | **Environments**: Web, Mobile

**What to check**: CSS `:focus`, `:focus-visible` styles

**Scoring**:

- **3**: Supports focus state
- **2**: Focus exists but needs improvement
- **1**: No focus but should have
- **N/A**: Component is not focusable

---

#### 5.3 Active

**Trades**: Design, Dev | **Environments**: Web, Mobile

**What to check**: CSS `:active` styles

**Scoring**:

- **3**: Supports active state
- **2**: Active exists but needs improvement
- **1**: No active but should have
- **N/A**: Component doesn't need active state

---

#### 5.4 Disabled

**Trades**: Design, Dev | **Environments**: Web, Mobile

**What to check**:

- `disabled` prop in types
- CSS `[disabled]` or `:disabled` styles
- `aria-disabled` attribute

**Scoring**:

- **3**: Supports disabled state properly
- **2**: Disabled exists but incomplete
- **1**: No disabled but should have
- **N/A**: Component can't be disabled

---

#### 5.5 Selected

**Trades**: Design, Dev | **Environments**: Web, Mobile

**What to check**:

- `selected`, `checked`, or similar prop
- `aria-selected` or `aria-checked`
- Visual selected state

**Scoring**:

- **3**: Supports selected state
- **2**: Selected exists but needs improvement
- **1**: No selected but should have
- **N/A**: Component doesn't have selection concept

---

#### 5.6 Pressed

**Trades**: Design, Dev | **Environments**: Web, Mobile

**What to check**:

- `aria-pressed` attribute
- Toggle button behavior

**Scoring**:

- **3**: Supports pressed state
- **2**: Pressed exists but needs improvement
- **1**: No pressed but should have
- **N/A**: Component is not a toggle

---

#### 5.7 Dragged

**Trades**: Design, Dev | **Environments**: Web, Mobile

**What to check**: Drag-related props or handlers

**Scoring**:

- **3**: Supports dragged state
- **2**: Dragged exists but needs improvement
- **1**: No dragged but should have
- **N/A**: Component is not draggable

---

#### 5.8 Swipe

**Trades**: Design, Dev | **Environments**: Web, Mobile

**What to check**: Swipe gesture handling (primarily mobile)

**Scoring**:

- **3**: Supports swipe state
- **2**: Swipe exists but needs improvement
- **1**: No swipe but should have
- **N/A**: Component doesn't need swipe

---

### Category 6: Behavioral States

**Description**: Includes all relevant behavioral states and examples.

#### 6.1 Read-Only

**Trades**: Design, Dev | **Environments**: Web, Mobile

**What to check**:

- `readonly` or `readOnly` prop
- Visual distinction from editable state

**Scoring**:

- **3**: Supports read-only state
- **2**: Read-only exists but needs improvement
- **1**: No read-only but should have (for editable components)
- **N/A**: Component has no editable content

---

#### 6.2 Empty

**Trades**: Design, Dev | **Environments**: Web, Mobile

**What to check**:

- How component handles empty/null/undefined children or value
- Empty state messaging or visuals

**Scoring**:

- **3**: Gracefully handles empty state
- **2**: Empty handling exists but could be better
- **1**: Poor or no empty state handling
- **N/A**: Component doesn't have empty state concept

---

#### 6.3 Loading

**Trades**: Design, Dev | **Environments**: Web, Mobile

**What to check**:

- `loading` prop
- Loading indicator integration (Spinner, Glimmer)

**Scoring**:

- **3**: Supports loading state
- **2**: Loading exists but needs improvement
- **1**: No loading but should have
- **N/A**: Component doesn't need loading state

---

#### 6.4 Success

**Trades**: Design, Dev | **Environments**: Web, Mobile

**What to check**:

- Success variation or state
- Visual success feedback

**Scoring**:

- **3**: Supports success state
- **2**: Success exists but needs improvement
- **1**: No success but should have
- **N/A**: Component doesn't need success state

---

#### 6.5 Error

**Trades**: Design, Dev | **Environments**: Web, Mobile

**What to check**:

- `error` prop or error state
- Error messaging/styling
- `aria-invalid` for form fields

**Scoring**:

- **3**: Supports error state
- **2**: Error exists but needs improvement
- **1**: No error but should have
- **N/A**: Component can't have errors

---

### Category 7: Flexibility / Composition

**Description**: Supports variants and composition as defined.

#### 7.1 Cases and variants

**Trades**: Design, Dev | **Environments**: Web, Mobile

**What to check**:

- `variation`, `type`, `size`, or similar props
- How many variants are supported?
- Are variants documented?

**Scoring**:

- **3**: All documented variants supported
- **2**: Some documented variants missing
- **1**: No variants where expected
- **N/A**: Component doesn't need variants

**Evidence to cite**: List of supported variants

---

#### 7.2 Composition

**Trades**: Design, Dev | **Environments**: Web, Mobile

**What to check**:

- Does component accept `children`?
- Compound component pattern (e.g., `Modal.Header`, `Modal.Content`)
- Are props aligned between design and engineering?

**Scoring**:

- **3**: Compound component pattern (e.g., `Modal.Header`, `Modal.Content`,
  `Menu.Item`) OR content container (children become the component's content)
- **2**: Behavior wrapper - wraps child to add behavior without composing
  content (e.g., Tooltip adds hover behavior, Link adds navigation)
- **1**: No composition where expected (component should accept children but
  doesn't)
- **N/A**: Component is atomic/leaf (e.g., Icon, Spinner - no children expected)

**Examples**:

- Score 3: Modal (compound: Header/Content/Footer), Card (content container)
- Score 2: Tooltip (behavior wrapper: adds hover), Link (behavior wrapper: adds
  navigation)
- Score N/A: Icon, Spinner, ProgressBar (no children expected)

**Evidence to cite**: Composition pattern (compound/content container/behavior
wrapper)

---

#### 7.3 Flexibility

**Trades**: Dev only | **Environments**: Web, Mobile

**What to check**:

- Can tokens be overridden? (Check 1.5)
- Is composition supported? (Check 7.2)
- `UNSAFE_className` and `UNSAFE_style` support

**Scoring**:

- **3**: Highly flexible (tokens overridable, composable)
- **2**: Somewhat flexible
- **1**: Not flexible but should be
- **N/A**: Component is intentionally restricted

**Evidence to cite**: Flexibility mechanisms available

---

#### 7.4 Headless

**Trades**: Dev only | **Environments**: Web, Mobile

**What to check**:

- Does component use headless UI library patterns?
- Are logic and presentation separated?
- Can the component be used without default styling?

**Scoring**:

- **3**: Uses headless pattern or can be used headlessly
- **2**: Partially headless
- **1**: Not headless but should be
- **N/A**: Component doesn't need headless pattern

**Evidence to cite**: Headless patterns or lack thereof

---

### Category 8: Motion / Transitions / Haptic

**Description**: Uses motion appropriately and consistently.

#### 8.1 Hover/press animations implemented correctly

**Trades**: Design, Dev | **Environments**: Web, Mobile

**What to check**:

- CSS `transition` properties on hover/active states
- Framer Motion or similar animation library usage

**Scoring**:

- **3**: Proper hover/press animations where applicable
- **2**: Partial animation support
- **1**: No animations but should have
- **N/A**: Component doesn't need hover/press animations

**Evidence to cite**: Transition/animation CSS or code

---

#### 8.2 Transitions accounted for when applicable

**Trades**: Design, Dev | **Environments**: Web, Mobile

**What to check**:

- Enter/exit transitions
- State change transitions
- Uses timing tokens (`--timing-*`)

**Scoring**:

- **3**: Proper transitions using tokens
- **2**: Some transitions present
- **1**: No transitions but should have
- **N/A**: Component doesn't need transitions

**Evidence to cite**: Transition code and token usage

---

#### 8.3 Use of Motion tokens

**Trades**: Design, Dev | **Environments**: Web, Mobile

**What to check**:

- `--timing-*` tokens in CSS
- `prefers-reduced-motion` media query support

**Scoring**:

- **3**: Uses motion tokens + respects reduced motion
- **2**: Uses some motion tokens
- **1**: Hardcoded timing values, no reduced motion support
- **N/A**: Component has no motion

**Evidence to cite**: Motion token usage and reduced motion handling

---

### Category 9: Code Quality & Performance

**Description**: Built with current React standards and optimized performance.

#### 9.1 Test Coverage

**Trades**: Dev only | **Environments**: Web, Mobile

**What to check**:

- Count test cases in `.test.tsx`
- Look for visual tests (`.pom.tsx` or visual test files)
- Check for interaction testing

**Scoring**:

- **3**: >80% coverage, visual + interaction tests
- **2**: >50% coverage, some visual/interaction tests
- **1**: <50% coverage, no visual/interaction tests
- **N/A**: Never applicable

**Evidence to cite**: Number and types of tests

---

#### 9.2 Linting & Standards

**Trades**: Dev only | **Environments**: Web, Mobile

**What to check**:

- `eslint-disable` comments
- TypeScript `@ts-ignore` or `@ts-expect-error`
- Code patterns that don't follow conventions

**Scoring**:

- **3**: No linting issues or overrides
- **2**: Some linting overrides (1-5)
- **1**: Many linting overrides (>5)
- **N/A**: Never applicable

**Evidence to cite**: Count of linting overrides

---

#### 9.3 Performance

**Trades**: Dev only | **Environments**: Web, Mobile

> **⏸️ SKIPPED**: Performance testing has been temporarily excluded from the
> audit. React development and production builds have significant performance
> differences - testing with 1000 instances of a component locally in dev mode
> would give misleading results that don't reflect production behavior.

**For Future Reference** (when performance testing is re-enabled):

**What to check**:

- `React.memo`, `useMemo`, `useCallback` usage where appropriate
- Avoiding unnecessary re-renders
- No expensive operations in render
- Test with 1000+ component instances for performance profiling
- **Important**: Test against a production build, not development mode

**Scoring** (when enabled):

- **3**: Proper memoization, no performance issues expected
- **2**: Some memoization, minor concerns
- **1**: Performance issues likely (missing memoization, render-heavy)
- **N/A**: Component is trivially simple

**Current Action**: Mark as **N/A** with note: "Skipped - React dev/prod
performance differences make local testing unreliable"

---

#### 9.4 Documentation

**Trades**: Dev only | **Environments**: Web, Mobile

**What to check**:

- JSDoc comments on props and functions
- Storybook stories quality
- README or component-level documentation

**Scoring**:

- **3**: Well-documented code, quality stories, good docs page
- **2**: Some documentation, some stories
- **1**: No documentation, poor stories
- **N/A**: Never applicable

**Evidence to cite**: Documentation quality assessment

---

### Category 10: Cross Platform

**Description**: Functional and visual parity across platforms.

#### 10.1 Desktop

**Trades**: Design, Dev | **Environments**: Web, Mobile

**What to check**:

- Component works at desktop viewport (1200+ px)
- No hardcoded widths that break at large sizes

**Scoring**:

- **3**: Works well at desktop viewport
- **2**: Some issues at desktop viewport
- **1**: Many issues at desktop viewport
- **N/A**: Component is mobile-only

---

#### 10.2 Mobile Web

**Trades**: Design, Dev | **Environments**: Web, Mobile

**What to check**:

- Responsive design
- Touch-friendly sizing
- Works at mobile viewport (<768px)

**Scoring**:

- **3**: Works well at mobile viewport
- **2**: Some issues at mobile viewport
- **1**: Many issues at mobile viewport
- **N/A**: Component is desktop-only

---

#### 10.3 Native iOS

**Trades**: Design, Dev | **Environments**: Web, Mobile

**What to check**:

- Mobile component exists in `components-native`
- Follows iOS patterns where appropriate

**Scoring**:

- **3**: Matches native iOS look/feel
- **2**: Partially matches iOS patterns
- **1**: Doesn't match but should
- **N/A**: No mobile version or doesn't need iOS-specific styling

---

#### 10.4 Native Android

**Trades**: Design, Dev | **Environments**: Web, Mobile

**What to check**:

- Mobile component exists in `components-native`
- Follows Android patterns where appropriate

**Scoring**:

- **3**: Matches native Android look/feel
- **2**: Partially matches Android patterns
- **1**: Doesn't match but should
- **N/A**: No mobile version or doesn't need Android-specific styling

---

### Category 11: Localization + Internationalization

**Description**: Enables different languages and/or region compatibility.

#### 11.1 No hardcoded English text

**Trades**: Dev only | **Environments**: Web, Mobile

**What to check**:

- Search for hardcoded strings in component
- Are all user-visible strings passed as props?

**Scoring**:

- **3**: All visible text can be overridden via props
- **2**: Some text hardcoded, some overridable
- **1**: All text hardcoded
- **N/A**: Component has no text

**Evidence to cite**: Hardcoded strings found

---

#### 11.2 Uses account settings fallback to browser

**Trades**: Dev only | **Environments**: Web, Mobile

**What to check**:

- Does component consume locale from context?
- Date/number formatting respects locale

**Scoring**:

- **3**: Supports locale via ContextProvider
- **2**: Partially supports locale
- **1**: No locale support but should have
- **N/A**: Component doesn't need locale (no dates/numbers/text)

**Evidence to cite**: Locale-related code

---

#### 11.3 Allow for configuration

**Trades**: Design, Dev | **Environments**: Web, Mobile

**What to check**:

- Region-specific props (e.g., `locale`, `currency`)
- RTL support

**Scoring**:

- **3**: Supports region configuration
- **2**: Partial region configuration
- **1**: No region configuration but should have
- **N/A**: Component doesn't need region config

**Evidence to cite**: Region/locale configuration options

---

## Output Template

Use this exact format for the audit report. Copy the template and fill in scores
and notes.

```markdown
# [COMPONENT_NAME] Audit Report

**Audit Date**: [DATE] **Auditor**: LLM (Claude/GPT) **Component Version**:
[VERSION or commit hash if known] **Platforms Audited**: Web [, Mobile if
exists]

---

## Component Overview

**Purpose**: [Brief description of what the component does]

**Key Props**: [List main props]

**Platforms Available**:

- Web: Yes/No
- Mobile: Yes/No

---

## Summary

| Category                   | Web Dev | Mobile Dev   | Notes                                 |
| -------------------------- | ------- | ------------ | ------------------------------------- |
| 1. Tokens & Theming        | [AVG]   | [AVG or N/A] |                                       |
| 2. Visual UI               | [TBD]   | [TBD or N/A] | Optional - designers already reviewed |
| 3. Content Design          | [AVG]   | [AVG or N/A] |                                       |
| 4. Accessibility           | [AVG]   | [AVG or N/A] | Pa11y recommended for 4.3             |
| 5. Interaction States      | [AVG]   | [AVG or N/A] |                                       |
| 6. Behavioral States       | [AVG]   | [AVG or N/A] |                                       |
| 7. Flexibility/Composition | [AVG]   | [AVG or N/A] |                                       |
| 8. Motion/Transitions      | [AVG]   | [AVG or N/A] |                                       |
| 9. Code Quality            | [AVG]   | [AVG or N/A] | 9.3 Performance skipped               |
| 10. Cross Platform         | [AVG]   | [AVG or N/A] |                                       |
| 11. Localization           | [AVG]   | [AVG or N/A] |                                       |

---

## Detailed Scores

### 1. Tokens & Theming

| ID  | Criterion                            | Web Dev     | Notes      | Mobile Dev  | Notes      |
| --- | ------------------------------------ | ----------- | ---------- | ----------- | ---------- |
| 1.1 | Proper use of semantic design tokens | [3/2/1/N/A] | [Evidence] | [3/2/1/N/A] | [Evidence] |
| 1.2 | Tokens applied correctly             | [3/2/1/N/A] | [Evidence] | [3/2/1/N/A] | [Evidence] |
| 1.3 | Theme capability                     | [3/2/1/N/A] | [Evidence] | [3/2/1/N/A] | [Evidence] |
| 1.4 | Dark and light mode compatible       | [3/2/1/N/A] | [Evidence] | [3/2/1/N/A] | [Evidence] |
| 1.5 | Tokens can be overridden             | [3/2/1/N/A] | [Evidence] | [3/2/1/N/A] | [Evidence] |

### 2. Visual UI

> **⚠️ MANUAL REVIEW REQUIRED**: LLM provides partial observations below.
> Complete scoring requires visual comparison with Figma.

| ID  | Criterion                         | Web Dev      | Notes                                       | Mobile Dev   | Notes          |
| --- | --------------------------------- | ------------ | ------------------------------------------- | ------------ | -------------- |
| 2.1 | Icons have visual parity          | [TBD-Manual] | LLM observations: [List icons found]        | [TBD-Manual] | [observations] |
| 2.2 | Color tokens have visual parity   | [TBD-Manual] | LLM observations: [Token patterns found]    | [TBD-Manual] | [observations] |
| 2.3 | Typography has visual parity      | [TBD-Manual] | LLM observations: [Typography tokens found] | [TBD-Manual] | [observations] |
| 2.4 | Spacing has visual parity         | [TBD-Manual] | LLM observations: [Spacing tokens found]    | [TBD-Manual] | [observations] |
| 2.5 | Visual assets formatted correctly | [TBD-Manual] | LLM observations: [Asset handling notes]    | [TBD-Manual] | [observations] |

### 3. Content Design

| ID  | Criterion                            | Web Dev     | Notes            | Mobile Dev  | Notes            |
| --- | ------------------------------------ | ----------- | ---------------- | ----------- | ---------------- |
| 3.1 | Clear naming                         | [3/2/1/N/A] | [Evidence]       | [3/2/1/N/A] | [Evidence]       |
| 3.2 | Correct Tone & Voice                 | N/A         | Design criterion | N/A         | Design criterion |
| 3.3 | Clear examples and do/don't guidance | [3/2/1/N/A] | [Evidence]       | [3/2/1/N/A] | [Evidence]       |

### 4. Accessibility (A11y)

> **💡 TIP**: Use [Pa11y](https://pa11y.org/) for automated accessibility
> testing. Run against docs visual testing page or Storybook.

| ID  | Criterion                     | Web Dev     | Notes                                             | Mobile Dev  | Notes      |
| --- | ----------------------------- | ----------- | ------------------------------------------------- | ----------- | ---------- |
| 4.1 | ARIA Roles                    | [3/2/1/N/A] | [Evidence]                                        | N/A         | Web only   |
| 4.2 | Keyboard Support              | [3/2/1/N/A] | [Evidence]                                        | N/A         | Web only   |
| 4.3 | Proper Contrast and Text Size | [3/2/1/N/A] | Pa11y result: [pass/warn/fail] + [token evidence] | [3/2/1/N/A] | [Evidence] |
| 4.4 | Focus States                  | [3/2/1/N/A] | [Evidence]                                        | [3/2/1/N/A] | [Evidence] |
| 4.5 | Tab Order                     | [3/2/1/N/A] | [Evidence]                                        | [3/2/1/N/A] | [Evidence] |
| 4.6 | Semantic Markup               | [3/2/1/N/A] | [Evidence]                                        | [3/2/1/N/A] | [Evidence] |

### 5. Interaction States

| ID  | Criterion | Web Dev     | Notes      | Mobile Dev  | Notes      |
| --- | --------- | ----------- | ---------- | ----------- | ---------- |
| 5.1 | Hover     | [3/2/1/N/A] | [Evidence] | [3/2/1/N/A] | [Evidence] |
| 5.2 | Focus     | [3/2/1/N/A] | [Evidence] | [3/2/1/N/A] | [Evidence] |
| 5.3 | Active    | [3/2/1/N/A] | [Evidence] | [3/2/1/N/A] | [Evidence] |
| 5.4 | Disabled  | [3/2/1/N/A] | [Evidence] | [3/2/1/N/A] | [Evidence] |
| 5.5 | Selected  | [3/2/1/N/A] | [Evidence] | [3/2/1/N/A] | [Evidence] |
| 5.6 | Pressed   | [3/2/1/N/A] | [Evidence] | [3/2/1/N/A] | [Evidence] |
| 5.7 | Dragged   | [3/2/1/N/A] | [Evidence] | [3/2/1/N/A] | [Evidence] |
| 5.8 | Swipe     | [3/2/1/N/A] | [Evidence] | [3/2/1/N/A] | [Evidence] |

### 6. Behavioral States

| ID  | Criterion | Web Dev     | Notes      | Mobile Dev  | Notes      |
| --- | --------- | ----------- | ---------- | ----------- | ---------- |
| 6.1 | Read-Only | [3/2/1/N/A] | [Evidence] | [3/2/1/N/A] | [Evidence] |
| 6.2 | Empty     | [3/2/1/N/A] | [Evidence] | [3/2/1/N/A] | [Evidence] |
| 6.3 | Loading   | [3/2/1/N/A] | [Evidence] | [3/2/1/N/A] | [Evidence] |
| 6.4 | Success   | [3/2/1/N/A] | [Evidence] | [3/2/1/N/A] | [Evidence] |
| 6.5 | Error     | [3/2/1/N/A] | [Evidence] | [3/2/1/N/A] | [Evidence] |

### 7. Flexibility / Composition

| ID  | Criterion          | Web Dev     | Notes      | Mobile Dev  | Notes      |
| --- | ------------------ | ----------- | ---------- | ----------- | ---------- |
| 7.1 | Cases and variants | [3/2/1/N/A] | [Evidence] | [3/2/1/N/A] | [Evidence] |
| 7.2 | Composition        | [3/2/1/N/A] | [Evidence] | [3/2/1/N/A] | [Evidence] |
| 7.3 | Flexibility        | [3/2/1/N/A] | [Evidence] | [3/2/1/N/A] | [Evidence] |
| 7.4 | Headless           | [3/2/1/N/A] | [Evidence] | [3/2/1/N/A] | [Evidence] |

### 8. Motion / Transitions / Haptic

| ID  | Criterion                 | Web Dev     | Notes      | Mobile Dev  | Notes      |
| --- | ------------------------- | ----------- | ---------- | ----------- | ---------- |
| 8.1 | Hover/press animations    | [3/2/1/N/A] | [Evidence] | [3/2/1/N/A] | [Evidence] |
| 8.2 | Transitions accounted for | [3/2/1/N/A] | [Evidence] | [3/2/1/N/A] | [Evidence] |
| 8.3 | Use of Motion tokens      | [3/2/1/N/A] | [Evidence] | [3/2/1/N/A] | [Evidence] |

### 9. Code Quality & Performance

| ID  | Criterion           | Web Dev     | Notes                                | Mobile Dev  | Notes      |
| --- | ------------------- | ----------- | ------------------------------------ | ----------- | ---------- |
| 9.1 | Test Coverage       | [3/2/1/N/A] | [Evidence]                           | [3/2/1/N/A] | [Evidence] |
| 9.2 | Linting & Standards | [3/2/1/N/A] | [Evidence]                           | [3/2/1/N/A] | [Evidence] |
| 9.3 | Performance         | N/A         | Skipped - dev/prod build differences | N/A         | Skipped    |
| 9.4 | Documentation       | [3/2/1/N/A] | [Evidence]                           | [3/2/1/N/A] | [Evidence] |

### 10. Cross Platform

| ID   | Criterion      | Web Dev     | Notes      | Mobile Dev  | Notes      |
| ---- | -------------- | ----------- | ---------- | ----------- | ---------- |
| 10.1 | Desktop        | [3/2/1/N/A] | [Evidence] | N/A         | N/A        |
| 10.2 | Mobile Web     | [3/2/1/N/A] | [Evidence] | N/A         | N/A        |
| 10.3 | Native iOS     | N/A         | N/A        | [3/2/1/N/A] | [Evidence] |
| 10.4 | Native Android | N/A         | N/A        | [3/2/1/N/A] | [Evidence] |

### 11. Localization + Internationalization

| ID   | Criterion                      | Web Dev     | Notes      | Mobile Dev  | Notes      |
| ---- | ------------------------------ | ----------- | ---------- | ----------- | ---------- |
| 11.1 | No hardcoded English text      | [3/2/1/N/A] | [Evidence] | [3/2/1/N/A] | [Evidence] |
| 11.2 | Uses account settings fallback | [3/2/1/N/A] | [Evidence] | [3/2/1/N/A] | [Evidence] |
| 11.3 | Allow for configuration        | [3/2/1/N/A] | [Evidence] | [3/2/1/N/A] | [Evidence] |

---

## Key Findings

### Strengths

- [List what the component does well]

### Areas for Improvement

- [List issues found, prioritized by severity]

### Recommendations

- [Actionable recommendations for improvements]

---

## Files Reviewed

- [ ] `packages/components/src/[ComponentName]/[ComponentName].tsx`
- [ ] `packages/components/src/[ComponentName]/[ComponentName].module.css`
- [ ] `packages/components/src/[ComponentName]/[ComponentName].test.tsx`
- [ ] `packages/components/src/[ComponentName]/[ComponentName].types.ts`
- [ ] `docs/components/[ComponentName]/[ComponentName].stories.mdx`
- [ ] `docs/components/[ComponentName]/Web.stories.tsx`
- [ ] `packages/components-native/src/[ComponentName]/` (if exists)
```

---

## Verification Checklist

### LLM Self-Review (Required before submitting report)

The LLM **MUST** verify these items before finalizing the report:

- [ ] **File Coverage**: Did I read ALL relevant files for this component?
- [ ] **Component Understanding**: Can I explain what this component does in one
      sentence?
- [ ] **Evidence-Based**: Does every score have supporting evidence from the
      code?
- [ ] **Specific Notes**: Are my notes specific and unambiguous? Avoid vague
      terms like "tested" - instead say "unit tested", "covered by tests in
      lines X-Y", or "visually verified in Storybook"
- [ ] **N/A Consistency**: Did I use N/A only when the criterion genuinely
      doesn't apply?
- [ ] **Mobile Check**: Did I check if a mobile version exists?
- [ ] **No Assumptions**: Did I avoid assuming behavior without reading the
      code?
- [ ] **Token Verification**: Did I actually find and cite the tokens used?
- [ ] **Test Count**: Did I count the actual tests in the test file?
- [ ] **Documentation Check**: Did I review the Storybook documentation?

### Manual Review (Required for developers)

After receiving the LLM audit report, developers should complete these items:

**Required:**

- [ ] **Contrast Testing (4.3)**: Run Pa11y against the component (docs site or
      Storybook)
- [ ] **Performance (9.3)**: Mark as N/A with note (dev/prod build differences)

**Optional** (if time permits):

- [ ] **Visual UI (Category 2)**: Compare Storybook with Figma (designers
      already reviewed, so this is optional)

**Recommended - Validation:**

- [ ] **Spot Check Scores**: Verify 3-5 random scores against actual code
- [ ] **Verify Critical Criteria**: Check accessibility scores manually
- [ ] **Test Interaction States**: Manually test hover, focus, disabled states
- [ ] **Check Dark Mode**: Toggle dark mode in Storybook to verify
- [ ] **Run Test Suite**: Ensure tests actually pass
- [ ] **Review Recommendations**: Assess if recommendations are actionable

### Common Pitfalls to Watch For

1. **False Positives on Tokens**: Just because a file uses `var(--something)`
   doesn't mean they're semantic tokens. Verify the token names.

2. **Overconfident Accessibility Scores**: ARIA roles and keyboard support need
   careful verification. When in doubt, score conservatively.

3. **Missing Mobile Components**: Some components exist only on web. Don't
   create fake mobile scores.

4. **Confusing N/A with Unknown**: N/A means "genuinely not applicable," not "I
   didn't find evidence."

5. **Ignoring Compound Components**: Components like `Modal.Header`,
   `DataList.Row` are part of the main component's audit.

6. **Test Coverage Guessing**: Don't guess coverage percentages. Count test
   cases and describe what's tested.

---

## Appendix: Token Reference

### Semantic Color Tokens (correct usage)

```css
--color-interactive
--color-interactive--hover
--color-interactive--pressed
--color-surface
--color-surface--background
--color-surface--reverse
--color-text
--color-text--secondary
--color-text--reverse
--color-critical
--color-warning
--color-success
--color-informative
--color-border
--color-border--section
```

### Primitive/Base Tokens (avoid direct usage)

```css
--color-green-200  /* Use semantic instead */
--color-grey-700   /* Use semantic instead */
```

### Spacing Tokens

```css
--space-smallest
--space-smaller
--space-small
--space-base
--space-large
--space-larger
--space-largest
--space-extravagant
```

### Typography Tokens

```css
/* Font Size */
--typography--fontSize-smaller
--typography--fontSize-small
--typography--fontSize-base
--typography--fontSize-large
--typography--fontSize-larger
--typography--fontSize-largest
--typography--fontSize-jumbo
--typography--fontSize-extravagant

/* Line Height */
--typography--lineHeight-minuscule
--typography--lineHeight-tightest
--typography--lineHeight-tighter
--typography--lineHeight-tight
--typography--lineHeight-base
--typography--lineHeight-large
--typography--lineHeight-larger
--typography--lineHeight-largest
--typography--lineHeight-jumbo
--typography--lineHeight-extravagant

/* Font Family */
--typography--fontFamily-normal
--typography--fontFamily-display

/* Letter Spacing */
--typography--letterSpacing-base
--typography--letterSpacing-loose
```

> **Note**: Atlantis does NOT have `fontWeight` tokens. Font weights should be
> set using standard CSS values (400, 500, 600, 700) or keywords (normal,
> medium, semibold, bold). Hardcoded font-weight values are acceptable.

### Timing/Motion Tokens

```css
--timing-quick
--timing-base
--timing-slow
```

---

## Quick Reference: Criteria Summary

| ID        | Criterion                | Dev-Auditable | Notes                                                                                    |
| --------- | ------------------------ | ------------- | ---------------------------------------------------------------------------------------- |
| 1.1       | Semantic tokens          | ✅            | Check CSS                                                                                |
| 1.2       | Tokens applied correctly | ✅            | Check CSS                                                                                |
| 1.3       | Theme capability         | ✅            | Check context/props                                                                      |
| 1.4       | Dark/light mode          | ✅            | Check tokens                                                                             |
| 1.5       | Tokens overridable       | ✅            | Check CSS variables                                                                      |
| 2.1-2.5   | Visual parity            | ⚠️ Partial    | LLM provides observations; manual Figma review **optional** (designers already reviewed) |
| 3.1       | Clear naming             | ✅            | Check props/types                                                                        |
| 3.2       | Tone & Voice             | ❌            | Design only                                                                              |
| 3.3       | Examples/guidance        | ✅            | Check docs                                                                               |
| 4.1       | ARIA Roles               | ✅            | Check JSX                                                                                |
| 4.2       | Keyboard support         | ✅            | Check handlers                                                                           |
| 4.3       | Contrast/text size       | ✅            | Check tokens + **use Pa11y**                                                             |
| 4.4       | Focus states             | ✅            | Check CSS                                                                                |
| 4.5       | Tab order                | ✅            | Check tabIndex                                                                           |
| 4.6       | Semantic markup          | ✅            | Check JSX elements                                                                       |
| 5.1-5.8   | Interaction states       | ✅            | Check CSS/props                                                                          |
| 6.1-6.5   | Behavioral states        | ✅            | Check props                                                                              |
| 7.1       | Variants                 | ✅            | Check props                                                                              |
| 7.2       | Composition              | ✅            | Check children/compound                                                                  |
| 7.3       | Flexibility              | ✅            | Check UNSAFE\_\* props                                                                   |
| 7.4       | Headless                 | ✅            | Check architecture                                                                       |
| 8.1-8.3   | Motion                   | ✅            | Check CSS/framer                                                                         |
| 9.1       | Test coverage            | ✅            | Check test files                                                                         |
| 9.2       | Linting                  | ✅            | Check eslint-disable                                                                     |
| 9.3       | Performance              | ⏸️ Skipped    | Paused per team decision                                                                 |
| 9.4       | Documentation            | ✅            | Check stories/docs                                                                       |
| 10.1-10.4 | Cross platform           | ✅            | Check both packages                                                                      |
| 11.1-11.3 | Localization             | ✅            | Check hardcoded text                                                                     |

---

_Document Version: 1.1_ _Last Updated: January 2026_ _For use with Atlantis
Design System component audits_

**Changelog:**

- v1.1: Added Step-by-Step Execution Mode, Visual UI manual review guidance,
  Pa11y integration for accessibility testing, Performance testing paused
- v1.0: Initial release

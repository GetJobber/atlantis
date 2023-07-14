# Contributing

## How can you contribute?

There are several ways you can make meaningful contributions to `Atlantis`.

### Types of contribution

#### Bugfix

If a component’s layout is broken, fails a WCAG standard, or otherwise is not
working as intended, there’s no need to discuss fixing it - put up a PR! Even if
the fix you put up isn't the way we end up solving it, recording the bug and an
attempted solution is really valuable.

> Example: The action button on a Banner is growing to match the height of the
> Banner's text content, causing the button to stretch in ways a button should
> not stretch.

#### Feature enhancement

If a component does almost the thing you need, or looks almost right for your
use case, but you need to extend it a bit to get it to work just right, reach
out to the Atlantis team or
[file an issue](https://github.com/GetJobber/atlantis/issues/new). We'll discuss
it to get alignment on the change so that you can implement with confidence.

> Example: We already have a “Success”, “Error”, and “Notice” Banner, but want
> to add a "Warning" Banner. This adds another “type” of Banner, extending the
> existing concept of “type”.

#### Feature addition

If a component is missing a type of functionality, reach out to the Atlantis
team or [file an issue](https://github.com/GetJobber/atlantis/issues/new). When
we discuss it, we can determine if it’s complex enough to merit a more defined
set of requirements via a proposal, or if you should proceed directly with
implementation.

> Example: Banner is not dismissible but we think it might need to be. This adds
> a new concept to Banner so we’ll want to talk about how to implement this in a
> relatively generic way, compare it to how other dismissible components behave,
> and make sure we’re aligned on what “dismissing” actually means (is it a
> permanent removal, temporarily hiding, etc).

#### New component or pattern

If a new component (or something bigger) is needed, reach out to the Atlantis
team or [file an issue](https://github.com/GetJobber/atlantis/issues/new). When
we discuss it, we can determine if it’s complex enough to merit a more defined
set of requirements first, or if your team should proceed directly with
implementation. For new components, we’ll likely ask that you put forward a
proposal to ensure alignment on the component’s purpose, functionality,
behaviour requirements, accessibility, and interface before you invest too much
time writing code.

> Example: We don't have a Banner, but we think we need one. We should align on
> what role a Banner fulfills, how it’s related but different from Toast, what
> types of information a Banner should convey, and what its role is from an
> accessibility perspective.

### Submit an issue

Submitting an issue is the simplest way you can contribute to `Atlantis`.

An issue is a way to request a change, or start a discussion around anything
related to `Atlantis`. You can reference the types of issue listed above for
more guidance on the kinds of things you might identify in an issue.

To submit an issue, go to our
[Github new issue page](https://github.com/GetJobber/atlantis/issues/new) and
fill out the details.

### Write a proposal

#### I know what I want to add, can I just put up a PR?

The proposal is an opportunity to step outside of your immediate needs and
consider things like:

- What _is_ this component... what action does it enable the user to take?
- What else could this be used for?
- How have other products/design systems solved this type of component?
- How can we ensure this component is accessible?
- What properties will be needed for the next person to use this component?

It's also an opportunity for the Atlantis team to consider how this contribution
might impact other elements of the system, and offer guidance on best practices
and established patterns.

#### What should be in a proposal?

A component's proposal should take the form of a component's documentation. In
this way, we're describing the intended behaviour and functionality of the
component, as well as how it fits within the Atlantis system, to determine
requirements before we build.

The documentation requirements cover the following topics:

- Usage guidelines
- Interface and Props (properties)
- Content guidelines
- Accessibility
- Responsiveness
- Mockups
- Notes (additional context)

To create the template for a component proposal, run the command
`npm run generate` in the Atlantis repository. This command will provide you
with the documentation template, as well as the files you'll need to build the
component once your proposal is approved.

#### What is the process for submitting a proposal?

1. Reach out to the Atlantis team to align on the need for a contribution
   - This can be coordinated via Slack (at Jobber) or a
     [Github issue](https://github.com/GetJobber/atlantis/issues/new)
2. Create a branch named `<component_name>-proposal`
3. Create a directory and required files for the component using
   `npm run generate`
4. Fill out the documentation - whenever possible, a designer and engineer
   should collaborate on this
5. Submit a PR for the proposal
6. Gather feedback and iterate on proposal
7. Once approved a maintainer will land the proposal in `master` and you can
   proceed to implementation

### Implement a proposal

All components should start with a proposal. One of our
[Guiding Principles](#guiding-principles) is to start all components with
documentation. Once your proposal has been approved, proceed to contribute code
to Atlantis to make it a reality!

#### Contributing code

The process for contributing code is fairly simple.

1. Indicate on the issue that you are going to take on making the change
2. Fork `Atlantis` and begin making your changes
3. Submit a PR against `Atlantis` describing the changes you made, and
   referencing the Issue that you are trying to solve.
4. Once approved a maintainer will land the proposal in `master`

#### Opening a pull request

Atlantis uses Conventional Commits to track versions. Pull request titles should
follow the following format.

`<TYPE>(<optional SCOPE>): <conditionally BREAKING CHANGE:> <description>`

Want help with your pull request title? We have a
[tool to help](https://atlantis.getjobber.com/?path=/story/guides-pull-request-title-generator--page).

##### Requesting review

To request a review from Atlantis maintainers, use
[Github's review tool](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/requesting-a-pull-request-review)
and request from review from `GetJobber/Atlantis`.

## Guiding principles

### Documentation first

We believe that starting with solid documentation that describes the problem a
component is trying to solve will lead to better-written and more re-usable
components. This helps contributors to the system limit work-in-progress and
increase confidence in delivery.

### Encapsulation is important

Your components should do everything possible to avoid anyone needing to know
how they work. Limit the APIs to only the ones you absolutely have to expose;
the larger your API, the harder it will be to change a component.

### Semantics over descriptions

As much as possible, we want all our APIs to be represented as meaningful
properties, and not descriptive ones.

For Example:

```jsx
//Descriptive
<Button color=Color.red/>

//Semantic
<Button type=ButtonType.dangerous/>
```

_This helps us ensure that we can change our internal style without breaking API
changes._

## Documentation tools

### Code and sandbox

Some components, like
[Card](?path=/code/components-layouts-and-structure-card-web--basic), includes a
"Code" tab on the top right of the screen. This is turned off by default. To
turn this feature on, add a `parameter` of `previewTabs.code.hidden` and set it
to `false` on your stories meta.

```ts
export default {
   title: ...,
   component: ...,
   parameters: {
      ...,
      previewTabs: { code: { hidden: false } }, // <-- Add this
   },
} as ComponentMeta<YourComponent>;
```

### Native components disclaimer

We render `@jobber/components-native` code on web and sometimes they don't work
properly, you can show a warning below the story to explain that some problems
might arise. Add a `parameter` of `showNativeOnWebDisclaimer` and set it to
`true` on your stories meta.

```ts
export default {
   title: ...,
   component: ...,
   parameters: {
      ...,
      showNativeOnWebDisclaimer: true, // <-- Add this
   },
} as ComponentMeta<YourComponent>;
```

---
name: Contributing
route: /CONTRIBUTING.md
---

# Contributing

## How can you contribute?

There are several ways you can make meaningful contributions to `Atlantis`.

### Types of contribution

#### Bugfix

If a component’s layout is broken, fails a WCAG standard, or blows up when used
as intended, there’s no need to discuss fixing it - put up a PR!

#### Feature enhancement

If a component does almost the thing you need, or looks almost right for your
use case, but you need to extend it a bit to get it to work just right, talk to
at least one other designer. The outcome of this talk should be alignment on the
change so that you can implement with confidence. You might want to raise your
idea to the larger design team.

> For example, say we didn’t have a “Warning” Banner, but we already had a
> “Success”, “Error”, and “Notice”. This adds another “type”, extending the
> existing concept of “type”. Another example would be changing the unchecked
> state on checkbox to have a green border. No change to functionality, but has
> visual system impacts worth broaching with larger design team.

#### Feature addition

If a component is missing a type of functionality, book a chat with the Atlantis
team. When we talk about it, we can determine if it’s complex enough to merit a
more defined set of requirements via a proposal, or if your team should proceed
directly with implementation.

> For example, say a Banner was not dismissible and you needed it to be. This
> adds a new concept to Banner so we’ll want to talk about how to implement this
> in a relatively generic way, compare it to how other dismissible components
> behave, and make sure we’re aligned on what “dismissing” actually means (is it
> a permanent removal, temporarily hiding, etc).

#### New component or pattern

If a new component (or something bigger) is needed, book a chat with the
Atlantis team. When we talk about it, we can determine if it’s complex enough to
merit a more defined set of requirements first, or if your team should proceed
directly with implementation. For new components, we’ll likely ask that you put
forward a proposal to ensure alignment on the component’s purpose,
functionality, behaviour requirements, accessibility, and interface before you
invest too much time writing code.

> For example, if we didn’t have a Banner, we would want to review a proposal of
> what role a Banner fulfills, how it’s related but different from Toast, what
> types of information a Banner should convey, and what its role is from an
> accessibility perspective.

### Submit an Issue

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

The documentation requirements are captured in our
[documention template](https://github.com/GetJobber/atlantis/blob/master/packages/generators/templates/component/%7B%7Bname%7D%7D.%7B%7Bmdx%7D%7D)
and cover the following topics:

- Usage guidelines
- Interface and Props (properties)
- Content guidelines
- Accessibility
- Responsiveness
- Mockups
- Notes (additional context)

#### What is the process for submitting a proposal?

1. Reach out to the Atlantis team to align on the need for a contribution
   - This can be coordinated via Slack or a Github issue
2. Create a branch named `<component_name>-proposal`
3. Create a directory and required files for the component using
   `npm run generate`
4. Fill out the documentation - this should always involve a designer and
   engineer collaborating
5. Submit a PR for the proposal
6. Gather feedback and iterate on proposal
7. Once approved a maintainer will land the proposal in `master` and you can
   proceed to implementation

### Implement a Proposal

All components should start with a proposal. One of our
[Guiding Principles](#guiding-principles) is to start all components with
documentation. Once your proposal has been approved, proceed to contribute code
to Atlantis to make it a reality!

#### Contributing Code

The process for contributing code is fairly simple.

1. Indicate on the issue that you are going to take on making the change
2. Fork `Atlantis` and begin making your changes
3. Submit a PR against `Atlantis` describing the changes you made, and
   referencing the Issue that you are trying to solve.
4. Once approved a maintainer will land the proposal in `master`

#### Opening a Pull Request

Atlantis uses Conventional Commits to track versions. Pull request titles should
follow the following format.

`<TYPE>(<optional SCOPE>): <conditionally BREAKING CHANGE:> <description>`

Want help with your pull request title? We have a
[tool to help](/pull-request-name-generator).

## Guiding Principles

### Documentation first

We believe that starting with solid documentation that describes the problem a
component is trying to solve will lead to better written, and more generic
components. This helps contributors to the system limit work-in-progress and
increase confidence in what we're delivering.

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

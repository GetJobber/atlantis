---
name: Contributing
route: /CONTRIBUTING.md
---

# Contributing

# How can you contribute?

There are several ways you can make meaningful contributions to `Atlantis`.

## Submit an Issue

Submitting an issue is probably the easiest way you can contribute to
`Atlantis`.

An issue is a way to request a change, or start a discussion around anything
related to `Atlantis`. There most common types of issues are:

- **_Bugs_**: Any problems that you've found in either the `Atlantis` build
  code, or in its components
- **_Feature Request_**: Requests for any features you'd like to see in the
  `Atlantis` design system. New components requests, Api changes to components,
  Improvements to the docs, etc...
- **_Enhancement_**: Requests for any changes to the build infrastructure for
  `Atlantis`, such as changes to our linting rules, proposing a mono-repo
  structure, requesting changes to our testing tools, etc...

## Write a proposal

**_What should be in a proposal?_**

Please use the [proposal template](https://github.com/GetJobber/atlantis/blob/master/docs/proposals/TEMPLATE.md) 
as a guide for writing proposals.

**_What is the process for submitting a proposal?_**

1. Create a branch named `<component_name>-proposal`
2. Copy the proposal template and place it
   under `docs/proposals/<component_name>/README.md`
3. Fill out the proposal template
4. Submit a PR for the propsoal
5. Gather feedback and iterate on proposal
6. Once approved a maintainer will land the proposal in `master` and they'll
   create an `Issue` ticket to implement the proposal.

## Implement a Proposal

All components should start with a proposal. One of our
[Guiding Principles](#guiding-principles) is to start all components with
documentation. If you would like to implement a component, that does not have a
proposal, please see [Write a proposal](#write-a-proposal).

**_What's the process?_**

The process for implementing a proposal is the same as the process for
[contributing code](#contributing-code) of any kind, but make sure to delete the
`propsoal` doc as part of the implementation Pull Request.

## Contributing Code

The process for contributing code is fairly simple.

1. Indicate on the issue that you are going to take on making the change
2. Fork `Atlantis` and begin making your changes
3. Submit a PR against `Atlantis` describing the changes you made, and
   referencing the Issue that you are trying to solve.
4. Once approved a maintainer will land the proposal in `master`

# Guiding Principles

1. Documentation First

   We believe that starting with solid documentation that describes the problem
   a component is trying to solve will lead to better written, and more generic
   components.

2. Encapsulation is important

   Your components should do everything possible to avoid anyone needing to know
   how they work. Limit the APIs to only the ones you absolutely have to expose,
   the larger your API the harder it will be to change a component.

3. Semantics over descriptions

   As much as possible, we want all our APIs to be represented as meaningful
   properties, and not descriptive ones.

   For Example:

   ```jsx
   //Descriptive
   <Button color=Color.red/>

   //Semantic
   <Button type=ButtonType.dangerous/>
   ```

   _This helps us ensure that we can change our internal style without breaking
   API changes._

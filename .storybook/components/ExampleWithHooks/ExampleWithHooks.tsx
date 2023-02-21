import React, { ReactElement } from 'react'

interface ExampleWithHooksProps {
  readonly children: () => void | ReactElement
}

/**
 * Render function children inside the Storybook Canvas
 */
export function ExampleWithHooks({ children }: ExampleWithHooksProps) {
  return children()
}

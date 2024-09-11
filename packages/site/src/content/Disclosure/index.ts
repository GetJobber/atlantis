import Content from './Disclosure.stories.mdx'
import Props from './Disclosure.props.json'
import { Disclosure } from '@jobber/components'

export default {
    content: Content,
    props: Props,
    component: {
        element: Disclosure,
        props: { label: 'Disclosure' },
        code: `<Disclosure title="Disclosure">Here are the details contained within the disclosure</Disclosure>`,
        defaultProps:{ strings: { label: 'Disclosure!' } }
    },
    title: 'Disclosure',
    description: 'Disclosure is neater.',
    links: [
        {
            label: 'Disclosure Storybook',
            url: 'http://localhost:6006/?path=/docs/components-utilities-animatedswitcher-web--docs'
        },
    ]
}
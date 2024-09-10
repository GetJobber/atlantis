import Content from './Chip.content.mdx'
import Props from './Chip.props.json'
import { Chip } from '@jobber/components'

export default {
    content: Content,
    props: Props,
    component: {
        element: Chip,
        props: { label: 'Chip' },
        code: `<Chip label="Chip" />`,
        defaultProps:{ strings: { label: 'Chip!' } }
    },
    title: 'Chip',
    description: 'Chip is neat.',
    links: [
        {
            label: 'Chip Storybook',
            url: 'http://localhost:6006/?path=/docs/components-utilities-animatedswitcher-web--docs'
        },
    ]
}
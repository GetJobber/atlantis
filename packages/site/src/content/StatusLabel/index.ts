import Content from './StatusLabel.stories.mdx'
import Props from './StatusLabel.props.json'
import { StatusLabel } from '@jobber/components'

export default {
    content: Content,
    props: Props,
    component: {
        element: StatusLabel,
        props: { label: 'StatusLabel' },
        code: `<StatusLabel label="StatusLabel" />`,
        defaultProps:{ strings: { label: 'StatusLabel!' } }
    },
    title: 'StatusLabel',
    description: 'StatusLabel is neater.',
    links: [
        {
            label: 'StatusLabel Storybook',
            url: 'http://localhost:6006/?path=/docs/components-utilities-animatedswitcher-web--docs'
        },
    ]
}
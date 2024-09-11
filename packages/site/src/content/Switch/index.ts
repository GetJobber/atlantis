import Content from './Switch.stories.mdx'
import Props from './Switch.props.json'
import { Switch } from '@jobber/components'

export default {
    content: Content,
    props: Props,
    component: {
        element: Switch,
        props: {  },
        code: `<Switch />`,
        defaultProps:{  }
    },
    title: 'Switch',
    subtitle: 'Switch is cool too I guess',
    links: [
        {
            label: 'Switch Storybook',
            url: 'http://localhost:6006/?path=/story/components-selections-switch-web--basic'
        },
    ]
}
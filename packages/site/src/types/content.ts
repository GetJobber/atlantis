export interface SiteContentItem {
    content: any
    props: any
    component: {
        element: any
        props: any
        code: string
        defaultProps: any
    }
    title: string
    description: string
    links: {
        label: string
        url: string
    }[]
}
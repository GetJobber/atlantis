# Component Name

The `ThumbnailGallery` component will accept a list of attachments for images
and display them as thumbnails. This would also have an option to show the
images in a LightBox component on click of those images.

## Accessibility

Assistive technology should be able to see the images and know the image name
based on the `name` property of each attachment.

## Responsiveness & Mobile

This component show maximum number of images possible in a line and show the
count of images left to show.

## Wireframe

[mockup](mockup.png)

## Interface

```
<ThumbnailGallery
    attachments={[{
            name: "filename.png",
            url: "https://url-to-that-image"
            type: "image/png"
            size: 12345
`   }]}
    openGalleryOnClick=true|false
/>
```

Internally ThumbnailGallery would look like this along with some style details

```
{attachemnts && attachments.map(attachment => {
    return (<FormatFile file={{
                name: attachment.name
                src:attachment.url
                type:"image/png"
                size: 213402324,
                src: () => Promise.resolve("https://url-to-that-image")
                progress: 1
            }}/>);
})}
```

## Props Table

| name               | type    | default | description                                                                     |
| ------------------ | ------- | ------- | ------------------------------------------------------------------------------- |
| attachments        | Array   | -       | Accepts a list of details about the images                                      |
| openGalleryOnClick | Boolean | true    | A flag to determine if images should be shown in a LightBox or not when clicked |

## Future possible props

For future iteration, we could make this component accept a `wrap` boolean prop
that would give the flexibility to allow images to overflow to more than one
line.

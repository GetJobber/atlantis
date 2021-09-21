# Component Name

The `Gallery` component will accept an array of files and display them as
thumbnails for images, other file types will instead display a generic icon
corresponding to the file type. This would also have an option to show the
images in a LightBox component on click of those images.

## Accessibility

We will support navigation through the items with tab and shift-tab. Since we
cannot guarantee the `name` value passed in will be readable or useful, instead
the alt value should reference the total number of files in the gallery and
which file the user is currently focused on.

eg. `alt=[1 of 4] attached files`

Since the non-images will not be an actual thumbnail, rather some markup, we can
use the `role=img` and `alt=...` attributes

Triggering the onclick equivalent action should also be accessible via "space"
and "return".

## Responsiveness & Mobile

This component show maximum number of images possible in a line and show the
count of images left to show.

We are not currently looking to make this support a full page width version. Our
usages as of now are limted to a static size of about 56px per thumbnail, and
the spacing designs are for that. Allowing options for adjusting the size could
be a future iteration.

## Wireframe

[mockup](mockup.png)

## Interface

```
<Gallery
    attachments={[{
            name: "filename.png",
            url: "https://url-to-that-image"
            type: "image/png"
            size: 12345
`   }]}
/>
```

Internally Gallery would look like this along with some style details

```
{attachemnts && attachments.map(attachment => {
    return (<FormatFile file={{
                name: attachment.name
                type:"image/png"
                size: 213402324,
                src: () => Promise.resolve("https://url-to-that-image")
                progress: 1
            }}/>);
})}
```

## Props Table

| name        | type  | default | description                                |
| ----------- | ----- | ------- | ------------------------------------------ |
| attachments | Array | -       | Accepts a list of details about the images |

## Future possible props

For future iteration, we could make this component accept a `wrap` boolean prop
that would give the flexibility to allow images to overflow to more than one
line.

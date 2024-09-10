import { SiteContentItem } from '../types/content'
import ButtonContent from './Button'
import ChipContent from './Chip'

export const SiteContent: Record<string, SiteContentItem> = {
    Button: {
        ...ButtonContent
    },
    Chip: {
        ...ChipContent
    }
}
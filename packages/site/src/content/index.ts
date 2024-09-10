import { SiteContentItem } from '../types/content'
import ButtonContent from './Button'
import ChipContent from './Chip'
import StatusLabelContent from './StatusLabel'
import SwitchContent from './Switch'

export const SiteContent: Record<string, SiteContentItem> = {
    Button: {
        ...ButtonContent
    },
    Chip: {
        ...ChipContent
    },
    StatusLabel: {
        ...StatusLabelContent
    },
    Switch: {
        ...SwitchContent
    }
}
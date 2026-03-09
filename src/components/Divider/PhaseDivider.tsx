/**
 * @deprecated Use Divider with a `label` prop instead. This alias exists for backwards compatibility.
 */
import { Divider } from './Divider'

type Props = {
  label: string
  className?: string
}

export function PhaseDivider({ label, className = '' }: Props) {
  return <Divider label={label} labelAlign="center" className={className} />
}

import { Button } from "@/components/ui/button"
import { IconDeviceDesktop } from "@tabler/icons-react"

const AudienceBadge = () => {
  return (
    <Button className="flex items-center gap-2 px-4">
      <IconDeviceDesktop />
      <span>Lorem ipsum dolor sit.</span>
    </Button>
  )
}

export default AudienceBadge
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { IconBrandLinkedin } from '@tabler/icons-react'

interface CoFounderCardProps {
    founder: {
        name: string;
        title: string;
        description: string;
        url: string;
        image: string;
    }
}

const CoFounderCard = ({ founder }: CoFounderCardProps) => {
    return (
        <Card className="relative mx-auto w-full max-w-md py-2 bg-muted pt-0 gap-4">
            <img
                src={founder.image}
                alt="Person cover"
                className="relative z-20 aspect-video w-full object-contain rounded-xl bg-[#D7D7D7]"
            />
            <CardHeader className='px-3'>
                <CardTitle className="space-y-1">
                    <p className='font-medium text-xl'>{founder.name}</p>
                    <p className="text-muted-foreground font-extralight">{founder.title}</p>
                </CardTitle>
                <CardDescription className='text-black my-3'>
                    {founder.description}
                </CardDescription>
            </CardHeader>
            <CardFooter className='px-3'>
                <Button size="icon-sm" asChild>
                    <a href={founder.url}>
                        <IconBrandLinkedin />
                    </a>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default CoFounderCard
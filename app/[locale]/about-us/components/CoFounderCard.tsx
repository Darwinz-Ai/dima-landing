import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { IconBrandLinkedin } from '@tabler/icons-react'

const CoFounderCard = () => {
    return (
        <Card className="relative mx-auto w-full max-w-md pt-0">
            <img
                src="https://avatar.vercel.sh/shadcn1"
                alt="Person cover"
                className="relative z-20 aspect-video w-full object-cover grayscale 0 rounded-xl h-[300px]"
            />
            <CardHeader>

                <CardTitle className="space-y-1">
                    <p>Mohy Aboualam</p>
                    <p className="text-muted-foreground font-light">Co-founder & CEO</p>
                </CardTitle>
                <CardDescription>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi dolorum fuga minus voluptate aut ab reiciendis, voluptatibus reprehenderit nemo perferendis unde ipsum amet cum numquam quis, inventore expedita ut quisquam?
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Button size="icon-sm" asChild>
                    <a href="https://www.linkedin.com/company/thedar-ai/">
                        <IconBrandLinkedin />
                    </a>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default CoFounderCard
import { Card, CardDescription } from "@/components/ui/card"

const TeamCard = () => {
    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0 shadow-none border-none gap-2">
            <img
                src="https://avatar.vercel.sh/shadcn1"
                alt="Person cover"
                className="relative z-20 aspect-video w-full object-cover grayscale rounded-xl h-[420px]"
            />
            <CardDescription className="bg-muted p-4 rounded-xl">
                <div className="flex justify-between items-center text-black">
                    <p>Name</p>
                    <p>Title</p>
                </div>
            </CardDescription>
        </Card>
    )
}

export default TeamCard
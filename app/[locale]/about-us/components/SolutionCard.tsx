import { IconBellFilled } from "@tabler/icons-react"

const SolutionCard = () => {
    return (
        <article className="min-h-[285px] flex flex-col justify-between p-6 rounded-2xl shadow-lg ">
            <div className="flex justify-center items-center rounded-full w-12 h-12 bg-blue-500 shadow-lg shadow-blue-500">
                <IconBellFilled className="text-white" />
            </div>

            <div className="space-y-3">
                <p className="text-2xl font-medium">Social Listening</p>
                <p>Text</p>
            </div>
        </article>
    )
}

export default SolutionCard
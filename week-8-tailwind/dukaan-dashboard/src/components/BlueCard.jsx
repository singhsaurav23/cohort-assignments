export const BlueCard = ({
    title,
    orderCount,
    amount
}) => {
    return <div className="overflow-hdden rounded shadow-md text-white-500">
        <div className="p-5 shadow-custom grid gap-y-4 bg-blue-700 hover:bg-blue-750">
        <div className="flex items-center">
            {title}

            <div className="pl-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                    </svg>
            </div>

        </div>
        <div className="flex justify-between items-center">
            <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="36">
                    <text x="0" y="22.5" font-size="24px" font-family="Arial" fill="white">&#x20B9;</text>
                </svg>

                <div className="font-medium text-3xl">
                    {amount}
                </div>
            </div>
            {orderCount ? <div className="flex font-normal text-base cursor-pointer">
                <div className="underline">
                    {orderCount} orders
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </div> : null}
            </div>
        </div>
        <div className="text-sm bg-blue-900 flex justify-between py-2 px-6 items-center">
        <div>
            {title} date:
        </div>
        <div>
        Today, 04:00 PM
            </div>
        </div>
    </div>
}

export default function Temp(){
    return (
        <div class="bg-gray-900 text-white flex items-center justify-center min-h-screen">
    <div class="text-center">
        <div class="mb-4">
            <span class="bg-gray-800 text-gray-400 px-2 py-1 rounded-full text-sm">Free plan • <a href="#" class="text-blue-500">Upgrade</a></span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold mb-8 flex items-center justify-center">
            <span class="text-orange-500 mr-2">✴️</span> How was your day, SUMIT?
        </h1>
        <div class="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center justify-between w-full max-w-2xl mx-auto">
            <span class="text-gray-400">How can I help you today?</span>
            <div class="flex items-center space-x-2">
                <button class="bg-gray-700 text-gray-400 p-2 rounded-full">
                    <i class="fas fa-plus"></i>
                </button>
                <button class="bg-gray-700 text-gray-400 p-2 rounded-full">
                    <i class="fas fa-feather-alt"></i>
                </button>
            </div>
            <div class="flex items-center space-x-2">
                <span class="text-gray-400">Claude 3.7 Sonnet</span>
                <button class="bg-brown-500 text-white p-2 rounded-full">
                    <i class="fas fa-arrow-up"></i>
                </button>
            </div>
        </div>
    </div>
</div>
    )
}
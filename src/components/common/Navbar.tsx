import logo from '@/assets/logo.webp'

export const Navbar = () => {
    return (
        <nav className="bg-white border-gray-200 shadow-lg">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={logo} className="h-16" alt="Flowbite Logo" />
                </a>
            </div>
        </nav>

    )
}
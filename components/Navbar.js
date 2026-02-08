// // "use client"
// // import { useState } from 'react';
// // import { usePathname } from 'next/navigation';
// // import { Menu, X } from 'lucide-react';
// // import Link from 'next/link';
// // import Image from 'next/image';

// // const Navbar = () => {
// //     const [isOpen, setIsOpen] = useState(false);
// //     const pathname = usePathname();
// //     const isHome = pathname === '/';

// //     const navLinks = [
// //         { name: 'Home', href: '/' },
// //         { name: 'About', href: '#about' },
// //         { name: 'Services', href: '/services' },
// //         { name: 'Contact', href: '/contact' },
// //         { name: 'Login', href: '/login' },
// //         { name: 'Register', href: '/register' },
// //     ];

// //     const scrollToSection = (id) => {
// //         if (!isHome) return;
// //         const element = document.getElementById(id);
// //         if (element) element.scrollIntoView({ behavior: 'smooth' });
// //         setIsOpen(false);
// //     };

// //     return (
// //         <nav className="bg-white shadow-md fixed w-full z-50">
// //             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //                 <div className="flex justify-between h-16">
// //                     <Link href="/" className="flex items-center">
// //                         <Image src="/logo.png" alt="Logo" width={150} height={40} className="h-10 w-auto" priority />
// //                     </Link>
// //                     <div className="md:hidden flex items-center space-x-4">
// //                         <Link 
// //                             href="/login" 
// //                             className="text-sm font-semibold text-gray-700 hover:text-blue-600"
// //                         >
// //                             Login
// //                         </Link>
// //                         <Link 
// //                             href="/register" 
// //                             className="text-sm font-semibold text-gray-700 hover:text-blue-600"
// //                         >
// //                             Register
// //                         </Link>
// //                         {/* <button 
// //                             onClick={() => setIsOpen(!isOpen)}
// //                             className="text-gray-700 p-1 outline-none"
// //                         >
// //                             {isOpen ? <X size={28} /> : <Menu size={28} />}
// //                         </button> */}
// //                     </div>

// //                     {/* Desktop Menu */}
// //                     <div className="hidden md:flex items-center space-x-8">
// //                         {navLinks.map((link) => (
// //                             <Link
// //                                 key={link.name}
// //                                 href={link.href || '#'}
// //                                 className={`text-gray-700 hover:text-[#0056be] ${pathname === link.href ? 'text-brand-blue font-semibold' : ''}`}
// //                             >
// //                                 {link.name}
// //                             </Link>
// //                         ))}

// //                         {/* {isHome ? (
// //                             <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-brand-blue">About</button>
// //                         ) : (
// //                             <Link href="/#about" className="text-gray-700 hover:text-brand-blue">About</Link>
// //                         )} */}
// //                     </div>

// //                     {/* Mobile Toggle */}
// //                     <div className="md:hidden flex items-center">
// //                         <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X size={24} /> : <Menu size={24} />}</button>
// //                     </div>
// //                 </div>
// //             </div>

// //             {/* Mobile Menu */}
// //             {isOpen && (
// //                 <div className="md:hidden bg-white border-t p-4 space-y-2">
// //                     {navLinks.map((link) => (
// //                         <Link
// //                             key={link.name}
// //                             href={link.href || '#'}
// //                             onClick={() => setIsOpen(false)}
// //                             className="block py-2 text-gray-700"
// //                         >
// //                             {link.name}
// //                         </Link>
// //                     ))}
// //                 </div>
// //             )}
// //         </nav>
// //     );
// // };

// // export default Navbar;

// "use client"
// import { useState, useEffect } from 'react';
// import { usePathname, useRouter } from 'next/navigation';
// import { Menu, X } from 'lucide-react';
// import Link from 'next/link';
// import Image from 'next/image';
// import toast from 'react-hot-toast';

// const Navbar = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const pathname = usePathname();
//     const router = useRouter();
//     const isHome = pathname === '/';

//     // Check authentication status on mount
//     useEffect(() => {
//         const checkAuth = async () => {
//             try {
//                 const res = await fetch('/api/auth/verify', {
//                     method: 'GET',
//                     credentials: 'include',
//                 });
//                 setIsAuthenticated(res.ok);
//             } catch (error) {
//                 setIsAuthenticated(false);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         checkAuth();
//     }, [pathname]); // Re-check when pathname changes

//     const handleLogout = async () => {
//         try {
//             const res = await fetch('/api/auth/logout', {
//                 method: 'POST',
//                 credentials: 'include',
//             });

//             if (res.ok) {
//                 toast.success('Logged out successfully');
//                 setIsAuthenticated(false);
//                 router.push('/');
//                 router.refresh();
//             } else {
//                 toast.error('Logout failed');
//             }
//         } catch (error) {
//             toast.error('An error occurred');
//         }
//     };

//     // Navigation links for non-authenticated users
//     const guestLinks = [
//         { name: 'Home', href: '/' },
//         { name: 'About', href: '#about' },
//         { name: 'Services', href: '/services' },
//         { name: 'Contact', href: '/contact' },
//         { name: 'Login', href: '/login' },
//         { name: 'Register', href: '/register' },
//     ];

//     // Navigation links for authenticated users
//     const authLinks = [
//         { name: 'Home', href: '/' },
//         { name: 'About', href: '#about' },
//         { name: 'Services', href: '/services' },
//         { name: 'Contact', href: '/contact' },
//         { name: 'Dashboard', href: '/dashboard' },
//     ];

//     const navLinks = isAuthenticated ? authLinks : guestLinks;

//     const scrollToSection = (id) => {
//         if (!isHome) return;
//         const element = document.getElementById(id);
//         if (element) element.scrollIntoView({ behavior: 'smooth' });
//         setIsOpen(false);
//     };

//     return (
//         <nav className="bg-white shadow-md fixed w-full z-50">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex justify-between h-16">
//                     <Link href="/" className="flex items-center">
//                         <Image src="/logo.png" alt="Logo" width={150} height={40} className="h-10 w-auto" priority />
//                     </Link>

//                     {/* Mobile Quick Links */}
//                     <div className="md:hidden flex items-center space-x-4">
//                         {!loading && (
//                             <>
//                                 {isAuthenticated ? (
//                                     <>
//                                         <Link 
//                                             href="/dashboard" 
//                                             className="text-sm font-semibold text-gray-700 hover:text-blue-600"
//                                         >
//                                             Dashboard
//                                         </Link>
//                                         <button
//                                             onClick={handleLogout}
//                                             className="text-sm font-semibold text-gray-700 hover:text-red-600"
//                                         >
//                                             Logout
//                                         </button>
//                                     </>
//                                 ) : (
//                                     <>
//                                         <Link 
//                                             href="/login" 
//                                             className="text-sm font-semibold text-gray-700 hover:text-blue-600"
//                                         >
//                                             Login
//                                         </Link>
//                                         <Link 
//                                             href="/register" 
//                                             className="text-sm font-semibold text-gray-700 hover:text-blue-600"
//                                         >
//                                             Register
//                                         </Link>
//                                     </>
//                                 )}
//                             </>
//                         )}
//                     </div>

//                     {/* Desktop Menu */}
//                     <div className="hidden md:flex items-center space-x-8">
//                         {!loading && (
//                             <>
//                                 {navLinks.map((link) => (
//                                     <Link
//                                         key={link.name}
//                                         href={link.href || '#'}
//                                         className={`text-gray-700 hover:text-[#0056be] ${pathname === link.href ? 'text-brand-blue font-semibold' : ''}`}
//                                     >
//                                         {link.name}
//                                     </Link>
//                                 ))}
                                
//                                 {isAuthenticated && (
//                                     <button
//                                         onClick={handleLogout}
//                                         className="text-gray-700 hover:text-red-600 font-medium"
//                                     >
//                                         Logout
//                                     </button>
//                                 )}
//                             </>
//                         )}
//                     </div>

//                     {/* Mobile Toggle */}
//                     <div className="md:hidden flex items-center">
//                         <button onClick={() => setIsOpen(!isOpen)}>
//                             {isOpen ? <X size={24} /> : <Menu size={24} />}
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Mobile Menu */}
//             {isOpen && (
//                 <div className="md:hidden bg-white border-t p-4 space-y-2">
//                     {!loading && (
//                         <>
//                             {navLinks.map((link) => (
//                                 <Link
//                                     key={link.name}
//                                     href={link.href || '#'}
//                                     onClick={() => setIsOpen(false)}
//                                     className="block py-2 text-gray-700 hover:text-blue-600"
//                                 >
//                                     {link.name}
//                                 </Link>
//                             ))}
                            
//                             {isAuthenticated && (
//                                 <button
//                                     onClick={() => {
//                                         handleLogout();
//                                         setIsOpen(false);
//                                     }}
//                                     className="block py-2 text-gray-700 hover:text-red-600 w-full text-left"
//                                 >
//                                     Logout
//                                 </button>
//                             )}
//                         </>
//                     )}
//                 </div>
//             )}
//         </nav>
//     );
// };

// export default Navbar;

"use client"
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();
    const router = useRouter();
    const isHome = pathname === '/';

    // Check authentication status on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/auth/check-auth', {
                    method: 'GET',
                    credentials: 'include',
                });
                setIsAuthenticated(res.ok);
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [pathname]); // Re-check when pathname changes

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (res.ok) {
                toast.success('Logged out successfully');
                setIsAuthenticated(false);
                router.push('/');
                router.refresh();
            } else {
                toast.error('Logout failed');
            }
        } catch (error) {
            toast.error('An error occurred');
        }
    };

    // Navigation links for non-authenticated users
    const guestLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '/services' },
        { name: 'Contact', href: '/contact' },
        { name: 'Login', href: '/login' },
        { name: 'Register', href: '/register' },
    ];

    // Navigation links for authenticated users
    const authLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '/services' },
        { name: 'Contact', href: '/contact' },
        { name: 'Dashboard', href: '/dashboard' },
    ];

    const navLinks = isAuthenticated ? authLinks : guestLinks;

    const scrollToSection = (id) => {
        if (!isHome) return;
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
    };

    return (
        <nav className="bg-white shadow-md fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <Link href="/" className="flex items-center">
                        <Image src="/logo.png" alt="Logo" width={150} height={40} className="h-10 w-auto" priority />
                    </Link>

                    {/* Mobile Quick Links */}
                    <div className="md:hidden flex items-center space-x-4">
                        {!loading && (
                            <>
                                {isAuthenticated ? (
                                    <>
                                        <Link 
                                            href="/dashboard" 
                                            className="text-sm font-semibold text-gray-700 hover:text-blue-600"
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="text-sm font-semibold text-gray-700 hover:text-red-600"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link 
                                            href="/login" 
                                            className="text-sm font-semibold text-gray-700 hover:text-blue-600"
                                        >
                                            Login
                                        </Link>
                                        <Link 
                                            href="/register" 
                                            className="text-sm font-semibold text-gray-700 hover:text-blue-600"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </>
                        )}
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {!loading && (
                            <>
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href || '#'}
                                        className={`text-gray-700 hover:text-[#0056be] ${pathname === link.href ? 'text-brand-blue font-semibold' : ''}`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                
                                {isAuthenticated && (
                                    <button
                                        onClick={handleLogout}
                                        className="text-gray-700 hover:text-red-600 font-medium"
                                    >
                                        Logout
                                    </button>
                                )}
                            </>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t p-4 space-y-2">
                    {!loading && (
                        <>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href || '#'}
                                    onClick={() => setIsOpen(false)}
                                    className="block py-2 text-gray-700 hover:text-blue-600"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            
                            {isAuthenticated && (
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsOpen(false);
                                    }}
                                    className="block py-2 text-gray-700 hover:text-red-600 w-full text-left"
                                >
                                    Logout
                                </button>
                            )}
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;

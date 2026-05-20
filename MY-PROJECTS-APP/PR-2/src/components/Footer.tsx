const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white mt-16">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Info Tech
                        </h2>
                        <p className="text-gray-400 mt-2 max-w-md">
                            Join thousands of developers building amazing things with our platform.
                        </p>
                        <div className="flex gap-4 mt-4">
                            {/* Social Icons */}
                            {["twitter", "github", "linkedin", "facebook"].map(social => (
                                <div key={social} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                                    <span className="text-sm capitalize">{social[0]}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-semibold mb-3">Product</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li className="hover:text-white cursor-pointer">Features</li>
                            <li className="hover:text-white cursor-pointer">Pricing</li>
                            <li className="hover:text-white cursor-pointer">Documentation</li>
                            <li className="hover:text-white cursor-pointer">API</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-3">Company</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li className="hover:text-white cursor-pointer">About</li>
                            <li className="hover:text-white cursor-pointer">Blog</li>
                            <li className="hover:text-white cursor-pointer">Careers</li>
                            <li className="hover:text-white cursor-pointer">Contact</li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="border-t border-gray-800 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © 2024 Info Tech. All rights reserved.
                        </p>

                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
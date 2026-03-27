
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HowItWorks() {
    const sections = [
        { id: "how-to-bid", title: "How to Bid" },
        { id: "payment-methods", title: "Payment Methods and Deadlines" },
        { id: "logistics", title: "Logistics Assistance" },
        { id: "customer-service", title: "Customer Service" },
    ];

    return (
        // <div className="min-h-screen bg-[#F8FAFC] font-sans tracking-tight">
        <div className="container mx-auto px-4 py-12">

            {/* Header Section */}
            <div className="bg-white rounded-[2rem] p-8 lg:p-12 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 mb-8 overflow-hidden relative">

                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    {/* Text Content */}
                    <div className="lg:w-1/2 z-10 relative">
                        <div className="inline-block px-3 py-1 bg-[#1b4332]/5 text-[#1b4332] rounded-full text-sm font-bold mb-6 tracking-wide">
                            Since 2024
                        </div>
                        <h1 className="text-3xl lg:text-[42px] font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
                            About Our Platform
                        </h1>
                        <p className="text-gray-600 leading-relaxed text-lg mb-8 max-w-2xl">
                            Aiming to revolutionize agricultural trade in Nepal, our platform connects sugarcane farmers directly with buyers, sugar mills, and local businesses. We strive to provide awesome deals, a wide variety of crop listings, and dependable, fast service. New listings are added daily. Auctions always start with no reserve. Get the harvest you need, securely and transparently!
                        </p>
 
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { title: "Daily", desc: "Fresh sugarcane added regularly" },
                                { title: "No reserve", desc: "Auctions offer true market value" },
                            ].map((stat, i) => (
                                <div key={i} className="bg-[#1b4332]/5 rounded-2xl p-5 border border-[#1b4332]/5">
                                    <h3 className="text-xl font-bold text-[#1b4332] mb-1">{stat.title}</h3>
                                    <p className="text-[#1b4332]/80 text-sm leading-snug">{stat.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
 
                    {/* Image Hero Area */}
                    <div className="lg:w-1/2 w-full relative min-h-[400px] lg:min-h-[450px] rounded-3xl overflow-hidden shadow-sm group">
                        {/* Optional Gradient Overlay for text readability if you ever put text on it */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#1b4332]/20 to-transparent z-10 pointer-events-none"></div>
 
                        <Image
                            src="/image.png"
                            alt="Sugarcane auction platform overview"
                            fill
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                            priority
                        />
 
                        {/* Decorative Badge overlaying image */}
                        {/* <div className="absolute bottom-6 right-6 z-20 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/20 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#1b4332]/5 flex items-center justify-center font-black text-[#1b4332] text-xl">
                                    100+
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">Active Farmers</p>
                                    <p className="text-gray-500 text-xs">Trading daily</p>
                                </div>
                            </div> */}
                    </div>
                </div>
            </div>
 
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content */}
                <div className="lg:w-[68%] space-y-8">
 
                    {/* How to Shop / Bid */}
                    <section id="how-to-bid" className="bg-white rounded-[2rem] p-8 lg:p-10 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 scroll-mt-24">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">How to Bid</h2>
                        <p className="text-gray-500 mb-6 font-medium text-[15px]">A quick guide to online bidding and purchasing works</p>
 
                        <div className="space-y-4 text-gray-600 leading-relaxed text-[15.5px] mb-8">
                            <p>
                                Register through the website to participate in our auctions. First, we use a proxy bidding process. This means the system will bid incrementally on your behalf up to your maximum bid, while keeping that amount private from other users.
                            </p>
                            <p>
                                For example, if your maximum bid is Rs. 500 per quintal, and the closest highest bid is only Rs. 400 when the auction closes, you will win the auction for Rs. 405 (or the next increment). Your maximum bid is kept strictly confidential. You must be a verified registered user to participate.
                            </p>
                        </div>
 
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-[#1b4332]/5 rounded-2xl p-6 border border-[#1b4332]/5">
                                <h4 className="font-bold text-[#1b4332] mb-2">Proxy bidding</h4>
                                <p className="text-[#1b4332]/80 text-[14px] leading-relaxed">Bid confidently while the system raises your offer only as much as needed to stay competitive.</p>
                            </div>
                            <div className="bg-[#1b4332]/5 rounded-2xl p-6 border border-[#1b4332]/5">
                                <h4 className="font-bold text-[#1b4332] mb-2">Direct Purchases</h4>
                                <p className="text-[#1b4332]/80 text-[14px] leading-relaxed">Some harvests feature a Buy Now option allowing you to bypass the auction and secure it instantly.</p>
                            </div>
                        </div>
                    </section>
 
                    {/* Payment Methods */}
                    <section id="payment-methods" className="bg-white rounded-[2rem] p-8 lg:p-10 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 scroll-mt-24">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">Payment Methods and Deadlines</h2>
                        <p className="text-gray-500 mb-6 font-medium text-[15px]">Accepted payment options, taxes, and payment deadlines</p>
 
                        <div className="space-y-5">
                            {[
                                "Pay in person: with cash, at the time of harvest collection. We create the invoice for you when the auction ends.",
                                "Digital Wallets: eSewa, Khalti available for pre-pay checkout through our secure portal.",
                                "Bank Transfer: Direct bank deposits via ConnectIPS to the farmer's or platform's verified account.",
                                "Taxes: All applicable taxes as per Nepal Government agricultural guidelines will be added clearly to your invoice.",
                                "All won harvests must be paid for within 7 days of purchase. This allowance lets you arrange transport.",
                                "Items not paid within this timeframe may be canceled and re-listed, which can lead to bidding restrictions.",
                                "After a final warning, unpaid items will be deemed abandoned."
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1b4332]/5 text-[#1b4332] flex items-center justify-center text-[13px] font-bold mt-0.5">
                                        {i + 1}
                                    </span>
                                    <p className="text-gray-600 leading-relaxed text-[15.5px]">{item}</p>
                                </div>
                            ))}
                        </div>
                    </section>
 
                    {/* Logistics Assistance */}
                    <section id="logistics" className="bg-white rounded-[2rem] p-8 lg:p-10 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 scroll-mt-24">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">Logistics Assistance</h2>
                        <p className="text-gray-500 mb-6 font-medium text-[15px]">What customers should know about transport</p>
 
                        <div className="space-y-5">
                            {[
                                "While buyers generally handle their own transportation, we connect you with local transport partners.",
                                "Logistics partners operate across major sugarcane-producing districts (e.g., Sarlahi, Bara, Rautahat).",
                                "Transportation costs are negotiated directly with the freight providers depending on distance and harvest weight.",
                                "Due to the bulk nature of sugarcane crops, we do not provide flat-rate nationwide shipping.",
                                "We recommend arriving during daylight hours at the farm to allow time for cutting, weighing, and loading."
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1b4332]/5 text-[#1b4332] flex items-center justify-center text-[13px] font-bold mt-0.5">
                                        {i + 1}
                                    </span>
                                    <p className="text-gray-600 leading-relaxed text-[15.5px]">{item}</p>
                                </div>
                            ))}
                        </div>
                    </section>
 
                    {/* Customer Service */}
                    <section id="customer-service" className="bg-white rounded-[2rem] p-8 lg:p-10 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 scroll-mt-24">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">Customer Service</h2>
                        <p className="text-gray-500 mb-6 font-medium text-[15px]">We stand behind our community</p>
 
                        <div className="space-y-4 text-gray-600 leading-relaxed text-[15.5px]">
                            <p>
                                We pride ourselves on our customer service. If there is ever an issue between a farmer and a buyer, please allow us up to 48 business hours for us to respond to your email or inquiry.
                            </p>
                            <p>
                                We will help resolve any issues that may arise. Our platform is known for bringing fair prices and reliable service to the agricultural sector.
                            </p>
                            <p>
                                Our dedicated team understands the local agricultural landscape and provides service with a smile. Rest assured, if there is ever an issue, our customer service team will work with you to make it right.
                            </p>
                        </div>
                    </section>
 
                </div>
 
                {/* Sidebar */}
                <div className="lg:w-[32%] space-y-6">
 
                    {/* Quick Sections */}
                    <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
                        <h3 className="text-[17px] font-bold text-gray-900 mb-4 tracking-tight">Quick sections</h3>
                        <div className="flex flex-col space-y-1">
                            {sections.map(section => (
                                <Link
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-[#1b4332]/5 text-gray-600 hover:text-gray-900 transition-colors text-[14px] font-medium"
                                >
                                    {section.title}
                                    <ChevronRight className="w-[18px] h-[18px] text-[#1b4332]" />
                                </Link>
                            ))}
                        </div>
                    </div>
 
                    {/* Need Help */}
                    <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
                        <h3 className="text-[17px] font-bold text-gray-900 mb-6 tracking-tight">Need help?</h3>
 
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-[14px] font-bold text-gray-900 mb-1.5">Email us</h4>
                                <div className="bg-[#1b4332]/5 text-[#1b4332] inline-block px-3 py-1.5 rounded-lg text-[13px] font-semibold">
                                    support@auction.com
                                </div>
                            </div>
 
                            <div>
                                <h4 className="text-[14px] font-bold text-gray-900 mb-1.5">Response time</h4>
                                <p className="text-[14px] text-gray-600">
                                    Up to 48 business hours
                                </p>
                            </div>
 
                            <div>
                                <h4 className="text-[14px] font-bold text-gray-900 mb-1.5">Office hours</h4>
                                <p className="text-[14px] text-gray-600 leading-relaxed">
                                    Sunday - Friday<br />
                                    10:00 AM - 5:00 PM
                                </p>
                            </div>
                        </div>
                    </div>
 
                    {/* Important Deadlines */}
                    <div className="bg-[#1b4332]/5 rounded-[2rem] p-6 lg:p-8 border border-[#1b4332]/5">
                        <h3 className="text-[17px] font-bold text-[#1b4332] mb-3 tracking-tight">Important deadlines</h3>
                        <p className="text-[#1b4332]/80 text-[14px] leading-relaxed mb-6 font-medium">
                            Please pay for all purchased harvests within 7 days to avoid cancellations, relisting, or restrictions on future bidding.
                        </p>
                        <div className="space-y-3">
                            <Link
                                href="#payment-methods"
                                className="block w-full text-center bg-[#1b4332] text-white py-3 px-4 rounded-full text-[14px] font-bold hover:bg-[#153427] transition-colors shadow-sm"
                            >
                                View payment options
                            </Link>
                            <Link
                                href="/register"
                                className="block w-full text-center bg-white text-[#1b4332] py-3 px-4 rounded-full text-[14px] font-bold hover:bg-white/90 transition-colors shadow-sm"
                            >
                                Register to Bid
                            </Link>
                        </div>
                    </div>

                </div>

            </div>
        </div>
        // </div>
    );
}

export default function ContactPage() {
    return (
        <div className="max-w-4xl mx-auto py-12 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Contact Us</h1>
            <p className="text-xl text-gray-600 mb-12">
                Have questions or need assistance? Our team is here to help!
            </p>
            <div className="bg-white p-12 rounded-[40px] border border-gray-100 shadow-xl">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Email Support</p>
                <p className="text-2xl font-black text-gray-900 mb-8">support@bidsawsome.com</p>

                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Call Us</p>
                <p className="text-2xl font-black text-gray-900">+977 (123) 456-7890</p>
            </div>
        </div>
    );
}

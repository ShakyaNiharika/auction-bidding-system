export default function HowItWorks() {
    return (
        <div className="max-w-4xl mx-auto py-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8">How it Works</h1>
            <div className="grid gap-12">
                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Register as a Buyer or Seller</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Join our community by creating an account. It's fast, secure, and opens up the world of sugarcane auctions to you.
                    </p>
                </section>
                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">2. List or Discover Listings</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Sellers can list their sugarcane harvests with detailed descriptions, quantities, and starting prices. Buyers can browse these listings to find the best deals.
                    </p>
                </section>
                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Bidding and Winning</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Place your bids and monitor the progress. Our transparent bidding system ensures the best price for both buyers and sellers.
                    </p>
                </section>
            </div>
        </div>
    );
}

import AuctionDetails from "@/components/auction/AuctionDetails";

export default async function AuctionItemPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <main className="bg-white min-h-screen">
            <AuctionDetails id={id} />
        </main>
    );
}

import PinCard from "@/components/PinCard";

  async function PinPage({ params }: { params: { id: string } }) {
    // asynchronous access of `params.id`.
    const { id } = await params
    return <p>ID: {id}</p>
  }

import Container from "@/components/Container";
import StockBreadcrumb from "./_components/StockBreadcrumb";
import StockHeader from "./_components/StockHeader";
import StockChartGrid from "./_components/StockChartGrid";

interface StockPageProps {
  params: Promise<{ symbol: string }>;
}

export default async function StockPage({ params }: StockPageProps) {
  const { symbol } = await params; // ✅ unwrap pakai await di server component

  return (
    <Container>
      <StockBreadcrumb symbol={symbol} />
      <StockHeader symbol={symbol} />
      <hr className="border-t border-[#1a1a1a] mb-10" />
      <StockChartGrid symbol={symbol} />
    </Container>
  );
}

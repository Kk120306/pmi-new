import { PresentationType } from '@prisma/client';
import PresentationCollection from '@/app/ui/research/PresentationCollection';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Slides | Pacific Market Insights',
    description:
        'Explore presentation-led equity research from Pacific Market Insights.',
};

const SlidesPage = () => (
    <PresentationCollection
        type={PresentationType.SLIDES}
        eyebrow="Presentation research"
        title="Slides"
        introduction="Focused, visual research that turns market data, valuation work, and investment theses into clear presentations built for decision-makers."
    />
);

export default SlidesPage;

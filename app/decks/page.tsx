import { PresentationType } from '@prisma/client';
import PresentationCollection from '@/app/ui/research/PresentationCollection';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Decks | Pacific Market Insights',
    description:
        'Explore long-form research decks from Pacific Market Insights.',
};

const DecksPage = () => (
    <PresentationCollection
        type={PresentationType.DECK}
        eyebrow="Research library"
        title="Decks"
        introduction="Focused, visual research that turns market data, valuation work, and investment theses into clear presentations built for decision-makers."
    />
);

export default DecksPage;

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
        eyebrow="Long-form research"
        title="Decks"
        introduction="Structured research collections that bring company context, market evidence, strategic analysis, and recommendations together in one place."
    />
);

export default DecksPage;

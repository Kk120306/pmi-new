import assert from 'node:assert/strict';
import test from 'node:test';
import { filterPublicAuthors, isPublicAuthor } from '../lib/public-authors';

test('excludes the removed author regardless of identity casing', () => {
    assert.equal(
        isPublicAuthor({
            email: 'LUKE@ADMIN.COM',
            name: 'Different Name',
        }),
        false,
    );
    assert.equal(
        isPublicAuthor({
            email: 'different@example.com',
            name: 'luke delahunty',
        }),
        false,
    );
});

test('preserves every other public author', () => {
    const authors = [
        { email: 'kai@admin.com', name: 'Kai Kameyama' },
        { email: 'luke@admin.com', name: 'Luke Delahunty' },
        { email: 'kyle@admin.com', name: 'Kyle Tsuji' },
    ];

    assert.deepEqual(filterPublicAuthors(authors), [authors[0], authors[2]]);
});

"use client";
import React, { useState, useEffect } from 'react';
import Card from './Card';
import CardSkeleton from './CardSkeleton';

type CardData = {   
    Set: string;
    Number: string;
    Name: string;
    Type: string;
    Aspects: string[];
    Traits: string[];
    Arenas: string[];
    Cost: number;
    Power: number;
    HP: number;
    FrontText: string;
    DoubleSided: boolean;
    Rarity: string;
    Unique: boolean;
    Artist: string;
    VariantType: string;
    MarketPrice: string;
    FoilPrice: string;
    FrontArt: string;
    id: string;
};

type CardListProps = {
    hp: string;
};


/**
 * A component that displays a list of cards, sorted by a specified key.
 * @param {string} hp - The HP value to filter cards by.
 * @returns {JSX.Element} A component that renders a list of cards.
 */

export default function CardList({ hp }: CardListProps) {
    const [cards, setCards] = useState<CardData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [sortKey, setSortKey] = useState<keyof CardData>('Name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        if (!hp) return;
        setLoading(true);
        setError(null);

        async function fetchCards() {
            try {
                const res = await fetch(`/api/search?hp=${hp}&order=${sortKey.toLowerCase()}&direction=${sortDirection}`);
                if (!res.ok) throw new Error('Failed to fetch cards');
                const data = await res.json();
                console.log("|-o-| CL: data", data);

                const formattedCards = Array.isArray(data.data)
                    ? data.data.map((card: CardData) => ({
                        Set: card.Set,
                        Number: card.Number,
                        Name: card.Name,
                        Type: card.Type,
                        Aspects: card.Aspects,
                        Traits: card.Traits,
                        Arenas: card.Arenas,
                        Cost: card.Cost,
                        Power: card.Power,
                        HP: card.HP,
                        FrontText: card.FrontText,
                        DoubleSided: card.DoubleSided,
                        Rarity: card.Rarity,
                        Unique: card.Unique,
                        Artist: card.Artist,
                        VariantType: card.VariantType,
                        MarketPrice: card.MarketPrice,
                        FoilPrice: card.FoilPrice,
                        FrontArt: card.FrontArt,
                        id: `${card.Set}-${card.Number}` // Creating a unique ID using set and number
                    }))
                    : [];

                setCards(formattedCards);
                setLoading(false);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
                setCards([]);
                setLoading(false);
            }
        }
        fetchCards();
    }, [hp, sortKey, sortDirection]);

    function sortCards(key: keyof CardData) {
        if (sortKey === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }
    }
    console.log("|-o-| CL: cards", cards);

    return (
        <section className="p-6">
            <div className="flex justify-center gap-4 mb-6">
                <button onClick={() => sortCards('Name')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Sort by Name {sortKey === 'Name' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                </button>
                <button onClick={() => sortCards('Set')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Sort by Set {sortKey === 'Set' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                </button>
                <button onClick={() => sortCards('Cost')} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                    Sort by Cost {sortKey === 'Cost' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                </button>
                <button onClick={() => sortCards('Power')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Sort by Power {sortKey === 'Power' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                </button>
            </div>
            {loading && <p className="text-center text-lg font-semibold">Loading cards...</p>}
            {error && <p className="text-center text-red-500 text-lg font-semibold">Error: {error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cards.map((card) => (
                    <Card key={card.id} {...card} />
                ))}
                 {loading ? (
                    [...Array(12)].map((_, index) => (
                        <CardSkeleton key={index} />
                    ))
                ) : (
                    cards.map((card) => (
                        <Card key={card.id} {...card} />
                    ))
                )}
            </div>
        </section>
    );
}

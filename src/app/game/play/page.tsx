"use client";

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGame } from '../context/GameContext';
import Phase0_Upload from '../components/Phase0_Upload';
import Phase1_Platformer from '../components/Phase1_Platformer';
import Phase2_Question from '../components/Phase2_Question';
import Phase3_DatePlanner from '../components/Phase3_DatePlanner';
import Phase4_Card from '../components/Phase4_Card';

export default function GameManager() {
    const { state, setCreatorPhoto, setCreatorName } = useGame();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    useEffect(() => {
        // Load Creator Data from MongoDB via API
        if (id) {
            fetch(`/api/game/${id}`)
                .then(res => {
                    if (!res.ok) throw new Error("Game not found");
                    return res.json();
                })
                .then(data => {
                    if (data.creatorPhoto) setCreatorPhoto(data.creatorPhoto);
                    if (data.creatorName) setCreatorName(data.creatorName);
                })
                .catch(err => console.error("Error loading game:", err));
        }
    }, [id, setCreatorPhoto, setCreatorName]);

    // Render based on current phase
    switch (state.currentPhase) {
        case 'upload':
            return <Phase0_Upload />;
        case 'level1':
            return <Phase1_Platformer />;
        case 'question':
            return <Phase2_Question />;
        case 'level2':
            return <Phase3_DatePlanner />;
        case 'card':
            return <Phase4_Card />;
        default:
            return <div>Unknown Phase</div>;
    }
}

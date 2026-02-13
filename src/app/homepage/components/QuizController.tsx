"use client";

import React from 'react';
import ProposalGame from '@/components/game/ProposalGame';

interface QuizControllerProps {
    onClose: () => void;
}

export default function QuizController({ onClose }: QuizControllerProps) {
    return <ProposalGame onClose={onClose} />;
}

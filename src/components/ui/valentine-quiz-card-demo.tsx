import * as React from "react";
import ValentineQuizCard from "@/components/ui/valentine-quiz-card";

const ValentineQuizCardDemo = () => {
    return (
        <div className="flex h-[450px] w-full items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 p-10 dark:from-pink-950 dark:to-purple-950">
            <ValentineQuizCard
                title="How Well Do You Know Each Other?"
                description="Take this fun quiz together and find out who knows their partner better. Perfect for Valentine's Day!"
            />
        </div>
    );
};

export { ValentineQuizCardDemo as DemoOne };

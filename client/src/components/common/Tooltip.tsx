import React from 'react';

type TooltipProps = {
    content: string;
    children: React.ReactNode;
};

const Tooltip = ({ content, children }: TooltipProps) => {
    return (
        <div className="relative group inline-block cursor-default">
            {children}
            <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity z-50">
                {content}
            </div>
        </div>
    );
};

export default Tooltip;

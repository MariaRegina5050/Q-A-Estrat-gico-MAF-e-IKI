
import React, { useState } from 'react';
import { Category, Response } from '../types';
import QuestionItem from './QuestionItem';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { calculateCategoryScore, getPerformanceColor } from '../utils/calculations';

interface CategoryAccordionProps {
  category: Category;
  responses: Record<string, Response>;
  onUpdate: (questionId: string, response: Response) => void;
  defaultOpen?: boolean;
}

const CategoryAccordion: React.FC<CategoryAccordionProps> = ({ 
  category, 
  responses, 
  onUpdate,
  defaultOpen = false 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const score = calculateCategoryScore(category, responses);
  const percentage = (score / 5) * 100;
  const perfColor = getPerformanceColor(percentage);

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-4 text-left">
          <span className="font-heading font-bold text-gaia-dark">{category.title}</span>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full ${perfColor} transition-all duration-500`} 
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-slate-500">{score.toFixed(1)} / 5.0</span>
          </div>
        </div>
        {isOpen ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
      </button>

      {isOpen && (
        <div className="px-6 pb-6 bg-white animate-in slide-in-from-top-2 duration-300">
          {category.questions.map(q => (
            <QuestionItem
              key={q.id}
              question={q}
              response={responses[q.id]}
              onUpdate={(resp) => onUpdate(q.id, resp)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryAccordion;

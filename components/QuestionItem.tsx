
import React from 'react';
import { Question, Response } from '../types';
import { SCORING_LABELS } from '../constants';
import { AlertCircle, Calendar, User } from 'lucide-react';

interface QuestionItemProps {
  question: Question;
  response: Response | undefined;
  onUpdate: (response: Response) => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question, response, onUpdate }) => {
  const currentScore = response?.score || 0;
  const canShowImprovement = currentScore >= 1 && currentScore <= 4;

  const handleScoreSelect = (score: number) => {
    onUpdate({
      ...(response || { canImprove: false }),
      score
    });
  };

  const handleImprovementToggle = () => {
    onUpdate({
      ...(response || { score: 0 }),
      canImprove: !response?.canImprove
    });
  };

  const handleFieldChange = (field: keyof Response, value: any) => {
    onUpdate({
      ...(response || { score: 0, canImprove: true }),
      [field]: value
    });
  };

  return (
    <div className="py-6 border-b border-slate-100 last:border-0">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        <div className="flex-1">
          <p className="text-slate-700 font-medium mb-4 leading-relaxed">{question.text}</p>
          
          <div className="flex flex-wrap gap-2">
            {SCORING_LABELS.map((item) => (
              <button
                key={item.value}
                onClick={() => handleScoreSelect(item.value)}
                className={`
                  px-3 py-1.5 text-xs font-semibold rounded-full border transition-all
                  ${currentScore === item.value 
                    ? 'bg-gaia-teal text-white border-gaia-teal' 
                    : 'bg-white text-slate-500 border-slate-200 hover:border-gaia-teal hover:text-gaia-teal'}
                `}
              >
                {item.value}: {item.label}
              </button>
            ))}
          </div>
        </div>

        {canShowImprovement && (
          <div className="lg:w-80 shrink-0">
            <label className="flex items-center gap-2 text-sm font-semibold text-gaia-teal cursor-pointer mb-3 select-none">
              <input
                type="checkbox"
                checked={response?.canImprove || false}
                onChange={handleImprovementToggle}
                className="w-4 h-4 rounded text-gaia-teal focus:ring-gaia-teal"
              />
              É possível melhorar?
            </label>

            {response?.canImprove && (
              <div className="space-y-3 p-4 bg-gaia-beige/20 rounded-lg border border-gaia-beige animate-in fade-in slide-in-from-top-2 duration-300">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gaia-dark mb-1">Providências</label>
                  <textarea
                    rows={2}
                    value={response?.action || ''}
                    onChange={(e) => handleFieldChange('action', e.target.value)}
                    className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded focus:ring-gaia-teal focus:border-gaia-teal outline-none"
                    placeholder="O que será feito?"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gaia-dark mb-1">Prazo</label>
                    <div className="relative">
                      <Calendar size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="date"
                        value={response?.deadline || ''}
                        onChange={(e) => handleFieldChange('deadline', e.target.value)}
                        className="w-full pl-7 pr-2 py-1.5 text-xs border border-slate-300 rounded focus:ring-gaia-teal focus:border-gaia-teal outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gaia-dark mb-1">Responsável</label>
                    <div className="relative">
                      <User size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={response?.responsible || ''}
                        onChange={(e) => handleFieldChange('responsible', e.target.value)}
                        className="w-full pl-7 pr-2 py-1.5 text-xs border border-slate-300 rounded focus:ring-gaia-teal focus:border-gaia-teal outline-none"
                        placeholder="Nome"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionItem;

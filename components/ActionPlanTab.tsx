
import React from 'react';
import { MAF_CATEGORIES, IKI_CATEGORIES } from '../constants';
import { Response } from '../types';
import { Calendar, User, LayoutList, CheckSquare } from 'lucide-react';

interface ActionPlanTabProps {
  mafResponses: Record<string, Response>;
  ikiResponses: Record<string, Response>;
}

const ActionPlanTab: React.FC<ActionPlanTabProps> = ({ mafResponses, ikiResponses }) => {
  const getActions = (categories: any[], responses: Record<string, Response>, type: 'MAF' | 'IKI') => {
    const actions: any[] = [];
    categories.forEach(cat => {
      cat.questions.forEach((q: any) => {
        const resp = responses[q.id];
        if (resp && resp.canImprove && resp.action) {
          actions.push({
            id: q.id,
            category: cat.title,
            question: q.text,
            action: resp.action,
            deadline: resp.deadline,
            responsible: resp.responsible,
            type
          });
        }
      });
    });
    return actions;
  };

  const mafActions = getActions(MAF_CATEGORIES, mafResponses, 'MAF');
  const ikiActions = getActions(IKI_CATEGORIES, ikiResponses, 'IKI');
  const allActions = [...mafActions, ...ikiActions];

  if (allActions.length === 0) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
          <LayoutList size={32} />
        </div>
        <h3 className="text-xl font-bold text-gaia-dark mb-2">Nenhum plano de ação definido</h3>
        <p className="text-slate-500 max-w-md mx-auto">
          Para perguntas com pontuação entre 1 e 4, você pode marcar "É possível melhorar?" para listar providências específicas aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-heading font-bold text-gaia-dark">Consolidação de Providências</h2>
        <div className="flex gap-3 text-[11px] font-bold">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-sky-100 text-sky-700 rounded-full">
            <div className="w-2 h-2 rounded-full bg-sky-500" /> MAF: {mafActions.length}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">
            <div className="w-2 h-2 rounded-full bg-emerald-500" /> IKI: {ikiActions.length}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {allActions.map((item, idx) => (
          <div key={`${item.id}-${idx}`} className="bg-white rounded-xl border-l-4 border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row" style={{ borderLeftColor: item.type === 'MAF' ? '#0EA5E9' : '#10B981' }}>
            <div className="flex-1 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider ${item.type === 'MAF' ? 'bg-sky-100 text-sky-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {item.type}
                </span>
                <span className="text-[10px] font-bold text-slate-400 truncate uppercase">{item.category}</span>
              </div>
              
              <p className="text-xs font-bold text-slate-500 mb-2 italic">"{item.question}"</p>
              
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <div className="flex items-start gap-3">
                  <CheckSquare size={18} className="text-gaia-teal mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-gaia-dark mb-1">Providência</h4>
                    <p className="text-sm text-slate-700 leading-relaxed">{item.action}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 md:w-64 border-t md:border-t-0 md:border-l border-slate-200 p-5 flex flex-col justify-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-400 border border-slate-200">
                  <Calendar size={14} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Prazo</p>
                  <p className="text-sm font-bold text-gaia-dark">{item.deadline || 'Não definido'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-400 border border-slate-200">
                  <User size={14} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Responsável</p>
                  <p className="text-sm font-bold text-gaia-dark">{item.responsible || 'Não definido'}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionPlanTab;

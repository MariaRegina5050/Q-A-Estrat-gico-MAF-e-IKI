
import { Category, Response } from '../types';

export const calculateCategoryScore = (category: Category, responses: Record<string, Response>) => {
  const categoryQuestions = category.questions;
  let sum = 0;
  let count = 0;

  categoryQuestions.forEach(q => {
    const resp = responses[q.id];
    if (resp && resp.score > 0) {
      sum += resp.score;
      count++;
    }
  });

  return count > 0 ? sum / count : 0;
};

export const calculateTotalWeightedScore = (categories: Category[], responses: Record<string, Response>) => {
  let weightedSum = 0;
  let totalPossibleWeights = 0;

  categories.forEach(cat => {
    const catScore = calculateCategoryScore(cat, responses);
    weightedSum += catScore * cat.weight;
    totalPossibleWeights += cat.weight;
  });

  // Calculate percentage based on max possible score of 5
  const maxPossible = 5 * totalPossibleWeights;
  return maxPossible > 0 ? (weightedSum / maxPossible) * 100 : 0;
};

export const getPerformanceLevel = (percentage: number) => {
  if (percentage >= 80) return 'Forte';
  if (percentage >= 60) return 'Viável';
  if (percentage >= 40) return 'Fraco';
  return 'Inadequado';
};

export const getPerformanceColor = (percentage: number) => {
  if (percentage >= 80) return 'bg-performance-green';
  if (percentage >= 60) return 'bg-performance-yellow';
  if (percentage >= 40) return 'bg-performance-orange';
  return 'bg-performance-red';
};

export const getPerformanceTextColor = (percentage: number) => {
  if (percentage >= 80) return 'text-performance-green';
  if (percentage >= 60) return 'text-performance-yellow';
  if (percentage >= 40) return 'text-performance-orange';
  return 'text-performance-red';
};

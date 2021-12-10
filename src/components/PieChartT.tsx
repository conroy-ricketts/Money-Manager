import React from 'react';
import PieChart from 'react-native-pie-chart';
import { incomeCards, expenseCards } from '../components/PieChartLegend';

interface TypeProps
{
  //0 for income, 1 for expenses
  type: number;
}

export const colorSet: string[] = ['#E41E2F', '#0070CE', '#FFDB2D', '#5DA832', '#9033A8', '#B20000'];

export default function PieChartT({ type }: TypeProps)
{
  const values: number[] = [];
  const colors: string[] = [];

  //lets get 100 different colors for pie chart
  for(let i = 0; i < 100; i++)
    colors.push(colorSet[i % colorSet.length]);

  if(type == 0)
  {
    incomeCards.forEach(function (card) { values.push(card.percentage) });
  }
  else
  {
    expenseCards.forEach(function (card) { values.push(card.percentage) });
  }

  return(
    <PieChart
      widthAndHeight = { 240 }
      series = { values }
      sliceColor = { colors.slice(0, values.length) }
    />
  );
}
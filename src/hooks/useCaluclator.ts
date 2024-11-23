import { calculateLoanDetails } from "@/lib/utils.ts";
import { ChartDataType, ResultType, StateType } from "@/types";
import { useState } from "react";

export const useCalculator = () => {
  const [value, setValue] = useState<StateType>({
    amount: 100000,
    roi: 8,
    tenure: 20,
  });

  const handleChange = (field: string) => (value: number) => {
    setValue((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const createChartData = (result: ResultType): ChartDataType[] => {
    return [
      {
        name: "principal",
        value: parseInt(result.totalPrincipal, 10),
        fill: "var(--color-principal)",
      },
      {
        name: "interest",
        value: parseInt(result.totalInterest, 10),
        fill: "var(--color-interest)",
      },
    ];
  };

  const resultData = calculateLoanDetails(value);

  return {
    value,
    result: resultData,
    chartData: createChartData(resultData),
    onChange: handleChange,
  };
};

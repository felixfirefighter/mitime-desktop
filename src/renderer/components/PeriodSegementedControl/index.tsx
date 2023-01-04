import { SegmentedControl } from '@mantine/core';
import { Period } from 'entity/period';

interface IPeriodSegmentedControl {
  selectedPeriod: string;
  setSelectedPeriod: (value: string) => void;
}

const PeriodSegmentedControl: React.FC<IPeriodSegmentedControl> = ({
  selectedPeriod,
  setSelectedPeriod,
}) => {
  return (
    <SegmentedControl
      value={selectedPeriod}
      onChange={setSelectedPeriod}
      data={[
        {
          label: 'Today',
          value: Period.Day.toString(),
        },
        {
          label: 'This Week',
          value: Period.Week.toString(),
        },
        {
          label: 'This Month',
          value: Period.Month.toString(),
        },
      ]}
    />
  );
};

export default PeriodSegmentedControl;

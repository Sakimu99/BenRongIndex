import type { Dayjs } from 'dayjs';
import { DatePicker, Segmented } from 'antd';

const { RangePicker } = DatePicker;

type DateRangeFilterProps = {
  value: [Dayjs, Dayjs];
  onChange: (range: [Dayjs, Dayjs]) => void;
  onPresetChange: (days: number) => void;
};

export const DateRangeFilter = ({ value, onChange, onPresetChange }: DateRangeFilterProps) => {
  return (
    <div className="date-range-toolbar">
      <Segmented
        options={[
          { label: '近 7 天', value: 7 },
          { label: '近 30 天', value: 30 },
          { label: '近 90 天', value: 90 },
        ]}
        defaultValue={30}
        onChange={(selected) => onPresetChange(Number(selected))}
      />
      <RangePicker
        value={value}
        onChange={(range) => {
          if (range?.[0] && range[1]) {
            onChange([range[0], range[1]]);
          }
        }}
        allowClear={false}
        format="YYYY-MM-DD"
      />
    </div>
  );
};

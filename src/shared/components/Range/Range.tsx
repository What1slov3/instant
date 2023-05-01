import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import s from './range.module.css';

type Props = {
  values: number[]; // Список всех значений range
  value: number; // Текущее значение range
  setValue: (value: number) => void; // Сеттер текущего значения
  defaultValue: number; // Значение по умолчанию для его подсветки
};

export const Range: React.FC<Props> = ({ values, setValue, value, defaultValue }): JSX.Element => {
  const [renderedValues, setRenderedValues] = useState<JSX.Element[]>([]);

  const grabberRef = useRef<HTMLDivElement>(null!);
  const rangeRef = useRef<HTMLDivElement>(null!);
  const activeRangeRef = useRef<HTMLDivElement>(null!);
  const start = values[0];
  const end = values.at(-1)!;

  useEffect(() => {
    if (value > end) setValue(end);
    if (value < start) setValue(start);
  }, []);

  useEffect(() => {
    const offset = (rangeRef.current.getBoundingClientRect().width / (end - start)) * (value - values[0]);
    if (grabberRef.current) {
      if (value !== values.at(-1)) {
        if (offset > 7.5) {
          grabberRef.current.style.left = offset - 7 + 'px';
          activeRangeRef.current.style.width = offset + 7 + 'px';
        } else {
          grabberRef.current.style.left = offset + 'px';
          activeRangeRef.current.style.width = offset + 7 + 'px';
        }
      } else {
        grabberRef.current.style.left = offset - 14.5 + 'px';
        activeRangeRef.current.style.width = offset + 'px';
      }
    }
  }, [value]);

  useEffect(() => {
    if (rangeRef.current) {
      const valueOffset = rangeRef.current.getBoundingClientRect().width / (end - start);
      setRenderedValues(
        values.map((value, index) => {
          const leftOffset =
            index === 0
              ? 7.5
              : index === values.length - 1
              ? valueOffset * (value - values[0]) - 7.5
              : valueOffset * (value - values[0]) + 'px';

          return (
            <div
              key={value}
              className={classNames({ [s.valueTrackPoint]: true, [s.default]: value === defaultValue })}
              style={{
                left: leftOffset,
              }}
            >
              <div className={s.pointValue}>{value}px</div>
              <div className={s.pointMark}></div>
            </div>
          );
        })
      );
    }
  }, [value]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    let shiftX = e.clientX - grabberRef.current.getBoundingClientRect().left;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(e: MouseEvent) {
      let newLeft = e.clientX - shiftX - rangeRef.current.getBoundingClientRect().left;
      let rightEdge = rangeRef.current.offsetWidth - grabberRef.current.offsetWidth;

      let smallest: number;
      let index: number = 0;
      let offsetOneSize = rangeRef.current.getBoundingClientRect().width / (end - start);

      if (newLeft < 0) {
        newLeft = 0;
      }

      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      values.map((value, i) => {
        let offsetValue = offsetOneSize * (value - values[0]);

        if (!newLeft) {
          index = 0;
        }
        if (!smallest) {
          smallest = Math.abs(offsetValue - newLeft);
        }
        if (Math.abs(offsetValue - newLeft) < smallest) {
          smallest = Math.abs(offsetValue - newLeft);
          index = i;
        }
      });

      setValue(values[index]);
    }

    function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.grabber} ref={grabberRef} onMouseDown={handleMouseDown}></div>
      <div className={s.track} ref={rangeRef}></div>
      <div className={s.activeRange} ref={activeRangeRef}></div>
      {renderedValues}
    </div>
  );
};
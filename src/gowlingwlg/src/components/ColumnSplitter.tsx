import React from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: ComponentProps): JSX.Element => {
  const styles = `${props.params.GridParameters ?? ''} ${props.params.Styles ?? ''}`.trimEnd();
  const classNameValue = props.params && props.params.class ? props.params.class : '';

  const columnWidths = [
    props.params.ColumnWidth1,
    props.params.ColumnWidth2,
    props.params.ColumnWidth3,
    props.params.ColumnWidth4,
    props.params.ColumnWidth5,
    props.params.ColumnWidth6,
    props.params.ColumnWidth7,
    props.params.ColumnWidth8,
  ];
  const columnStyles = [
    props.params.Styles1,
    props.params.Styles2,
    props.params.Styles3,
    props.params.Styles4,
    props.params.Styles5,
    props.params.Styles6,
    props.params.Styles7,
    props.params.Styles8,
  ];
  const enabledPlaceholders = props.params.EnabledPlaceholders.split(',');
  const id = props.params.RenderingIdentifier;

  return (
    <div
      className={`py-[22px] grid grid-cols-12 gap-y-[35px] gap-x-[5px] md:gap-[20px] max-w-[1200px] 2xl:max-w-[1440px] mx-[22px] md:mx-[34px] xl:m-auto ${styles} ${
        classNameValue == 'header_space' ? 'md:py-[1.563rem] !py-[1.531rem] items-center' : ''
      }`}
      id={id ? id : undefined}
    >
      {enabledPlaceholders.map((ph, index) => {
        const phKey = `column-${ph}-{*}`;
        const phStyles = `${columnWidths[+ph - 1]} ${columnStyles[+ph - 1] ?? ''}`.trimEnd();

        return (
          <div key={`${index}-column-splitter`} className={phStyles}>
            <div className="flex flex-row flex-wrap w-full h-full">
              <Placeholder name={phKey} rendering={props.rendering} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

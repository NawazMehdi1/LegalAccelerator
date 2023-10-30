import React from 'react';

export interface BreadcrumbItem {
  Title: string;
  Url: string;
}

export interface BreadcrumbProps {
  fields: BreadcrumbItem[];
}

const Breadcrumb = ({ fields }: BreadcrumbProps): JSX.Element => {
  return (
    <nav className="pb-[22px] md:pb-[40px]">
      <ol className="list-reset flex flex-wrap">
        {fields.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-[0.3125rem]"> {`>`} </span>}
            {index === fields.length - 1 ? (
              <span className="font-bold leading-normal">{item.Title}</span>
            ) : (
              <a className="hover:font-bold leading-[156%]" title={item.Title} href={item.Url}>
                {item.Title}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

import React from 'react';
import { Link as JssLink } from '@sitecore-jss/sitecore-jss-nextjs';
import { LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

type Submenu = {
  linkList: linkList[];
  textSize?: 'text-xs' | 'text-sm' | 'text-base' | 'text-lg' | 'text-xl' | 'text-2xl';
};

type linkList = {
  id: string;
  fields: {
    Link: LinkField;
  };
};

const LinkGrid = (props: Submenu) => {
  return (
    <div className="grid md:grid-cols-4 text-xl gap-[10px] py-[40px] max-w-[1000px]">
      {props.linkList.map((item, index) => {
        return (
          <>
            <div key={item.id} className="group">
              <JssLink
                className={`${
                  props.textSize || 'text-lg'
                } hover:text-shadow-aubergine text-white md:text-mediumPurple md:group-hover:text-aubergine`}
                field={item.fields.Link}
              />
            </div>
            {(index + 1) % 4 == 0 && (
              <hr className="col-span-full group [&:not(:last-child)]:border-b-[1px] border-t-[0] border-darkGrey border-solid" />
            )}
          </>
        );
      })}
    </div>
  );
};
export default LinkGrid;

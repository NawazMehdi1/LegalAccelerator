import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from 'lib/utils';
import AccordingExpand from 'core/atoms/Icons/AccordingExpand';
import AccordianCollapse from 'core/atoms/Icons/AccordianCollapse';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b border-aubergine justify-end', className)}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex h-[4.94rem] justify-between items-center text-4xl tracking-[-0.04rem] text-black">
    {children}

    <AccordionPrimitive.Trigger
      ref={ref}
      style={{ cursor: 'pointer', touchAction: 'manipulation', pointerEvents: 'auto' }}
      className={cn(
        'flex  items-center pt-4 font-medium transition-all  [&[data-state=open]>svg.toggle-wrapper]:rotate-180 [&[data-state=open]>svg.minus]:block [&[data-state=open]>svg.plus]:hidden [&[data-state=closed]>svg.minus]:hidden [&[data-state=closed]>svg.plus]:block',
        className,
        {
          'pb-4': children,
        }
      )}
      {...props}
    >
      <AccordingExpand />
      <AccordianCollapse />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      className
    )}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

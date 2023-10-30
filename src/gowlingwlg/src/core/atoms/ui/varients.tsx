import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'grid place-items-center rounded-xxl py-[6px] px-[18px] transition ease-in-out delay-100 focus-visible:outline-none font-arial rounded-xxl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default:
          'text-[10px] font-normal leading-[140%] tracking-[-0.12px]  bg-lightPurple rounded-xxl ',
        purpleBtn:
          'text-aubergine md:hover:bg-mainPurple md:hover:text-white   text-[10px] font-normal leading-[140%] tracking-[-0.12px]  bg-lightPurple  ',
        primaryBtn:
          'text-black bg-lightBlue md:hover:bg-darkBlue md:hover:text-white  text-[10px] font-normal leading-[140%] tracking-[-0.12px]',
        darkBtn:
          'bg-extraLightGrey text-black text-[10px] md:hover:bg-darkGrey md:hover:text-white text-[10px] font-normal leading-[140%] tracking-[-0.12px] ',
      },
    },
  }
);

export { buttonVariants };

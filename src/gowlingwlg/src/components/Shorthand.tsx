import Script from 'next/script';

type ShorthandProps = {
  params: {
    Url: string;
  };
};

const Shorthand = (props: ShorthandProps): JSX.Element => {
  return <Script src={props?.params?.Url} />;
};

export default Shorthand;

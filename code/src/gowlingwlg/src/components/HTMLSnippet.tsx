type HTMLSnippetProps = {
  fields: {
    Html: {
      value: string;
    };
  };
};

const HTMLSnippet = (props: HTMLSnippetProps): JSX.Element => {
  const markup = () => {
    return { __html: props?.fields?.Html?.value };
  };

  return <div className="max-w-[1260px] m-auto" dangerouslySetInnerHTML={markup()}></div>;
};

export default HTMLSnippet;

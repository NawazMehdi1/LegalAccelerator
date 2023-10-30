type HtmlSnippetJsonProps = {
  fields: {
    Html: {
      value: string;
    };
  };
};

const HtmlSnippetJson = (props: HtmlSnippetJsonProps): JSX.Element => {
  const markup = () => {
    return { __html: props?.fields?.Html?.value };
  };

  return (
    <div
      className="w-full max-w-[1200px] 2xl:max-w-[1440px]  md:mx-[2.125rem] xl:m-auto"
      dangerouslySetInnerHTML={markup()}
    ></div>
  );
};

export default HtmlSnippetJson;

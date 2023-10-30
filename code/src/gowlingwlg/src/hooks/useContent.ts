import { useState } from 'react';

export const useContent = (initialContent?: string[]) => {
  const [content, setContent] = useState<string[] | undefined>(initialContent);

  const addContent = (name: string) => {
    if (content?.length) {
      setContent([...content, name]);
    }
  };

  const removeContent = (name: string) => {
    if (content?.length) {
      setContent(content.filter((item) => item !== name));
    }
  };

  return { content, addContent, removeContent };
};

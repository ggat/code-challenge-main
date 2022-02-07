import React, { useCallback, useEffect, useState } from "react";

export interface MockedRichMarkDownEditorProps {
  onChange?: (value: () => string) => void;
  defaultValue?: string;
}

/**
 * MockedRichMarkDownEditor a replacement for the "rich-markdown-editor" for tests
 * It difficult to to select or fire events on the original component
 */
export const MockedRichMarkDownEditor = (
  props: MockedRichMarkDownEditorProps
) => {
  const [value, setValue] = useState<string>("");
  const { onChange, defaultValue, ...restProps } = props;
  useEffect(() => {
    if(defaultValue) {
      setValue(defaultValue)
    } else {
      setValue("");
    };
  }, [defaultValue]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      onChange?.(() => event.target.value),
    [onChange]
  );

  return <input {...restProps} type="text" value={value} onChange={handleChange}></input>;
};

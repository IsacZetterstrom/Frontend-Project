import { useState } from "react";
/**
 * @author Niklas Nguyen
 * @description this custom hook saves and gives attribute for inputs fields, it returns defults as a object which u can change attribute in the object
 * @returns defaults, formData, setFormData
 */

export function useFormDefaults() {
  const [formData, setFormData] = useState({});

  function defaults(name, placeholder, override = {}, validator = () => true, invalidMessage = "Not valid") {
    return {
      name,
      value: formData[name] || "",
      placeholder,
      required: true,
      autoComplete: "on",
      maxLength: 50,
      type: "text",
      onChange: ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value });
        target.setCustomValidity(validator(target.value) ? "" : invalidMessage);
      },
      className: "form-control",
      ...override,
    };
  }

  return { defaults, formData, setFormData };
}

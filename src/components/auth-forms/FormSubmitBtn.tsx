import React from "react";

function FormSubmitBtn({
  isSubmitting,
  children,
}: {
  isSubmitting: boolean;
  children: React.ReactNode;
}) {
  if (isSubmitting)
    return (
      <button disabled type="button" className="btn btn-secondary">
        <span className="loading loading-spinner"></span>
        {children}
      </button>
    );

  return (
    <button className="btn btn-secondary" type="submit">
      {children}
    </button>
  );
}

export default FormSubmitBtn;

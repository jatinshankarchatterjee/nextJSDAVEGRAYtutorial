type Props = {
  result: {
    data?: {
      message?: string;
    };
    serverError?: string;
    validationErrors?: Record<string, string[] | undefined>;
  };
};

const MessageBox = ({
  type,
  content,
}: {
  type: "success" | "error";
  content: React.ReactNode;
}) => (
  <div
    className={`alert ${type === "success" ? "alert-success" : "alert-error"}`}
  >
    {content}
  </div>
);
export function DisplayServerRequests({ result }: Props) {
  const { data, serverError, validationErrors } = result;

  return (
    <>
      {data && data.message && (
        <MessageBox type="success" content={data.message} />
      )}
      {serverError && <MessageBox type="error" content={serverError} />}
      {validationErrors && (
        <MessageBox
          type="error"
          content={
            validationErrors
              ? Object.entries(validationErrors).map(([key, value]) => (
                  <div key={key}>
                    <p>{key}</p>
                    <ul>
                      {value?.map((error) => (
                        <li key={error}>{error}</li>
                      ))}
                    </ul>
                  </div>
                ))
              : null
          }
        />
      )}
    </>
  );
}

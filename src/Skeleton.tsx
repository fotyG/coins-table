import ResultRow from "./ResultRow";

const Skeleton = () => {
  return (
    <>
      <ResultRow
        loading={true}
        providerName=""
      />
      <ResultRow
        loading={true}
        providerName=""
      />
      <ResultRow
        loading={true}
        providerName=""
      />
      <ResultRow
        loading={true}
        providerName=""
      />
    </>
  );
};
export default Skeleton;

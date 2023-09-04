import axios from "axios";
import { sortBy } from "lodash";
import { useEffect, useState } from "react";
import useDebouncedEffect from "use-debounced-effect";

import Skeleton from "./Skeleton";
import ResultRow from "./ResultRow";
import AmountInput from "./AmountInput";

type CachedResult = {
  _id: string;
  btc: string;
  provider: string;
};

type OfferResults = {
  [keys: string]: string;
};

const defaultAmount = "100";

function App() {
  const [amount, setAmount] = useState(defaultAmount);
  const [loading, setLoading] = useState(true);
  const [offerResults, setOfferResults] = useState<OfferResults>({});
  const [previousAmount, setPreviousAmount] = useState(defaultAmount);
  const [cachedResults, setCachedResults] = useState<CachedResult[]>([]);

  useEffect(() => {
    axios.get("https://df5i4448ih.us.aircode.run/cachedValues").then((res) => {
      setCachedResults(res.data);
      setLoading(false);
    });
  }, []);

  useDebouncedEffect(
    () => {
      if (amount === defaultAmount) return;
      if (amount !== previousAmount) {
        setLoading(true);
        axios
          .get(`https://df5i4448ih.us.aircode.run/offers?amount=${amount}`)
          .then((res) => {
            setOfferResults(res.data);
            setPreviousAmount(amount);
            setLoading(false);
          });
      }
    },
    { timeout: 500 },
    [amount]
  );

  const sortedCache = sortBy(cachedResults, "btc").reverse();
  const sortedResults = sortBy(
    Object.keys(offerResults).map((provider) => ({
      provider,
      btc: offerResults[provider],
    })),
    "btc"
  ).reverse();

  const showCached = amount === defaultAmount;

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="uppercase text-6xl text-center font-bold bg-gradient-to-br from-purple-600 to-sky-400 bg-clip-text text-transparent from-30%">
        Find the cheapest crypto
      </h1>
      <div className="flex justify-center mt-6">
        <AmountInput
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="mt-6">
        {loading && <Skeleton />}
        {showCached &&
          sortedCache.map((result: CachedResult) => (
            <ResultRow
              loading={loading}
              key={result?._id}
              btc={result?.btc}
              providerName={result?.provider}
            />
          ))}
        {!showCached &&
          sortedResults.map((result) => (
            <ResultRow
              loading={loading}
              btc={result?.btc}
              key={result?.provider}
              providerName={result?.provider}
            />
          ))}
      </div>
    </main>
  );
}

export default App;

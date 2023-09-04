import paybisLogo from "./assets/paybis.webp";
import guardarianLogo from "./assets/guardian.svg";

type ResultRowProps = {
  btc?: string;
  loading?: boolean;
  providerName: string;
};

type Logo = {
  source: string;
  invert?: boolean;
};

const logoMap: { [keys: string]: Logo } = {
  paybis: { source: paybisLogo, invert: true },
  guardarian: { source: guardarianLogo, invert: false },
  moonpay: { source: "https://www.moonpay.com/assets/logo-full-white.svg" },
  transak: {
    source: "https://assets.transak.com/images/website/transak-logo-white.svg",
  },
};

const urlMap = new Map([
  ["paybis", "https://paybis.com/"],
  ["guardarian", "https://guardarian.com/"],
  ["moonpay", "https://buy.moonpay.com/"],
  ["transak", "https://global.transak.com/"],
]);

export default function ResultRow({
  btc,
  loading,
  providerName,
}: ResultRowProps) {
  return (
    <a
      href={urlMap.get(providerName)}
      target="_blank"
    >
      <div className="relative border min-h-[4rem] border-white/10 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-4 my-2 overflow-hidden">
        {!loading && (
          <div className="flex items-center gap-4">
            <div>
              {providerName && (
                <img
                  className={
                    "h-6 w-16 object-contain " +
                    (logoMap[providerName]?.invert ? "invert" : "")
                  }
                  src={logoMap[providerName]?.source}
                  alt="logo"
                />
              )}
            </div>
            <div className="grow capitalize font-bold text-white/60">
              {providerName}
            </div>
            <div className="flex gap-2">
              <span className="text-xl text-purple-200/80">
                {Number(btc).toFixed(8)}
              </span>
              <span className="text-xl text-purple-300/50">BTC</span>
            </div>
          </div>
        )}
        {loading && (
          <div className="inset-0 absolute bg-gradient-to-r from-transparent via-blue-800/50 to-transparent skeleton-animation border-t border-white/25" />
        )}
      </div>
    </a>
  );
}
